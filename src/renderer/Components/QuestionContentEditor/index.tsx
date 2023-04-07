import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Question, QuestionSelectBase } from 'survey-core';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ChoiceItem from '../ChoiceItem';
import ItemList from '../ItemList';
import { selectorTypes } from '../QuestionEditPanel/typing';

export interface IChoice {
  value: any;
  text: string;
  imageLink?: string; // A link to the image or video that represents this choice value. Applies only to Image Picker questions.
}

interface IProps {
  data: Question;
  onUpdate?: () => void;
}

const QuestionContentEditor: React.FC<IProps> = ({ data, onUpdate }) => {
  const type = data.getType();
  if (selectorTypes.includes(type)) {
    const base = data as QuestionSelectBase;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [choices, setChoices] = useState(
      base.choices.sort((a, b) =>
        typeof a.value === 'number' ? a.value - b.value : 0
      )
    );

    const handleChange = (index: number, value: IChoice) => {
      const newChoices = [...choices];
      newChoices[index] = value;
      setChoices(newChoices);
      if (data?.choices !== undefined) {
        console.log('Update choices');
        data.choices = newChoices;
      }
      onUpdate?.();
    };

    const choiceTemplate = (item: IChoice) => (
      <ChoiceItem
        data={item}
        onChange={(choice) => {
          handleChange(choices.indexOf(item), choice);
        }}
      />
    );

    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ml: '4.5rem',
          }}
        >
          <Typography sx={{ fontSize: '14px', color: '#57606f' }}>
            显示值
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#57606f', mr: 1 }}>
            实际值
          </Typography>
        </Box>
        <ItemList
          pattern="Stack"
          itemSource={choices}
          template={choiceTemplate}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button sx={{ margin: 1 }} variant="outlined" startIcon={<AddIcon />}>
            添加
          </Button>
          <Button
            sx={{ margin: 1 }}
            variant="outlined"
            color="error"
            startIcon={<ClearIcon />}
          >
            清空
          </Button>
        </Box>
      </Box>
    );
  }
  return <div>该类型问题没有数据可以更改</div>;
};

export default QuestionContentEditor;
