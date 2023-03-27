import React from 'react';
import { Link } from 'react-router-dom';

const CompletePage = () => {
  return (
    <h1>
      问卷完成 <Link to="/">回到主页</Link>
    </h1>
  );
};

export default CompletePage;
