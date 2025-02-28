import fetch, { Headers } from "node-fetch";
import * as dotenv from "dotenv";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração dos clientes da API
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const promptKey_Validation = "validate_image";
const promptKey_Questions = "generate_questions";
const promptKey_TextQuiz = "generate_text_quiz";

// Polyfill para fetch e Headers no Node.js
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
if (!globalThis.Headers) {
    globalThis.Headers = Headers;
}

// Função para carregar prompts do JSON
const loadPrompts = () => {
    try {
        const rawData = fs.readFileSync("./src/api/prompts.json", "utf8");
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Erro ao carregar prompts:", error.message);
        return null;
    }
};

// Função para validar conteúdo com base em um prompt específico
export const validateContent = async (imageBase64, mimeType) => {
    try {
        const prompts = loadPrompts();
        if (!prompts || !prompts[promptKey_Validation]) {
            throw new Error(`Prompt "${promptKey_Validation}" não encontrado.`);
        }

        const prompt = prompts[promptKey_Validation];

        // Monta o payload correto com inlineData
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: mimeType,
                },
            },
        ]);

        if (result && result.response) {
            return result.response.text();
        } else {
            throw new Error("Resposta inválida da API.");
        }
    } catch (error) {
        console.error("Erro na validação:", error.message);
        return null;
    }
};

export const validateText = async (text) => {
    try {
        const prompts = loadPrompts();
        if (!prompts || !prompts["validate_text"]) {
            throw new Error("Prompt de validação de texto não encontrado.");
        }

        const prompt = prompts["validate_text"];

        // Monta o payload com o texto fornecido
        const result = await model.generateContent([
            prompt,
            {
                text: text,
            },
        ]);

        if (result && result.response) {
            const validationResult = result.response.text().toLowerCase();
            return validationResult.includes("true");
        } else {
            throw new Error("Resposta inválida da API.");
        }
    } catch (error) {
        console.error("Erro na validação do texto:", error.message);
        return false;
    }
};

// Função para validar conteúdo com base em um prompt específico
export const generateQuestions = async (imageBase64, mimeType) => {
  try {
      const prompts = loadPrompts();
      if (!prompts || !prompts[promptKey_Questions]) {
          throw new Error(`Prompt "${promptKey_Questions}" não encontrado.`);
      }

      const prompt = prompts[promptKey_Questions];

      // Monta o payload correto com inlineData
      const result = await model.generateContent([
          prompt,
          {
              inlineData: {
                  data: imageBase64,
                  mimeType: mimeType,
              },
          },
      ]);

      if (result && result.response) {
          return result.response.text();
      } else {
          throw new Error("Resposta inválida da API.");
      }
  } catch (error) {
      console.error("Erro na geração do quiz:", error.message);
      return null;
  }
};

// Função para gerar um quiz baseado em texto
export const textBasedQuiz = async (text_quiz) => {
    try {
        const prompts = loadPrompts();
        if (!prompts || !prompts[promptKey_TextQuiz]) {
            throw new Error(`Prompt "${promptKey_TextQuiz}" não encontrado.`);
        }

        const prompt = prompts[promptKey_TextQuiz];

        // Monta o payload com o texto fornecido
        const result = await model.generateContent([
            prompt,
            {
                text: text_quiz,
            },
        ]);

        if (result && result.response) {
            return result.response.text();
        } else {
            throw new Error("Resposta inválida da API.");
        }
    } catch (error) {
        console.error("Erro na geração do quiz:", error.message);
        return null;
    }
};
