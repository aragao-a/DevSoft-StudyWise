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

    static async deleteByUserIdAndQuizId(userId, quizId) {
        const query = `
            DELETE FROM quizzes
            WHERE user_id = ? AND id = ?
            RETURNING *;
        `;
        const values = [userId, quizId];
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
        const result = await db.get(query, values); 
        return result;
    }

    static async renameLabelByUserIdAndQuizId(userId, quizId, newLabel) {
        const query = `
            UPDATE quizzes
            SET quiz_label = ?
            WHERE user_id = ? AND id = ?
            RETURNING *;
        `;
        const values = [newLabel, userId, quizId];
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
          quiz_data: JSON.parse(quiz.quiz_data), 
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
    return quizzes; 
    }

    static async getByUserIdAndQuizId(userId, quizId) {
    const query = `
        SELECT * FROM quizzes
        WHERE user_id = ? AND id = ?;
    `;
    const quizzes = await db.all(query, [userId, quizId])
    return quizzes.map((quiz) => ({
        ...quiz,
        quiz_data: JSON.parse(quiz.quiz_data), 
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
        quiz_data: JSON.parse(quiz.quiz_data),
    }));
    }

    static async getLabelSummaryByUserId(userId) {
        const query = `
            SELECT 
                l.label AS label,
                l.color AS color,
                l.primary_label_set AS primaryLabelSet,
                COUNT(q.id) AS quizCount,
                SUM(quiz_score) AS totalScore
            FROM 
                labels l
            LEFT JOIN 
                quizzes q ON l.user_id = q.user_id AND l.label = q.quiz_label
            WHERE 
                l.user_id = ?
            GROUP BY 
                l.label;
        `;
        const values = [userId];
        const result = await db.all(query, values);
        return result;
    }

    static async createLabel(userId, label, color, primaryLabelSet) {
        const query = `
            INSERT INTO labels (user_id, label, color, primary_label_set)
            VALUES (?, ?, ?, ?)
            RETURNING *;
        `;
        const values = [userId, label, color, primaryLabelSet];
        const result = await db.get(query, values);
        return result;
    }

    static async updateLabel(userId, oldLabel, newLabel, color, primaryLabelSet) {
        const query = `
            UPDATE labels
            SET label = ?, color = ?, primary_label_set = ?
            WHERE user_id = ? AND label = ?
            RETURNING *;
        `;
        const values = [newLabel, color, primaryLabelSet, userId, oldLabel];
        const result = await db.get(query, values);
        return result;
    }

    static async getLabelsByUserId(userId) {
        const query = `
            SELECT label, color, primary_label_set AS primaryLabelSet
            FROM labels
            WHERE user_id = ?;
        `;
        const result = await db.all(query, [userId]);
        return result;
    }

}

export default Quiz;