import { Box } from '@mui/material';
import React, { useState } from 'react';
import { QuestionSelectBase, Question } from 'survey-core';
import ChoiceItem from '../ChoiceItem';
import ItemList from '../ItemList';
import { IChoice } from '../QuestionContentEditor';
import ListFooter from './ListFoorter';
import ListHeader from './ListHeader';

interface IProps {
  data?: Question;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (data?: any) => void;
}

const ChoiceList: React.FC<IProps> = ({ data, onUpdate }) => {
  const [choices, setChoices] = useState(
    (data as QuestionSelectBase)?.choices ?? []
  );

  const handleChange = (index: number, value: IChoice) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
    if (data?.choices !== undefined) {
      console.log(`Update choices at index ${index}`);
      data.choices = newChoices;
    }
    onUpdate?.(newChoices);
    return true;
  };

  const handleAdd = () => {
    const newChoices = [...choices];
    newChoices.push({
      value: `item${newChoices.length + 1}`,
      text: `item${newChoices.length + 1}`,
    });
    setChoices(newChoices);
    if (data?.choices !== undefined) {
      console.log('Add a new choice');
      data.choices = newChoices;
    }
    onUpdate?.(newChoices);
  };

  const handleDelete = (index: number) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
    if (data?.choices !== undefined) {
      console.log('Delete choice: ', index);
      data.choices = newChoices;
    }
    onUpdate?.(newChoices);
  };

  const choiceTemplate = (item: IChoice) => (
    <ChoiceItem
      data={item}
      onChange={(choice) => {
        return handleChange(choices.indexOf(item), choice);
      }}
      onDelete={() => handleDelete(choices.indexOf(item))}
    />
  );
  return (
    <Box>
      <ListHeader />
      <ItemList
        pattern="Stack"
        itemSource={choices}
        template={choiceTemplate}
        mt="0.5rem"
      />
      <ListFooter onClick={handleAdd} />
    </Box>
  );
};

export default ChoiceList;
