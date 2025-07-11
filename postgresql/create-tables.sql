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
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    -- "preco" INTEGER NOT NULL -- Considerar DECIMAL ou NUMERIC para valores monetários
);
ALTER TABLE "servico_geral" ADD PRIMARY KEY("id");

CREATE TABLE "servico_prestado"(
    "id" SERIAL NOT NULL,
    "id_prestador" INTEGER NOT NULL, -- ID do usuário que oferece o serviço
    "id_servico_geral" INTEGER NOT NULL, -- ID do servico geral
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "preco" INTEGER NOT NULL -- Considerar DECIMAL ou NUMERIC para valores monetários
);
ALTER TABLE "servico_prestado" ADD PRIMARY KEY("id");
ALTER TABLE "servico_prestado" ADD CONSTRAINT "fk_servico_usuario" FOREIGN KEY("id_prestador") REFERENCES "usuario"("id");
ALTER TABLE "servico_prestado" ADD CONSTRAINT "fk_servico_geral" FOREIGN KEY("id_servico_geral") REFERENCES "servico_geral"("id");

CREATE TABLE "pedido"(
    "id" SERIAL NOT NULL,
    "id_usuario_cliente" INTEGER NOT NULL,
    "id_usuario_prestador" INTEGER NOT NULL,
    "id_servico_prestado" INTEGER NOT NULL,
    "data" VARCHAR(255) NOT NULL, -- Renomeado para evitar conflito com palavra reservada, e removida vírgula final
    "preco" INTEGER NOT NULL -- Considerar DECIMAL ou NUMERIC para valores monetários
);
ALTER TABLE "pedido" ADD PRIMARY KEY("id"); -- Correção: Definindo PK para a tabela 'pedido'
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_cliente" FOREIGN KEY("id_usuario_cliente") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_prestador" FOREIGN KEY("id_usuario_prestador") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_servico_prestado" FOREIGN KEY("id_servico_prestado") REFERENCES "servico_prestado"("id");
