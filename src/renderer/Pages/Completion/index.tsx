import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import styles from './styles.module.scss';

const CompletePage = () => {
  const nav = useNavigate();
  const [navTime, setNavTime] = useState(3);
  useEffect(() => {
    setTimeout(() => setNavTime(2), 1000);
    setTimeout(() => setNavTime(1), 2000);
    setTimeout(() => nav('/'), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <CheckIcon color="success" sx={{ fontSize: '15rem' }} />
      <h2>提交成功，感谢您的参与</h2>
      <Typography sx={{ mt: '1rem' }}>
        {navTime}秒后将自动跳转到主页，若没有自动跳转，请
        <Link to="/">点击此处</Link>
        跳转到主页
      </Typography>
    </div>
  );
};

export default CompletePage;
