import db from "./db.js";

async function initDatabase() {
  try {
    // Cria a tabela de usuários
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Cria a tabela de quizzes
    await db.exec(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        quiz_name TEXT NOT NULL,
        quiz_label TEXT NOT NULL,
        quiz_score DEFAULT 0 NOT NULL,
        quiz_data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Cria a tabela de labels
    await db.exec(`
      CREATE TABLE IF NOT EXISTS labels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        label TEXT NOT NULL,
        color TEXT NOT NULL,
        primary_label_set TEXT CHECK(primary_label_set IN ('Biologia', 'Física', 'Química', 'História', 'Miscelâneo')) NOT NULL,
        UNIQUE(user_id, label),
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
}

initDatabase();