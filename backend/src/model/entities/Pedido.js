class Pedido {
  constructor() {
    this._id = null;
    this._id_servico_prestado = null;
    this._id_usuario_cliente = null;
    this._id_usuario_fornecedor = null;
    this._data = null;
    this._preco = null;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get id_servico_prestado() {
    return this._id_servico_prestado;
  }
  set id_servico_prestado(value) {
    this._id_servico_prestado = value;
  }
  get id_usuario_cliente() {
    return this._id_usuario_cliente;
  }
  set id_usuario_cliente(value) {
    this._id_usuario_cliente = value;
  }
  get id_usuario_fornecedor() {
    return this._id_usuario_fornecedor;
  }
  set id_usuario_fornecedor(value) {
    this._id_usuario_fornecedor = value;
  }
  get data() {
    return this._data;
  }
  set data(value) {
    this._data = value;
  }
  get preco() {
    return this._preco;
  }
  set preco(value) {
    this._preco = value;
  }
}

export default Pedido;
