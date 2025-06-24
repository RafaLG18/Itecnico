class Servico {
    constructor() {
        this._id = null;
        this._id_usuario=null;
        this._nome = null;
        this._descricao = null;
        this._preco = null;
    }

    get id() {
        return this._id;
    }
 
    set id(value) {
        this._id = value;
    }
    get id_usuario() {
        return this._id_usuario;
    }
 
    set id_usuario(value) {
        this._id_usuario = value;
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

    get preco() {
        return this._preco;
    }

    set preco(value) {
        this._preco = value;
    }
}

export default Servico