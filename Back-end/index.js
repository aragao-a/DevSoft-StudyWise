import { validateContent } from "./src/api/aiIntegration.js";
import { generateQuestions } from "./src/api/aiIntegration.js";
import fs from 'fs';

// Função para carregar e converter imagem em Base64
const loadImageAsBase64 = (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        return imageBuffer.toString("base64");
    } catch (error) {
        console.error("Erro ao carregar imagem:", error.message);
        return null;
    }
};

const main = async () => {
    //const imagePath = "./assets/invalid.jpeg";
    //const imagePath = "./assets/valid.png";
    const imagePath = process.argv[2];

    const imgBase64 = loadImageAsBase64(imagePath);
    if (!imgBase64) {
        console.error("Falha ao converter imagem para Base64.");
        return;
    }

    console.log("Imagem carregada com sucesso.");
    
    const validationResults = await validateContent(imgBase64, "image/png");

    if (validationResults) {
      const booleanValue = JSON.parse(validationResults.toLowerCase());
      if (booleanValue) {
        console.log("A mídia é válida.");

        const generateQuiz = await generateQuestions(imgBase64, "image/png");
        
        if (generateQuiz) {
          console.log(generateQuiz);
        }
        else {
          console.log("Erro na geração do quiz.");
        }
        } 
      else {
        console.log("A mídia não contém conteúdo estruturado o suficiente para gerar as perguntas.");
        }    
    } 
    else {
        console.log("Erro na validação.");
    }
};

main();
