# StudyWise
## Descrição do Projeto
O StudyWise é um app que transforma materiais físicos (imagens, PDF’s) ou ideias quaisquer em Quizzes dinâmicos e abrangentes.
Seja sobre História, Química, Biologia, Física ou algum assunto mais particular, o StudyWise aliado à API do Gemini vai gerar um quiz de 6 questões para o usuário treinar suas habilidades de forma lúdica e prática.

# Conteúdo
### Diretório do Back-End (node.js)
- Banco de dados SQL de Usuários e Quizzes associados
- Diretório /src incluindo modelos .json do Prompt para geração do quiz, e queries SQL para organização do Banco de Dados
- Servidor local, e arquivos que a gerenciam
- Arquivos Node Modules para o sistema de Servidor (npm)
- .env para inserção da key da API do Gemini
### Diretório do Front-End (React Native)
- Telas do app em arquivos .tsx no /app(stack) 
- Questões (questions.tsx)
- Resultados (results.tsx)
- Login (sign-up.tsx), e mais
### Diretório de assets
- Fontes importadas, imagens, vetores e ícones 
### Diretório de componentes reutilizados e exibidos na tela
- Custom button, Search bar, Quiz list
#### - Arquivos para funcionamento do expo (npx) e .env para encaixe do local host apropriado caso o Firewall barre o tunnel

## Tecnologias Usadas
- Google GEMINI AI API - API para implementação da inteligência
artificial
- React Native - Framework para otimizar o desenvolvimento do
Front-end
- NodeJS - Back-end
- VSCode
- GitHub
- FIGMA - Prototipação de Alta Fidelidade

## Requerimentos
Instalação de Dependências:
#### grpcio==1.67.1, se der timeout, reduzir o grpcio para essa versão
#### npm install - geral pro node modules
#### npm install express
#### pip install -q -U google-generativeai
#### npm install cors
#### npx expo install expo-secure-store

## Instruções de Uso
- Clonar o repositório
- Colocar a chave api no arquivo .env do backend
- Rodar o server com “node server.js”
- Colocar o ip no .env do Front End (em caso de incompatibilidade com LocalTunnel)
- Iniciar o expo com “npx expo start”

## Documentação
Backlog · StudyWise Devs - https://github.com/users/aragao-a/projects/1

## Visuais
- Protótipo de alta fidelidade do figma - https://www.figma.com/proto/kJM13olDfoxQQk2JzPQFjh?node-id=0-1&t=ytkKYi9t6iKNOkJ3-6
- Diagrama Lógico de interação dos arquivos - [https://drive.google.com/file/d/15V3_tdHRtPFAX6O8kGa_asCmBnJHcPuo/view?usp=drive_link](https://drive.google.com/file/d/13lKpZSIPCS2nfRsCu01bdlIBOzrvdcoQ/view)
- Test Cases - https://docs.google.com/spreadsheets/d/1pzFNj-8TCYBDTmfE6v067Y-wXdebyLeIiNzX6SrF0O4/edit?usp=sharing

## Informação de Suporte
aaa10@cin.ufpe.br
kbc@cin.ufpe.br
mvsl2@cin.ufpe.br
phmss@cin.ufpe.br

## Status do Projeto
89% Done

## Guidelines de Contribuição
Fechado pra contribuições.

