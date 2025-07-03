class ServicoPrestado {
  constructor() {
    this._id = null;
    this._id_servico_geral = null;
    this._id_prestador = null;
    this._nome = null;
    this._descricao = null;
    this._preco = null;
  }

  set id(value) {
    this._id = value;
  }
  get id() {
    return this._id;
  }

  set id_servico_geral(value) {
    this._id_servico_geral = value;
  }
  get id_servico_geral() {
    return this._id_servico_geral;
  }

  set id_prestador(value) {
    this._id_prestador = value;
  }
  get id_prestador() {
    return this._id_prestador;
  }
  set nome(value) {
    this._nome = value;
  }
  get nome() {
    return this._nome;
  }

  set descricao(value) {
    this._descricao = value;
  }
  get descricao() {
    return this._descricao;
  }

  set preco(value) {
    this._preco = value;
  }
  get preco() {
    return this._preco;
  }
}
