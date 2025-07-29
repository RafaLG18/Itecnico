import RepositorioGeral from "../model/repositories/repositorioGeral.js";

const LoginController = {
  fazerLogin: async (req, res) => {
    try {
      const { cpf, senha } = req.body;
      
      console.log(`[LOGIN] Tentativa de login - CPF: ${cpf} - ${new Date().toISOString()}`);

      if (!cpf || !senha) {
        console.log(`[LOGIN] Login negado - Dados incompletos - CPF: ${cpf}`);
        return res.status(400).json({ erro: "CPF e senha são obrigatórios." });
      }

      const repositorio = new RepositorioGeral();
      const usuario = await repositorio.findUserByCpfAndSenha(cpf, senha);

      if (usuario) {
        console.log(`[LOGIN] Login bem-sucedido - CPF: ${cpf} - Tipo: ${usuario.tipo} - Nome: ${usuario.nome}`);
        return res.status(200).json({ 
          mensagem: "Login realizado com sucesso.",
          tipo: usuario.tipo,
          id: usuario.id,
          nome: usuario.nome
        });
      } else {
        console.log(`[LOGIN] Login falhado - Credenciais inválidas - CPF: ${cpf}`);
        return res.status(401).json({ erro: "Credenciais inválidas." });
      }
    } catch (error) {
      console.error(`[LOGIN] Erro no login - CPF: ${req.body?.cpf} - Erro:`, error);
      return res.status(500).json({ erro: "Erro interno do servidor." });
    }
  }
};

export default LoginController;
