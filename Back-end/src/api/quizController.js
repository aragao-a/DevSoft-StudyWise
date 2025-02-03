import Quiz from "../models/Quiz.js";

export const generateQuiz = async (req, res) => {
  const { userId, quizData } = req.body;

  try {
      // Salva o quiz no banco de dados
      const newQuiz = await Quiz.create(userId, quizData);
      return newQuiz; // Retorna o quiz salvo
  } catch (error) {
      console.error("Erro ao salvar o quiz:", error);
      throw error; // Lança o erro para ser tratado pela rota
  }
};

export const getQuizHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    // Busca os quizzes do usuário
    const quizzes = await Quiz.findByUserId(userId);

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    res.status(500).json({ message: "Erro ao buscar quizzes." });
  }
};

export const getLastQuiz = async (req, res) => {
  const { userId } = req.params;

  try {
    // Busca os quizzes do usuário
    const quizzes = await Quiz.findLastByUserId(userId);

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    res.status(500).json({ message: "Erro ao buscar quizzes." });
  }
};