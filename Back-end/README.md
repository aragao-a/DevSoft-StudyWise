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
node index.js path_da_imagem
```

## Respostas esperadas
### Quando a imagem é válida
Se a imagem contiver informações estruturadas suficientes, o backend retorna:
```json
{
    "message": "A mídia é válida.",
    "questions": [
        {
            "question": "Texto da pergunta.",
            "options": {
                "A": "Opção A",
                "B": "Opção B",
                "C": "Opção C",
                "D": "Opção D"
            },
            "correct_answer": "Letra da resposta correta (A, B, C ou D)",
            "validation": "Explicação de como a pergunta pode ser respondida com base no conteúdo fornecido."
        }
        // Repetir estrutura para cada pergunta gerada.
    ],
    "validation_status": "ok"
}
```

### Quando a imagem é inválida
Se a imagem não contiver conteúdo estruturado o suficiente, o backend retorna:
```json
{
    "message": "A mídia não contém conteúdo estruturado o suficiente para gerar as perguntas."
}
```

## Configuração de Prompts
Os prompts utilizados na interação com a API do Google Gemini estão armazenados em:
```
src/api/prompts.json
```

---


