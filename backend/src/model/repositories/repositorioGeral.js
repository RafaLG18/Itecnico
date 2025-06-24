import UsuarioRepository from "./UsuarioRepository.js";
import ServicoRepository from "./ServicoRepository.js";
import PedidoRepository from "./PedidoRepository.js";
class repositorioGeral {
    constructor(){
     this.UserRepository= new UsuarioRepository();
     this.ServiceRepository= new ServicoRepository();   
     this.PedidoRepository= new PedidoRepository();   
    } 
    addUser(usuario){
        this.UserRepository.setUsuario(usuario)
    }
    async addServico(servico){
        await this.ServiceRepository.setServico(servico)
    }
    async addPedido(pedido){
        await this.PedidoRepository.setPedido(pedido)
    }
}
export default repositorioGeral;
