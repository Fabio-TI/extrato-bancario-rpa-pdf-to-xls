import pandas as pd
from pathlib import Path
from datetime import datetime
import re
from processa_extrato import ler_pdf, organizar_em_colunas


def salvar_excel(transacoes, caminho_saida):
    """
    Salva as transações em um arquivo Excel com colunas descritivas e uma linha somatória.
    :param transacoes: Lista de transações formatadas.
    :param caminho_saida: Caminho do arquivo Excel de saída.
    """
    try:
        # Criar um DataFrame com as transações
        df = pd.DataFrame(transacoes, columns=["DATA", "ENTRADAS", "SAÍDAS", "TOTAL", "DESCRITIVO"])

        # Formatar colunas de valores
        df["ENTRADAS"] = df["ENTRADAS"].apply(
            lambda x: f"R$ {x:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
        )
        df["SAÍDAS"] = df["SAÍDAS"].apply(
            lambda x: f"R$ {x:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
        )
        df["TOTAL"] = df["TOTAL"].apply(
            lambda x: f"R$ {x:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
        )

        # Calcular a soma das colunas numéricas
        soma_entradas = sum(transacao["ENTRADAS"] for transacao in transacoes)
        soma_saidas = sum(transacao["SAÍDAS"] for transacao in transacoes)
        soma_total = sum(transacao["TOTAL"] for transacao in transacoes)

        # Adicionar linha somatória ao DataFrame
        linha_somatoria = {
            "DATA": "TOTAL",
            "ENTRADAS": f"R$ {soma_entradas:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "SAÍDAS": f"R$ {soma_saidas:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "TOTAL": f"R$ {soma_total:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),
            "DESCRITIVO": "Saldo Final"
        }
        df = pd.concat([df, pd.DataFrame([linha_somatoria])], ignore_index=True)

        # Salvar o DataFrame como um arquivo Excel
        df.to_excel(caminho_saida, index=False)
        print(f"✅ Arquivo Excel salvo com sucesso: {caminho_saida}")
    except Exception as e:
        print(f"❌ Erro ao salvar o arquivo Excel: {e}")
        raise


if __name__ == "__main__":
    # Configurações
    input_dir = Path("data/input")
    output_dir = Path("data/output")

    # Criar diretório de saída, se não existir
    output_dir.mkdir(exist_ok=True)

    # Listar arquivos PDF na pasta de entrada
    arquivos_pdf = [f for f in input_dir.iterdir() if f.suffix.lower() == ".pdf"]
    if not arquivos_pdf:
        print("❌ Nenhum arquivo PDF encontrado na pasta de entrada.")
        raise FileNotFoundError("Nenhum arquivo PDF encontrado.")

    # Filtrar arquivo com o padrão "Extrato_Bancário_mês.PDF"
    padrao_nome = re.compile(r"^Extrato_Bancário_(\w+)\.PDF$", re.IGNORECASE)
    arquivo_selecionado = None
    mes_encontrado = None

    for arquivo in arquivos_pdf:
        match = padrao_nome.match(arquivo.name)
        if match:
            arquivo_selecionado = arquivo
            mes_encontrado = match.group(1).lower()  # Capturar o mês
            break

    if not arquivo_selecionado:
        print("❌ Nenhum arquivo com o padrão 'Extrato_Bancário_mês.PDF' encontrado.")
        raise FileNotFoundError("Arquivo com o padrão esperado não encontrado.")

    try:
        # Ler o PDF selecionado
        linhas = ler_pdf(arquivo_selecionado)

        # Organizar as linhas em colunas descritivas
        transacoes = organizar_em_colunas(linhas)

        # Gerar o nome do arquivo de saída com base no mês e ano
        ano_atual = datetime.now().year
        nome_arquivo_saida = f"{mes_encontrado}_{ano_atual}.xlsx"
        caminho_saida = output_dir / nome_arquivo_saida

        # Salvar as transações no Excel com linha somatória
        salvar_excel(transacoes, caminho_saida)

    except Exception as e:
        print(f"❌ Erro ao processar o arquivo {arquivo_selecionado}: {e}")