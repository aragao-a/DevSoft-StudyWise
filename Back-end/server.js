import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import * as dotenv from "dotenv";
import { validateContent, validateText, generateQuestions, textBasedQuiz } from "./src/api/aiIntegration.js";
import { register, login } from "./src/api/authController.js";
import { generateQuiz, getQuizHistory, getLastQuiz, getSmallHistory, 
        updateLabel,createLabel, getTargetQuestions, updateQuizScore, deleteQuiz, getLabelSummary, renameLabel} from "./src/api/quizController.js";
import { dirname } from 'path';
import localtunnel from 'localtunnel'

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json()); // Para processar JSON no request body


const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, "uploads");
const USE_LOCALTUNNEL = process.env.USE_LOCALTUNNEL === 'true' || false ;


// Função para atualizar o .env do frontend
const updateFrontendEnv = (tunnelUrl) => {
  const frontendEnvPath = path.join(__dirname, '../front-end/StudyWise/.env');
  const envContent = `EXPO_PUBLIC_API_URL=${tunnelUrl}`;

  fs.writeFileSync(frontendEnvPath, envContent);
  console.log(`Frontend .env atualizado com a URL: ${tunnelUrl}`);
};

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
  // Extrai o bloco JSON do markdown
  const jsonMatch = markdown.match(/```json\n([\s\S]*?)\n```/);
  if (!jsonMatch || !jsonMatch[1]) {
      return null; // Retorna null se não encontrar um bloco JSON válido
  }

  try {
      // Converte o JSON extraído para um objeto JavaScript
      const fullJson = JSON.parse(jsonMatch[1]);

      // Extrai o título, o label e o conteúdo de "questions"
      const { title, label, questions } = fullJson;

      // Verifica se os campos necessários estão presentes
      if (!title || !label || !questions) {
          throw new Error("O JSON não contém os campos obrigatórios: title, label ou questions.");
      }

      // Retorna um objeto com o título, o label e o conteúdo de "questions"
      return {
          title,
          label,
          questions,
      };
  } catch (error) {
      console.error("Erro ao processar o JSON:", error);
      return null;
  }
};

const upload = multer({ storage });


// Rota para upload e processamento do arquivo
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }

      const { userId } = req.body; // Recebe o userId do corpo da requisição
      if (!userId) {
          return res.status(400).json({ message: "ID do usuário não fornecido." });
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

      // Extrair o JSON da string Markdown 
      const quizData = typeof generatedQuiz === "string" ? extractJsonFromMarkdown(generatedQuiz) : generatedQuiz;
      if (!quizData) {
          return res.status(500).json({ message: "Erro ao processar o quiz gerado." });
      }

      // Preparar os dados para salvar no banco de dados
      const payload = {
          userId,
          quiz_name: quizData.title, // Salva o título como quiz_name
          quiz_label: quizData.label, // Salva o label como quiz_label
          quiz_data: quizData.questions, // Salva apenas o conteúdo de questions
      };

      // Salvar o quiz no banco de dados usando o quizController
      const newQuiz = await generateQuiz({ body: payload }, res);

      console.log("Quiz salvo com sucesso!");
      res.status(200).json({ message: "Quiz gerado e salvo com sucesso!", quiz: newQuiz });
  } catch (error) {
      console.error("Erro no processamento do arquivo:", error);
      res.status(500).json({ message: "Erro no processamento do arquivo." });
  }
});

app.post("/text-quiz", async (req, res) => {
    try {
        const { text, userId } = req.body; // Recebe o texto e o userId do corpo da requisição
        if (!text || !userId) {
            return res.status(400).json({ message: "Texto ou ID do usuário não fornecido." });
        }

        console.log("Texto recebido:", text);

        // Validar o texto
        const isValid = await validateText(text);
        if (!isValid) {
            return res.status(400).json({ message: "O texto fornecido não é válido para gerar um quiz." });
        }

        console.log("Texto validado. Gerando quiz...");

        // Gerar o quiz com base no texto
        const generatedQuiz = await textBasedQuiz(text);
        if (!generatedQuiz) {
            return res.status(500).json({ message: "Erro na geração do quiz." });
        }

        // Extrair o JSON da string Markdown 
        const quizData = typeof generatedQuiz === "string" ? extractJsonFromMarkdown(generatedQuiz) : generatedQuiz;
        if (!quizData) {
            return res.status(500).json({ message: "Erro ao processar o quiz gerado." });
        }

        // Preparar os dados para salvar no banco de dados
        const payload = {
            userId,
            quiz_name: quizData.title, // Salva o título como quiz_name
            quiz_label: quizData.label, // Salva o label como quiz_label
            quiz_data: quizData.questions, // Salva apenas o conteúdo de questions
        };

        // Salvar o quiz no banco de dados usando o quizController
        const newQuiz = await generateQuiz({ body: payload }, res);

        console.log("Quiz salvo com sucesso!");
        res.status(200).json({ message: "Quiz gerado e salvo com sucesso!", quiz: newQuiz });
    } catch (error) {
        console.error("Erro no processamento do texto:", error);
        res.status(500).json({ message: "Erro no processamento do texto." });
    }
});


// Rotas de autenticação
app.post("/register", register);
app.post("/login", login);

// Rotas de quiz
app.get("/small-history/:userId", getSmallHistory);
app.get("/quiz-history/:userId", getQuizHistory);
app.get("/questions.json/:userId", getLastQuiz);
app.get("/target_questions/:userId/:quizId", getTargetQuestions);
app.post("/update_quiz_score", updateQuizScore);
app.delete("/delete_quiz/:userId/:quizId", deleteQuiz);

//Rotas de Label
app.post("/create_label", createLabel);
app.put("/rename_label/:userId/:quizId", renameLabel); //Atualiza label do bd QUIZ
app.put("/update_label/:userId/:label", updateLabel); //Atualiza label do bd LABELS
app.get("/label_summary/:userId", getLabelSummary);

// Iniciar o servidor


(async () => {
  try {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

    if (USE_LOCALTUNNEL) {
      // Inicia o LocalTunnel
      const tunnel = await localtunnel({ port: PORT });
      console.log(`LocalTunnel URL: ${tunnel.url}`);

      // Atualiza o .env do frontend
      updateFrontendEnv(tunnel.url);

      // Fecha o túnel ao encerrar o servidor
      tunnel.on("close", () => {
        console.log("Túnel fechado.");
      });
    }
  } catch (error) {
    console.error("Erro ao iniciar o Servidor:", error);
  }
})();
