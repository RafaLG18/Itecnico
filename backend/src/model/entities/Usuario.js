class Usuario {
 
  constructor() {
    this.id = null;
    this.nome = null;
    this.cpf = null;
    this.senha = null;
    this.tipo = null;
  }

  setId(id){
    this.id=id;
  }
  setNome(nome) {
    this.nome = nome;
  }
  setCpf(cpf) {
    this.cpf = cpf;
  }
  setSenha(senha) {
    this.senha = senha;
  }
  setTipo(tipo) {
    this.tipo = tipo;
  }
  getId(){
    return this.id;
  }
  getNome() {
    return this.nome;
  }
  getCpf() {
    return this.cpf;
  }
  getSenha() {
    return this.senha;
  }
  getTipo() {
    return this.tipo;
  }
}
export default Usuario