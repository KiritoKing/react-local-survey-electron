/* eslint-disable react/function-component-definition */
import React from 'react';
import { Grid } from '@mui/material';
import { ISurveyCache } from '../../../main/typing';
import SurveyListItem from '../SurveyListItem';
import styles from './styles.module.scss';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  data?: ISurveyCache[];
}

const SurveyList: React.FC<IProps> = ({ data }) => {
  const handleClickSurvey = (survey: ISurveyCache) => {
    console.log(
      `Name: ${survey.name}\nUUID: ${survey.id}\nHasData: ${
        survey.data !== undefined
      }\nPath: ${survey.path}`
    );
  };
  return (
    <Grid container spacing={2} className={styles['survey-list']}>
      {data &&
        data.map((item) => {
          return (
            <Grid item xs={6} md={4} key={item.id}>
              <SurveyListItem
                onClick={() => {
                  handleClickSurvey(item);
                }}
                data={item}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default SurveyList;
