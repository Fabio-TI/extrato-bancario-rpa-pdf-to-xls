import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={{ width: `${progress}%`, height: '20px', backgroundColor: '#4caf50' }}></div>
    </div>
  );
};

export default ProgressBar;