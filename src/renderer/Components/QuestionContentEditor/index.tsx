/* eslint-disable react/jsx-props-no-spreading */
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Question, QuestionSelectBase } from 'survey-core';
import AddIcon from '@mui/icons-material/Add';
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from 'react-beautiful-dnd';
import { ListItem } from 'react/components/list/list-item';
import ChoiceItem from '../ChoiceItem';
import ItemList from '../ItemList';
import { selectorTypes } from '../QuestionEditPanel/typing';
import reorder from './helper';

export interface IChoice {
  value: any;
  text: string;
  imageLink?: string; // A link to the image or video that represents this choice value. Applies only to Image Picker questions.
}

interface IProps {
  data?: Question;
  onUpdate?: () => void;
}

const ListHeader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      ml: '4.5rem',
    }}
  >
    <Typography sx={{ fontSize: '14px', color: '#57606f' }}>显示值</Typography>
    <Typography sx={{ fontSize: '14px', color: '#57606f', mr: 1 }}>
      实际值
    </Typography>
  </Box>
);

const ListFooter: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Button
      onClick={onClick}
      sx={{ margin: 1 }}
      variant="outlined"
      startIcon={<AddIcon />}
    >
      添加
    </Button>
    <Typography
      sx={{
        textAlign: 'center',
        mt: 2,
        color: '#57606f',
        fontSize: '14px',
      }}
    >
      温馨提示：双击文本可以修改内容
    </Typography>
  </Box>
);

const QuestionContentEditor: React.FC<IProps> = ({ data, onUpdate }) => {
  const type = data?.getType();

  if (type === undefined) return null;

  if (selectorTypes.includes(type)) {
    const base = data as QuestionSelectBase;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [choices, setChoices] = useState(base.choices);
    const onDragEnd = ({ destination, source }: DropResult) => {
      // dropped outside the list
      if (!destination) return;
      const newItems = reorder(choices, source.index, destination.index);
      setChoices(newItems);
    };

    const handleChange = (index: number, value: IChoice) => {
      const newChoices = [...choices];
      newChoices[index] = value;
      setChoices(newChoices);
      if (data?.choices !== undefined) {
        console.log(`Update choices at index ${index}`);
        data.choices = newChoices;
      }
      onUpdate?.();
      return true;
    };

    const handleAdd = () => {
      const newChoices = [...choices];
      newChoices.push({ value: '[值]未编辑', text: '[选项]未编辑' });
      setChoices(newChoices);
      if (data?.choices !== undefined) {
        console.log('Add a new choice');
        data.choices = newChoices;
      }
      onUpdate?.();
    };

    const handleDelete = (index: number) => {
      const newChoices = [...choices];
      newChoices.splice(index, 1);
      setChoices(newChoices);
      if (data?.choices !== undefined) {
        console.log('Delete choice: ', index);
        data.choices = newChoices;
      }
      onUpdate?.();
    };

    const choiceTemplate = (item: IChoice) => (
      <Draggable draggableId={item.value} index={choices.indexOf(item)}>
        {(provided, snapshot) => (
          <div
            key={item.value}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ChoiceItem
              data={item}
              onChange={(choice) => {
                return handleChange(choices.indexOf(item), choice);
              }}
              onDelete={() => handleDelete(choices.indexOf(item))}
            />
          </div>
        )}
      </Draggable>
    );
    return (
      <Box>
        <ListHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ItemList
                  pattern="Stack"
                  itemSource={choices}
                  template={choiceTemplate}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ListFooter onClick={handleAdd} />
      </Box>
    );
  }
  return <div>该类型问题没有数据可以更改</div>;
};

export default QuestionContentEditor;
