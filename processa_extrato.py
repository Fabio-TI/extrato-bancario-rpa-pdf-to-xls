import fitz  # PyMuPDF
import re


def ler_pdf(pdf_path):
    """
    Lê o conteúdo de um PDF e retorna uma lista com todas as linhas.
    :param pdf_path: Caminho do arquivo PDF.
    :return: Lista de linhas extraídas do PDF.
    """
    try:
        # Abrir o PDF
        doc = fitz.open(pdf_path)
        linhas = []

        # Iterar sobre cada página do PDF
        for page in doc:
            texto = page.get_text("text")  # Extrair texto da página
            linhas.extend(texto.splitlines())  # Dividir o texto em linhas

        print(f"✅ PDF lido com sucesso: {pdf_path}")
        return linhas
    except Exception as e:
        print(f"❌ Erro ao ler o PDF: {e}")
        raise


def organizar_em_colunas(linhas):
    """
    Organiza as linhas do PDF em colunas descritivas.
    :param linhas: Lista de linhas extraídas do PDF.
    :return: Lista de dicionários com as colunas DATA, ENTRADAS, SAÍDAS, TOTAL, DESCRITIVO.
    """
    transacoes = []
    data_atual = None
    descricao_atual = []
    valor_atual = None
    tipo_atual = None

    i = 0
    while i < len(linhas):
        linha = linhas[i].strip()

        # Detectar data (formato dd/mm)
        if re.match(r"^\d{2}/\d{2}$", linha):
            data_atual = linha
            i += 1
            continue

        # Detectar início de uma transação (COMP, PIX, etc.)
        if re.match(r"^(COMP|PIX|TRANSF\.|CR|DEB)", linha):
            descricao_atual = [linha]
            i += 1

            # Continuar agregando linhas até encontrar DOC.:
            while i < len(linhas) and not re.match(r"^DOC\.: ", linhas[i]):
                descricao_atual.append(linhas[i].strip())
                i += 1

            # Capturar DOC.:
            if i < len(linhas) and re.match(r"^DOC\.: ", linhas[i]):
                descricao_atual.append(linhas[i].strip())
                i += 1

            # Procurar valor monetário na descrição
            descricao_completa = " ".join(descricao_atual).strip()
            match_valor = re.search(r"([\d.,]+)\s*([CD])", descricao_completa)
            if match_valor:
                valor_atual = float(match_valor.group(1).replace(".", "").replace(",", "."))
                tipo_atual = match_valor.group(2)

                # Determinar entrada ou saída
                entrada = valor_atual if tipo_atual == "C" else 0
                saida = valor_atual if tipo_atual == "D" else 0
                total = entrada - saida

                # Adicionar transação à lista
                transacao = {
                    "DATA": data_atual,
                    "ENTRADAS": entrada,
                    "SAÍDAS": saida,
                    "TOTAL": total,
                    "DESCRITIVO": descricao_completa
                }
                transacoes.append(transacao)

            continue

        i += 1

    print(f"✅ Organização concluída: {len(transacoes)} transações encontradas.")
    return transacoes