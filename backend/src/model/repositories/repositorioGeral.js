import UsuarioRepository from "./UsuarioRepository.js";
import ServicoGeralRepository from "./ServicoGeralRepository.js";
import ServicoPrestadoRepository from "./ServicoPrestadoRepository.js";
import PedidoRepository from "./PedidoRepository.js";

class repositorioGeral {
  constructor() {
    this.userRepository = new UsuarioRepository();
    this.geralServiceRepository = new ServicoGeralRepository();
    this.prestadoServiceRepository = new ServicoPrestadoRepository();
    this.pedidoRepository = new PedidoRepository();
  }
  async addUser(usuario) {
    this.userRepository.setUsuario(usuario);
  }
  async addServicoGeral(servicoGeral) {
    await this.geralServiceRepository.setServicoGeral(servicoGeral);
  }
  async addServicoPrestado(servicoPrestado) {
    await this.prestadoServiceRepository.setServicoPrestado(servicoPrestado);
  }
  async addPedido(pedido) {
    await this.pedidoRepository.setPedido(pedido);
  }
  
  async findUserByCpfAndSenha(cpf, senha) {
    return await this.userRepository.findByCpfAndSenha(cpf, senha);
  }
}
export default repositorioGeral;
