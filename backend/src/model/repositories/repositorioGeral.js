import UsuarioRepository from "./UsuarioRepository.js";
import ServicoRepository from "./ServicoRepository.js";
class repositorioGeral {
    constructor(){
     this.UserRepository= new UsuarioRepository();
     this.ServiceRepository= new ServicoRepository();   
    } 
    addUser(usuario){
        this.UserRepository.setUsuario(usuario)
    }
    async addServico(servico){
        await this.ServiceRepository.setServico(servico)
    }
}
export default repositorioGeral;
