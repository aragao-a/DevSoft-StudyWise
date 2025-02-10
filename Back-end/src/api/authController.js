import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já em uso." });
    }

    // Cria hash da senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria o usuário
    const newUser = await User.create(username, passwordHash, email);

    res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ message: "Erro no cadastro." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Email não encontrado." });
    }

    // Valida a senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // Retorna apenas informações não sensíveis
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };

    res.status(200).json({ message: "Login bem-sucedido!", userResponse });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no login." });
  }
};