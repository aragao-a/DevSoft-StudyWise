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

export const updateQuizScore = async (req, res) => {
  const { userId, quizId, correctAnswers } = req.body;

  try {
      // Verifica se userId, quizId e correctAnswers foram fornecidos
      if (!userId || !quizId || correctAnswers === undefined) {
          return res.status(400).json({ message: "userId, quizId e correctAnswers são obrigatórios." });
      }

      // Atualiza a pontuação do quiz no banco de dados
      const updatedQuiz = await Quiz.updateQuizScore(userId, quizId, correctAnswers);

      // Verifica se o quiz foi atualizado
      if (!updatedQuiz) {
          return res.status(404).json({ message: "Quiz não encontrado." });
      }

      // Retorna o quiz atualizado
      res.status(200).json({ quiz: updatedQuiz });
  } catch (error) {
      console.error("Erro ao atualizar pontuação do quiz:", error);
      res.status(500).json({ message: "Erro ao atualizar pontuação do quiz." });
  }
};