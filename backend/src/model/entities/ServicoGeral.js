class ServicoGeral {
  constructor() {
    this._id = null;
    this._nome = null;
    this._descricao = null;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get nome() {
    return this._nome;
  }

  set nome(value) {
    this._nome = value;
  }

  get descricao() {
    return this._descricao;
  }

  set descricao(value) {
    this._descricao = value;
  }
}

export default ServicoGeral;
