import db from "../utils/db.js";

class Quiz {
  static async create(userId, quizData) {
      const query = `
          INSERT INTO quizzes (user_id, quiz_data)
          VALUES (?, ?)
          RETURNING *;
      `;
      const values = [userId, JSON.stringify(quizData)];
      const result = await db.get(query, values);
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