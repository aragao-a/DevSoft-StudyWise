import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Verifica se todos os campos foram fornecidos
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }


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
    const userId = newUser.id;

    // Cria as labels padrão para o usuário
    const defaultLabels = [
      { label: "Biologia", color: "#009A56", primaryLabelSet: "Biologia" },
      { label: "Física", color: "#FF4770", primaryLabelSet: "Física" },
      { label: "História", color: "#97482d", primaryLabelSet: "História" },
      { label: "Miscelâneo", color: "#5A48ff", primaryLabelSet: "Miscelâneo" },
      { label: "Química", color: "#FF972C", primaryLabelSet: "Química" },
    ];

    for (const label of defaultLabels) {
      await Quiz.createLabel(userId, label.label, label.color, label.primaryLabelSet);
    }

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