import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import { executeScript, getSummary } from './api';
import SummaryTable from './components/SummaryTable';
import axios from 'axios';

function App() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [summaryData, setSummaryData] = useState([]);

  const handleUploadComplete = () => {
    setIsUploaded(true);
  };

  const handleExecute = async () => {
    await executeScript();
    setIsProcessed(true);
    fetchSummary();
  };

  const fetchSummary = async () => {
    try {
        const response = await axios.get('http://localhost:5000/summary', { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'resumo.csv');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Erro ao buscar o resumo:', error);
    }
};

  return (
    <div>
      <h1>Processador de Extratos Bancários</h1>
      <FileUpload onUploadComplete={handleUploadComplete} />
      {isUploaded && (
        <button onClick={handleExecute} disabled={!isUploaded}>
          Executar
        </button>
      )}
      {isProcessed && <SummaryTable data={summaryData} />}
    </div>
  );
}

export default App;