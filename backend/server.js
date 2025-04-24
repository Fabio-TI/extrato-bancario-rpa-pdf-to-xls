const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importe o módulo fs para verificar a existência de arquivos
const mainScriptPath = path.join(__dirname, '../main.py'); // Caminho absoluto para o script Python
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuração do Multer para salvar arquivos na pasta /data/input
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../data/input'), // Pasta de entrada (raiz do projeto)
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantém o nome original do arquivo
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
  exec(`python "${mainScriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o script: ${stderr}`);
      return res.status(500).send({ error: stderr });
    }
    res.status(200).send({ message: 'Processamento concluído!', output: stdout });
  });
});

// Rota para obter o resumo
app.get('/summary', (req, res) => {
  const outputDir = path.join(__dirname, '../data/output'); // Caminho para a pasta de saída

  // Listar todos os arquivos na pasta de saída
  fs.readdir(outputDir, (err, files) => {
    if (err) {
      console.error(`Erro ao ler a pasta de saída: ${err.message}`);
      return res.status(500).send({ error: 'Erro ao acessar a pasta de saída!' });
    }

    // Filtrar apenas arquivos .csv
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    if (csvFiles.length === 0) {
      console.error('Nenhum arquivo CSV encontrado na pasta de saída.');
      return res.status(404).send({ error: 'Nenhum arquivo de resumo encontrado!' });
    }

    // Encontrar o arquivo mais recente
    let mostRecentFile = '';
    let mostRecentTime = 0;

    csvFiles.forEach(file => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);

      if (stats.mtimeMs > mostRecentTime) {
        mostRecentTime = stats.mtimeMs;
        mostRecentFile = filePath;
      }
    });

    if (!mostRecentFile) {
      console.error('Nenhum arquivo CSV válido encontrado.');
      return res.status(404).send({ error: 'Arquivo de resumo não encontrado!' });
    }

    console.log(`Enviando arquivo de resumo mais recente: ${mostRecentFile}`);
    res.sendFile(mostRecentFile, (err) => {
      if (err) {
        console.error(`Erro ao enviar o arquivo: ${err.message}`);
        res.status(500).send({ error: 'Erro ao baixar o arquivo de resumo!' });
      }
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});