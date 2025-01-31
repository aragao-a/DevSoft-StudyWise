# Backend - Integração com Google Gemini 1.5 Flash

## Status Atual
O backend está integrado com a API do Google Gemini (versão `gemini-1.5-flash`) para:
- **Validação de imagens**
- **Geração automática de quizzes** com base no conteúdo da imagem

## Configuração e Execução

### 1. Clonar o repositório
```sh
 git clone <repo_url>
 cd <repo_dir>
```

### 2. Configurar a chave da API
A chave da API do Google Gemini deve ser armazenada no arquivo `.env`.

### 3. Rodar o backend
```sh
node server.js
```

## Uso da API
### Upload de imagem e processamento
O backend recebe a imagem via requisição HTTP POST e processa a validação e geração de quiz.

#### Endpoint:
```http
POST /upload
```

#### Parâmetros:
- `file`: Arquivo de imagem enviado via multipart/form-data

#### Exemplo de requisição com `cURL`:
```sh
curl -X POST http://localhost:5000/upload -F "file=@caminho/para/imagem.png"
```

## Respostas esperadas
### Quando a imagem é válida
Se a imagem contiver informações estruturadas suficientes, o backend retorna:
```json
{
    [
    {
        "id": 0,
        "question": "Texto da pergunta.",
        "options": [
            "Opção A",
            "Opção B",
            "Opção C",
            "Opção D"
        ],
        "correct_answer": "Index da resposta correta (0, 1, 2 ou 3)",
        "validation": "Explicação de como a pergunta pode ser respondida com base no conteúdo fornecido."
    }
    // Repetir estrutura para cada pergunta gerada.
    ]
}
```

### Quando a imagem é inválida
Se a imagem não contiver conteúdo estruturado o suficiente, o backend retorna:
```json
{
    "message": "A mídia não é válida para gerar um quiz."
}
```

## Acesso ao Quiz Gerado
As perguntas geradas são salvas no arquivo `questions.json`, que pode ser acessado pelo endpoint:

#### Endpoint:
```http
GET /questions.json
```

## Configuração de Prompts
Os prompts utilizados na interação com a API do Google Gemini estão armazenados em:
```
src/api/prompts.json
```

