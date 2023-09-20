#!/bin/bash

# Verificar se o nome do arquivo foi fornecido como argumento
if [ -z "$1" ]; then
    echo "Por favor, forneça o nome do arquivo como argumento."
    exit 1
fi

# Nome do arquivo a ser verificado
FILE_NAME="$1"

# Nome do arquivo sem o caminho do diretório
BASE_NAME=$(basename "$FILE_NAME")

# Máximo de tentativas
MAX_TRIES=20

# Contador de tentativas
TRIES=0

# Loop para verificar se o arquivo existe & se tem conteudo no arquivo
while [ ! -s "$FILE_NAME" ]; do
    # Incrementa o contador de tentativas
    TRIES=$((TRIES + 1))

    # Verifica se o número máximo de tentativas foi atingido
    if [ $TRIES -ge $MAX_TRIES ]; then
        echo "Número máximo de tentativas alcançado. Saindo..."
        exit 1
    fi

    echo "Tentativa $TRIES: Arquivo $BASE_NAME ainda não foi criado. Aguardando..."
    sleep 60
done

# Mensagem quando o arquivo é criado
echo "Arquivo $BASE_NAME foi criado."
