import UsuarioRepository from "./UsuarioRepository.js";
import ServicoGeralRepository from "./ServicoGeralRepository.js";
import PedidoRepository from "./PedidoRepository.js";
class repositorioGeral {
    constructor(){
     this.UserRepository= new UsuarioRepository();
     this.GeneralServiceRepository= new ServicoGeralRepository();   
     this.PedidoRepository= new PedidoRepository();   
    } 
    addUser(usuario){
        this.UserRepository.setUsuario(usuario)
    }
    async addServicoGeral(servicoGeral){
        await this.GeneralServiceRepository.setServicoGeral(servicoGeral)
    }
    async addPedido(pedido){
        await this.PedidoRepository.setPedido(pedido)
    }
}
export default repositorioGeral;
