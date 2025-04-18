# 💼 Extrato Bancário - PDF para XLS com Python + RPA

Este projeto automatiza a conversão de extratos bancários em PDF para uma planilha Excel (.xls), com categorização automática das transações e totalização mensal.

## 🚀 Funcionalidades
- Solicitação automática do PDF todo dia 02 de cada mês
- Leitura e extração de dados de movimentações bancárias
- Organização em colunas: Data, Entradas, Saídas, Totais, Visa, Mastercard, Pix
- Totalização automática de cada categoria
- Geração de arquivo .xls com nome do mês correspondente

## 🛠️ Tecnologias Usadas
- Python 3.10+
- pdfplumber
- pandas
- openpyxl
- datetime
- RPA Framework (opcional)

## 📦 Como usar

```bash
# Clone o repositório
git clone https://github.com/Fabio-TI/extrato-bancario-rpa-pdf-to-xls.git

# Instale os requisitos
pip install -r requirements.txt

# Coloque o PDF do extrato na pasta /data/input
# Execute o programa
python main.py
