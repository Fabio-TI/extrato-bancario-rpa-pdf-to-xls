import React from 'react';

const SummaryTable = ({ data }) => {
  return (
    <table border="1" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Coluna 1</th>
          <th>Coluna 2</th>
          {/* Adicione mais colunas conforme necessário */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.coluna1}</td>
            <td>{row.coluna2}</td>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;