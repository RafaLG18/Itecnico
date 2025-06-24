CREATE TABLE "usuario"(
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "usuario" ADD PRIMARY KEY("id");
CREATE TABLE "servico"(
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "preco" INTEGER NOT NULL
);
ALTER TABLE
    "servico" ADD PRIMARY KEY("id");
ALTER TABLE
    "servico" ADD CONSTRAINT "id_usuario" FOREIGN KEY("id") REFERENCES "usuario"("id");
CREATE TABLE "pedido"(
    "id" SERIAL NOT NULL,
    "id_usuario_cliente" INTEGER NOT NULL,
    "id_usuario_servidor" INTEGER NOT NULL,
    "id_servico" INTEGER NOT NULL,
    "data" VARCHAR(255) NOT NULL,
);
ALTER TABLE
    "servico" ADD PRIMARY KEY("id");
ALTER TABLE
    "servico" ADD CONSTRAINT "id_usuario_cliente" FOREIGN KEY("id") REFERENCES "usuario"("id");
ALTER TABLE
    "servico" ADD CONSTRAINT "id_usuario_servidor" FOREIGN KEY("id") REFERENCES "usuario"("id");
ALTER TABLE
    "servico" ADD CONSTRAINT "id_servico" FOREIGN KEY("id") REFERENCES "servico"("id");        