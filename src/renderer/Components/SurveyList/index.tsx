/* eslint-disable react/function-component-definition */
import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ISurveyCache } from '../../../main/typing';
import SurveyListItem from '../SurveyListItem';
import styles from './styles.module.scss';

interface IProps {
  data?: ISurveyCache[];
  onFail?: () => void;
}

const SurveyList: React.FC<IProps> = ({ data, onFail }) => {
  const nav = useNavigate();

  const handleClickSurvey = (survey: ISurveyCache) => {
    if (survey.data === undefined) {
      onFail && onFail();
      return;
    }
    console.log(
      `Name: ${survey.name}\nUUID: ${survey.id}\nHasData: ${
        survey.data !== undefined
      }\nPath: ${survey.path}`
    );
    nav(`/survey/${survey.id}`);
  };

  const handleDeleteSurvey = (survey: ISurveyCache) => {
    console.log(`Delete: ${survey.id}`);
  };

  const handleEditSurvey = (survey: ISurveyCache) => {
    console.log(`Edit: ${survey.id}`);
  };

  return (
    <Grid container spacing={2} className={styles['survey-list']}>
      {data &&
        data.map((item) => {
          return (
            <Grid item xs={6} md={4} key={item.id}>
              <SurveyListItem
                onClick={(e) => {
                  handleClickSurvey(item);
                  e.stopPropagation();
                }}
                onEdit={() => handleEditSurvey(item)}
                onDelete={() => handleDeleteSurvey(item)}
                data={item}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default SurveyList;
