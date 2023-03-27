/* eslint-disable no-console */
import React, { useState } from 'react';

function Home() {
  const [jsonNum, setJsonNum] = useState(0);
  const update = () => {
    window.electron
      .openFolder()
      .then((res) => {
        setJsonNum(res.length);
        // eslint-disable-next-line no-restricted-syntax
        for (const item of res) {
          console.log(item.name);
        }
        return res;
      })
      .catch(console.log);
  };
  return (
    <div>
      <h1>Home {jsonNum}</h1>
      <button type="button" onClick={update}>
        1
      </button>
    </div>
  );
}

export default Home;
