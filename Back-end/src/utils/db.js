import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as dotenv from "dotenv";
dotenv.config();
const DB_PATH = process.env.DB_PATH;

// Abre a conexão com o banco de dados SQLite
const db = await open({
  filename: DB_PATH, // Caminho para o arquivo do banco de dados
  driver: sqlite3.Database,
});

export default db;