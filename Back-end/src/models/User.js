import db from "../utils/db.js";

class User {
  static async create(username, passwordHash, email) {
    const query = `
      INSERT INTO users (username, password_hash, email)
      VALUES (?, ?, ?)
      RETURNING id, username, email;
    `;
    const values = [username, passwordHash, email];
    const result = await db.get(query, values);
    return result;
  }

  static async findByUsername(username) {
    const query = `
      SELECT * FROM users
      WHERE username = ?;
    `;
    const user = await db.get(query, [username]);
    return user;
  }
}

export default User;