const LoginController = {
  fazerLogin: (req, res) => {
    const { email, senha } = req.body;

    // Simulação de autenticação
    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    // Aqui você chamaria o banco de dados e validaria credenciais
    if (email === "admin@exemplo.com" && senha === "123456") {
      return res.status(200).json({ mensagem: "Login realizado com sucesso." });
    } else {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }
  }
};

export default LoginController;
