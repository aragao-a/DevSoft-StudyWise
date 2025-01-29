import pathlib
import textwrap
import json

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown

from IPython.display import Image
from IPython.core.display import HTML

dependencies = [
    "grpcio==1.67.1"  # Se der timeout, reduzir o grpcio para essa versão
    # npm install express
    # pip install -q -U google-generativeai
]

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

GOOGLE_API_KEY=''

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

img = Image('Back-end/assets/mapa-mental-evidencias-da-evolucao-biologica-biologia.jpg')
img2 = Image('Back-end/assets/Mico_azul1.jpeg')

Validade_1 = model.generate_content(["""Avalie o conteúdo fornecido e determine se ele possui informações suficientes e estruturadas para 
                                     criar perguntas significativas. Por exemplo, rejeite conteúdos muito curtos (menos de 10 palavras úteis) 
                                     ou formados apenas por frases desconexas.Responda apenas com True ou False. Retorne True caso ele seja 
                                     coerente caso contrário retorne False""", img], stream=True)
Validade_1.resolve()
print(Validade_1.text)

Validade_2 = model.generate_content(["""Determine se o conteúdo fornecido aborda um tema ou assunto definido. Responda apenas com True ou False. 
                                     Caso o texto ou imagem seja completamente genérico ou irrelevante, Retorne False.""", img], stream=True)
Validade_2.resolve()
print(Validade_2.text)

Validade_3 = model.generate_content(["""Verifique se o conteúdo fornecido é lógico, coerente e compreensível.Responda apenas com True ou False. 
                                     Se ele contiver apenas elementos desorganizados, sem conexão ou significado claro, Retorne False, caso 
                                     contrário retorne True.""", img], stream=True)
Validade_3.resolve()
print(Validade_3.text) 

valid_response = False

if "True" in Validade_1.text and "True" in Validade_3.text and  "True" in Validade_3.text:

    response = model.generate_content([
        """Analise o conteúdo do documento ou imagem fornecido e, com base nas informações apresentadas, elabore perguntas relevantes relacionadas ao tema principal. Certifique-se de que cada pergunta possa ser respondida exclusivamente com as informações presentes no conteúdo, sem depender de conhecimento externo.
            Para cada pergunta:

            Forneça quatro opções de resposta (A, B, C, D) que sejam plausíveis e estejam claramente conectadas ao conteúdo.
            Destaque qual é a resposta correta entre as opções.
            Apresente o resultado no formato JSON estruturado conforme o modelo abaixo, e gere 10 questões:

            [
                {
                "id": 1
                "question": "Texto da pergunta.",
                "options": [
                    "Opção 0",
                    "Opção 1",
                    "Opção 2",
                    "Opção 3"
                ],
                "correct_answer": index referente às opções, varia de 0 a 3.
                }
            ] // Repetir estrutura para cada pergunta gerada incrementando o valor de id. NÃO inclua mais nenhum campo do que os solicitados.
            Valide se a pergunta pode ser respondida diretamente com as informações fornecidas, mas não inclua isso no JSON gerado.""", img], stream=True)
    
    response.resolve()
    valid_response = True
else:
    print("Documento fornecido não possui conteudo claro o suficiente para gerar perguntas")
    valid_response = False

if valid_response == True:
    
    cleaned_text = response.text.strip('```json\n').strip('\n```')

    data = json.loads(cleaned_text)
    formatted_json = json.dumps(data, indent=4, ensure_ascii=False)

    with open('Back-end/questions.json', 'w', encoding='utf-8') as json_file:

        json_file.write(formatted_json)
    