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

# Loop para verificar se o arquivo existe
while [ ! -f "$FILE_NAME" ]; do
    echo "Arquivo $BASE_NAME ainda não foi criado. Aguardando..."
    sleep 10
done

# Mensagem quando o arquivo é criado
echo "Arquivo $BASE_NAME foi criado."
