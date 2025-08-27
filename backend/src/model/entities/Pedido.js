class Pedido {
  constructor() {
    this._id = null;
    this._id_servico_prestado = null;
    this._id_usuario_cliente = null;
    this._id_usuario_prestador = null;
    this._data = null;
    this._preco = null;
    this._status = 'Pendente';
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
  get id_usuario_prestador() {
    return this._id_usuario_prestador;
  }
  set id_usuario_prestador(value) {
    this._id_usuario_prestador = value;
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
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }
}

export default Pedido;
