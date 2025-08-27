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
    await this.userRepository.setUsuario(usuario);
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

  async getServicosPrestados() {
    return await this.prestadoServiceRepository.getServicosPrestado();
  }
  async getServicosGeral() {
    return await this.geralServiceRepository.getServicoGeral();
  }
  async getServicoPrestadoById(id) {
    return await this.prestadoServiceRepository.getServicoPrestadoById(id);
  }
  async updateServicoPrestado(id, servicoPrestado) {
    return await this.prestadoServiceRepository.updateServicoPrestado(id, servicoPrestado);
  }

  async getPedidosByPrestador(id_prestador) {
    return await this.pedidoRepository.getPedidosByPrestador(id_prestador);
  }

  async getPedidosByCliente(id_cliente) {
    return await this.pedidoRepository.getPedidosByCliente(id_cliente);
  }

  async deletePedido(id) {
    return await this.pedidoRepository.deletePedido(id);
  }

  async updatePedidoStatus(id, status) {
    return await this.pedidoRepository.updatePedidoStatus(id, status);
  }
}
export default repositorioGeral;
