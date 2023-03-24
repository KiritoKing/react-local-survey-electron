import React from 'react';
import { useNavigate } from 'react-router-dom';

function Creator() {
  const nav = useNavigate();
  return (
    <div>
      Creator
      <button type="button" onClick={() => nav('/')}>
        Home
      </button>
    </div>
  );
}

export default Creator;
