import { IResultCache } from 'main/typing';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

interface IProps {
  data: IResultCache;
}

const ResultItem: React.FC<IProps> = ({ data }) => {
  return (
    <Paper
      className={styles['result-card']}
      elevation={3}
      sx={{ flexDirection: 'column' }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1, mt: 0.6 }}>
        {data.contestant ?? '未记名'}
      </Typography>
      <Typography
        variant="body1"
        sx={{ ml: 1, mt: 0.8, color: '#95a5a6', fontSize: '0.5rem' }}
      >
        {data.id}
      </Typography>
      <Typography
        variant="body1"
        sx={{ ml: 1, mt: 0.8, color: '#95a5a6', fontSize: '0.8rem' }}
      >
        {dayjs(data.time).format('YYYY-MM-DD HH:mm:ss')}
      </Typography>
    </Paper>
  );
};

export default ResultItem;
