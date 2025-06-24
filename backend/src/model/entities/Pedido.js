class Pedido{
    constructor(){
        this._id=null;
        this._id_servico=null;
        this._id_usuario_cliente=null;
        this._id_usuario_servidor=null;
        this._data=null
    }

    get id(){
        return this._id
    }
    set id(value){
        this._id=value;
    }
    get id_servico(){
        return this._id_servico
    }
    set id_servico(value){
        this._id_servico=value
    }
    get id_usuario_cliente(){
        return this._id_usuario_cliente
    }
    set id_usuario_cliente(value){
        this._id_usuario_cliente=value
    }
    get id_usuario_servidor(){
        return this._id_usuario_servidor
    }
    set id_usuario_servidor(value){
        this._id_usuario_servidor=value
    }
    get data(){
        return this._data
    }
    set data(value){
        this._data=value
    }
}