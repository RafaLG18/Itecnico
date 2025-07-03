CREATE TABLE "usuario"(
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL UNIQUE, -- Adicionado UNIQUE para CPF
    "senha" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(255) NOT NULL
);
ALTER TABLE "usuario" ADD PRIMARY KEY("id");

CREATE TABLE "servico_geral"(
    "id" SERIAL NOT NULL,
    "id_prestador" INTEGER NOT NULL, -- ID do usuário que oferece o serviço
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "preco" INTEGER NOT NULL -- Considerar DECIMAL ou NUMERIC para valores monetários
);
ALTER TABLE "servico" ADD PRIMARY KEY("id");
-- Correção aqui: A chave estrangeira deve referenciar a coluna id_usuario na tabela servico
ALTER TABLE "servico" ADD CONSTRAINT "fk_servico_usuario" FOREIGN KEY("id_prestador") REFERENCES "usuario"("id");

CREATE TABLE "servico_geral_prestado"(
    "id" SERIAL NOT NULL,
    "id_prestador" INTEGER NOT NULL, -- ID do usuário que oferece o serviço
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "preco" INTEGER NOT NULL -- Considerar DECIMAL ou NUMERIC para valores monetários
);
ALTER TABLE "servico" ADD PRIMARY KEY("id");
-- Correção aqui: A chave estrangeira deve referenciar a coluna id_usuario na tabela servico
ALTER TABLE "servico" ADD CONSTRAINT "fk_servico_usuario" FOREIGN KEY("id_prestador") REFERENCES "usuario"("id");

CREATE TABLE "pedido"(
    "id" SERIAL NOT NULL,
    "id_usuario_cliente" INTEGER NOT NULL,
    "id_usuario_servidor" INTEGER NOT NULL,
    "id_servico" INTEGER NOT NULL,
    "data" VARCHAR(255) NOT NULL -- Renomeado para evitar conflito com palavra reservada, e removida vírgula final
    -- Considerar usar tipo DATE ou TIMESTAMP para a coluna 'data'
);
ALTER TABLE "pedido" ADD PRIMARY KEY("id"); -- Correção: Definindo PK para a tabela 'pedido'
-- Correções nas chaves estrangeiras para a tabela 'pedido'
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_cliente" FOREIGN KEY("id_usuario_cliente") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_servidor" FOREIGN KEY("id_usuario_servidor") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_servico" FOREIGN KEY("id_servico") REFERENCES "servico"("id");