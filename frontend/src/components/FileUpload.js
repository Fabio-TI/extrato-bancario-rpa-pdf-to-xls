import React, { useState } from 'react';
import { uploadFile } from '../api';
import ProgressBar from './ProgressBar';

const FileUpload = ({ onUploadComplete }) => {
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      await uploadFile(file);
      onUploadComplete();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <ProgressBar progress={progress} />
    </div>
  );
};

export default FileUpload;