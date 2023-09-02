# API de Submissões

## Visão Geral

Esta API permite que você gerencie submissões para diversas categorias e linguagens de programação. A versão atual da API é `v1`.

## Requisitos

- Java 20
- Maven

## Endpoints

### POST /v1/submissoes

Este endpoint permite que você faça uma submissão de aplicação com detalhes específicos como `userId`, `categoria`, `linguagem`, e o arquivo em si (`arquivo`).

#### Parâmetros da Requisição

- `userId` (string): O ID do usuário realizando a submissão.
- `categoria` (enum): A categoria da submissão. Valores válidos são `PESO_PENA` e `PESO_PESADO`.
- `linguagem` (string): A linguagem de programação usada na submissão.
- `arquivo` (arquivo): O arquivo sendo submetido.

#### Comando cURL de Exemplo

```bash
curl -X POST "http://localhost:8080/v1/submissoes" \
     -H "Content-Type: multipart/form-data" \
     -F "userId=seuUserId" \
     -F "categoria=PESO_PENA" \
     -F "linguagem=suaLinguagemDeProgramacao" \
     -F "arquivo=@/caminho/para/seu/arquivo"
```

### Documentação Swagger

A documentação Swagger para esta API está disponível em:

```
http://localhost:8080/v1/submissoes/doc
```

## Como Executar

### Executando Localmente

1. Certifique-se de que você tem Java 20 e Maven instalados.
2. Clone o repositório.
3. Navegue até o diretório do projeto e execute `mvn spring-boot:run`.
4. A API estará disponível em `http://localhost:8080`.

## Dependências

- Spring Boot 3.1.3
- AWS SDK
- Lombok
- Spring Cloud AWS Messaging