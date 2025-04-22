# Extrato Bancário RPA - PDF to Excel

## Descrição do Projeto

Este projeto automatiza o processamento de extratos bancários em formato PDF e gera arquivos Excel organizados com os dados extraídos. Ele foi desenvolvido para facilitar a análise de transações financeiras, como entradas, saídas e descrições detalhadas.

O script principal lê os arquivos PDF localizados na pasta `data/input`, processa os dados e salva os resultados na pasta `data/output` em formato Excel (`.xlsx`).

---

## Estrutura do Projeto

```
extrato-bancario-rpa-pdf-to-xls/
├── data/
│   ├── input/          # Pasta para arquivos PDF de entrada
│   └── output/         # Pasta para arquivos Excel gerados
├── main.py             # Script principal que orquestra o fluxo
├── processa_extrato.py # Funções para processar os dados dos PDFs
├── requirements.txt    # Lista de dependências do projeto
└── README.md           # Documentação do projeto
```

---

## Requisitos

Para executar este projeto, você precisará de:

- **Python 3.8 ou superior**
- As bibliotecas listadas no arquivo `requirements.txt`:
  - `PyMuPDF` (para leitura de PDFs)
  - `pandas` (para manipulação de dados)
  - `openpyxl` (para exportação para Excel)

---

## Como Executar o Projeto

### 1. Configurar o Ambiente Virtual

Certifique-se de que você tem um ambiente virtual configurado. Caso contrário, crie um com o seguinte comando:

```bash
python -m venv .venv
```

Ative o ambiente virtual:

- No Windows:
  ```bash
  .venv\Scripts\activate
  ```

- No Linux/Mac:
  ```bash
  source .venv/bin/activate
  ```

### 2. Instalar as Dependências

Instale todas as dependências necessárias usando o comando:

```bash
pip install -r requirements.txt
```

### 3. Colocar os Arquivos PDF na Pasta `data/input`

Coloque os arquivos PDF de extratos bancários que deseja processar na pasta `data/input`.

### 4. Executar o Script Principal

Execute o script principal para processar os arquivos PDF:

```bash
python main.py
```

Os arquivos Excel gerados estarão disponíveis na pasta `data/output`.

---

## Exemplo de Saída

Os arquivos gerados terão o seguinte formato:

| DATA     | ENTRADAS  | SAÍDAS   | TOTAL    | DESCRITIVO                                |
|----------|-----------|----------|----------|-------------------------------------------|
| 21/03    | R$ 98,27  | R$ 0,00  | R$ 98,27 | SIPAG_Deb._Visa Electron DOC.: 1203135459 |
| 21/03    | R$ 0,00   | R$ 8,50  | R$ -8,50 | LANCHE BEM ACAI BELO HORIZON TBR          |

---

## Contribuições

Contribuições são bem-vindas! Se você encontrar bugs ou quiser sugerir melhorias, abra uma issue ou envie um pull request.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Se precisar de mais ajustes ou personalizações no `README.md`, estou à disposição! 😊