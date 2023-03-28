import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import styles from './styles.module.scss';

const CompletePage = () => {
  const waitTime = 3;

  const nav = useNavigate();
  const [navTime, setNavTime] = useState(waitTime);
  const timerId = useRef<number | null>(null);
  const interId = useRef<number | null>(null);

  useEffect(() => {
    interId.current = window.setInterval(
      () => setNavTime((prev) => prev - 1),
      1000
    );
    timerId.current = window.setTimeout(() => nav('/'), waitTime * 1000);
    return () => {
      console.log('Clear timers');
      window.clearTimeout(timerId.current as any);
      window.clearInterval(interId.current as any);
    };
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
