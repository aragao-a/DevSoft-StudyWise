import Quiz from "../models/Quiz.js";

export const generateQuiz = async (req, res) => {
  const { userId, quiz_name, quiz_label, quiz_data } = req.body;

  try {
      // Salva o quiz no banco de dados
      const newQuiz = await Quiz.create(userId, quiz_name, quiz_label, quiz_data);
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

export const getSmallHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    // Busca resumo dos quizzes do usuário
    const quizzes = await Quiz.getSmallHistoryByUserId(userId);

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Erro ao buscar quizzes:", error);
    res.status(500).json({ message: "Erro ao buscar quizzes." });
  }
};

export const getTargetQuestions = async (req, res) => {
  const { userId, quizId } = req.params;

  try {
      // Verifica se userId e quizId foram fornecidos
      if (!userId || !quizId) {
          return res.status(400).json({ message: "userId e quizId são obrigatórios." });
      }

      // Busca o quiz específico no banco de dados
      const quizzes = await Quiz.getByUserIdAndQuizId(userId, quizId);

      // Verifica se o quiz foi encontrado
      if (!quizzes) {
          return res.status(404).json({ message: "Quiz não encontrado." });
      }

      // Retorna o quiz encontrado
      res.status(200).json({ quizzes });
    } catch (error) {
        console.error("Erro ao buscar quiz:", error);
        res.status(500).json({ message: "Erro ao buscar quiz." });
    }
};