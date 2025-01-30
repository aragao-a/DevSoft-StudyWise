import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import { validateContent, generateQuestions } from "./src/api/aiIntegration.js";
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json()); // Para processar JSON no request body

const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, "uploads");
const QUESTIONS_FILE = path.join(__dirname, "questions.json");


// Configuração do multer para armazenar os arquivos recebidos na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const extractJsonFromMarkdown = (markdown) => {
    const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    return null;
  };

const upload = multer({ storage });

// Rota para retornar o arquivo questions.json
app.get("/questions.json", (req, res) => {
  res.sendFile(QUESTIONS_FILE);
});

// Rota para upload e processamento do arquivo
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }
  
      console.log("Arquivo recebido:", req.file.filename);
      const imagePath = req.file.path;
      const imageBuffer = fs.readFileSync(imagePath);
      const imgBase64 = imageBuffer.toString("base64");
  
      // Validar a imagem
      const isValid = await validateContent(imgBase64, "image/png");
  
      if (!isValid || JSON.parse(isValid.toLowerCase()) === false) {
        return res.status(400).json({ message: "A mídia não é válida para gerar um quiz." });
      }
  
      console.log("Mídia validada. Gerando quiz...");
  
      // Gerar as perguntas do quiz
      const generatedQuiz = await generateQuestions(imgBase64, "image/png");
  
      if (!generatedQuiz) {
        return res.status(500).json({ message: "Erro na geração do quiz." });
      }
  
      // Extrair o JSON da string Markdown (se necessário)
      const quizData = typeof generatedQuiz === "string" ? extractJsonFromMarkdown(generatedQuiz) : generatedQuiz;
  
      if (!quizData) {
        return res.status(500).json({ message: "Erro ao processar o quiz gerado." });
      }
  
      // Salvar as perguntas no questions.json
      fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(quizData, null, 2));
  
      console.log("Quiz atualizado com sucesso!");
      res.status(200).json({ message: "Quiz gerado com sucesso!", quiz: quizData });
    } catch (error) {
      console.error("Erro no processamento do arquivo:", error);
      res.status(500).json({ message: "Erro no processamento do arquivo." });
    }
  });

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
