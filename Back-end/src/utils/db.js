import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Abre a conexão com o banco de dados SQLite
const db = await open({
  filename: "./database.db", // Caminho para o arquivo do banco de dados
  driver: sqlite3.Database,
});

export default db;