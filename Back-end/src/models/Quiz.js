import db from "../utils/db.js";

class Quiz {
    static async create(userId, quiz_name, quiz_label, quiz_data) {
        const query = `
            INSERT INTO quizzes (user_id, quiz_name, quiz_label, quiz_data)
            VALUES (?, ?, ?, ?)
            RETURNING *;
        `;
        const values = [userId, quiz_name, quiz_label, JSON.stringify(quiz_data)];
        const result = await db.get(query, values);
        return result;
    }

    static async updateQuizScore(userId, quizId, correctAnswers) {
        const query = `
            UPDATE quizzes
            SET quiz_score = ?
            WHERE user_id = ? AND id = ?
            RETURNING *;
        `;
        const values = [correctAnswers, userId, quizId];
        const result = await db.get(query, values); // Usar db.get para retornar o quiz atualizado
        return result;
    }

    static async findByUserId(userId) {
      const query = `
          SELECT * FROM quizzes
          WHERE user_id = ?
          ORDER BY created_at DESC;
      `;
      const quizzes = await db.all(query, [userId]);
      return quizzes.map((quiz) => ({
          ...quiz,
          quiz_data: JSON.parse(quiz.quiz_data), // Converte de volta para JSON
      }));
    }

    static async getSmallHistoryByUserId(userId) {
    const query = `
        SELECT id, quiz_name AS title, quiz_label AS label, created_at AS date
        FROM quizzes
        WHERE user_id = ?
        ORDER BY created_at DESC;
    `;
    const quizzes = await db.all(query, [userId]);
    return quizzes; // Retorna diretamente o resultado da consulta
    }

    static async getByUserIdAndQuizId(userId, quizId) {
    const query = `
        SELECT * FROM quizzes
        WHERE user_id = ? AND id = ?;
    `;
    const quizzes = await db.all(query, [userId, quizId])
    return quizzes.map((quiz) => ({
        ...quiz,
        quiz_data: JSON.parse(quiz.quiz_data), // Converte de volta para JSON
    }));
    }

    static async findLastByUserId(userId) {
    const query = `
          SELECT * FROM quizzes
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 1;
      `;
    const quizzes = await db.all(query, [userId]);
    return quizzes.map((quiz) => ({
        ...quiz,
        quiz_data: JSON.parse(quiz.quiz_data), // Converte de volta para JSON
    }));
}
}

export default Quiz;