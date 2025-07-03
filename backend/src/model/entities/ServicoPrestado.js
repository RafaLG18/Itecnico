class ServicoPrestado{

    constructor(){
        this._id = null;
        this._id_servico_geral = null;
        this._nome=null;
        this._descricao=null;
        this._preco=null;
    }

    set nome(value){
        this._nome=value;
    }
    get nome(){
        return this._nome;
    }

    set descricao(value){
        this._descricao=value;
    }
    get descricao(){
        return this._descricao;
    }

    set preco(value){
        this._preco=value;
    }
    get preco(){
        return this._preco
    }
}