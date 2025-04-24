const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuração do Multer para salvar arquivos na pasta /input
const storage = multer.diskStorage({
  destination: './data',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).send({ message: 'Arquivo enviado com sucesso!' });
});

// Rota para executar o script Python
app.post('/execute', (req, res) => {
  exec('python main.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o script: ${stderr}`);
      return res.status(500).send({ error: stderr });
    }
    res.status(200).send({ message: 'Processamento concluído!', output: stdout });
  });
});

// Rota para obter o resumo
app.get('/summary', (req, res) => {
  const summaryPath = path.join(__dirname, '../output/resumo.csv'); // Suponha que o resumo é salvo em CSV
  res.sendFile(summaryPath);
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});