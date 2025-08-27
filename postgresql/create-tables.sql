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
    "descricao" VARCHAR(255) NOT NULL
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
    "preco" INTEGER NOT NULL, -- Considerar DECIMAL ou NUMERIC para valores monetários
    "status" VARCHAR(50) NOT NULL DEFAULT 'Pendente' -- Status do pedido: Pendente, Aceito, Recusado, Concluído
);
ALTER TABLE "pedido" ADD PRIMARY KEY("id"); -- Correção: Definindo PK para a tabela 'pedido'
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_cliente" FOREIGN KEY("id_usuario_cliente") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_usuario_prestador" FOREIGN KEY("id_usuario_prestador") REFERENCES "usuario"("id");
ALTER TABLE "pedido" ADD CONSTRAINT "fk_pedido_servico_prestado" FOREIGN KEY("id_servico_prestado") REFERENCES "servico_prestado"("id");

-- Populando tabela servico_geral com categorias padrão
INSERT INTO "servico_geral" ("nome", "descricao") VALUES
('Conserto de Computador', 'Reparo e manutenção de computadores desktop e notebook'),
('Instalação de Software', 'Instalação e configuração de programas e sistemas operacionais'),
('Manutenção de Rede', 'Configuração e reparo de redes domésticas e empresariais'),
('Reparo de Celular', 'Conserto de smartphones e tablets'),
('Formatação de PC', 'Formatação e reinstalação de sistema operacional'),
('Recuperação de Dados', 'Recuperação de arquivos perdidos ou corrompidos'),
('Instalação de Antivírus', 'Instalação e configuração de softwares de segurança'),
('Configuração de Email', 'Configuração de contas de email em dispositivos'),
('Backup de Dados', 'Criação e configuração de sistemas de backup'),
('Suporte Técnico Remoto', 'Assistência técnica através de acesso remoto'),
('Montagem de PC', 'Montagem e configuração de computadores personalizados'),
('Upgrade de Hardware', 'Atualização de componentes de hardware'),
('Instalação de Impressora', 'Configuração e instalação de impressoras'),
('Configuração de Wi-Fi', 'Instalação e configuração de redes sem fio'),
('Limpeza de PC', 'Limpeza física e otimização de desempenho');
