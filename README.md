# ITécnico - Sistema de Serviços Técnicos

Sistema web desenvolvido em React + Node.js para conectar prestadores de serviços técnicos com clientes que necessitam desses serviços.

## 📋 Sobre o Projeto

O ITécnico é uma plataforma que facilita a conexão entre:
- **Clientes**: Pessoas que precisam de serviços técnicos
- **Prestadores**: Profissionais que oferecem serviços técnicos

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 19.1.0
- **React Router DOM** 7.7.0 - Roteamento
- **Bootstrap** 5.3.7 - Framework CSS
- **React Scripts** 5.0.1 - Build tools

### Backend
- **Node.js** com **Express** 4.21.2
- **PostgreSQL** - Banco de dados
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **pg** 8.16.0 - Driver PostgreSQL

### Banco de Dados
- **PostgreSQL** (containerizado com Docker)
- Docker Compose para orquestração

## 📁 Estrutura do Projeto

```
Itecnico/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Controladores da API
│   │   ├── model/
│   │   │   ├── entities/         # Entidades do domínio
│   │   │   └── repositories/     # Repositórios de dados
│   │   ├── routes/               # Rotas da API
│   │   ├── App.js               # Configuração do Express
│   │   └── main.js              # Ponto de entrada
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── App.js               # Componente principal
│   │   └── index.js             # Ponto de entrada
│   └── package.json
└── postgresql/
    ├── create-tables.sql        # Script de criação das tabelas
    ├── docker-compose.yaml      # Configuração do Docker
    └── Dockerfile
```

## 🗄️ Modelo de Dados

### Entidades Principais

#### Usuario
- `id` (SERIAL PRIMARY KEY)
- `nome` (VARCHAR)
- `cpf` (VARCHAR UNIQUE)
- `senha` (VARCHAR)
- `tipo` (VARCHAR) - 'cliente' ou 'prestador'

#### ServicoGeral
- `id` (SERIAL PRIMARY KEY)
- `nome` (VARCHAR)
- `descricao` (VARCHAR)

#### ServicoPrestado
- `id` (SERIAL PRIMARY KEY)
- `id_prestador` (FK → usuario.id)
- `id_servico_geral` (FK → servico_geral.id)
- `nome` (VARCHAR)
- `descricao` (VARCHAR)
- `preco` (INTEGER)

#### Pedido
- `id` (SERIAL PRIMARY KEY)
- `id_usuario_cliente` (FK → usuario.id)
- `id_usuario_prestador` (FK → usuario.id)
- `id_servico_prestado` (FK → servico_prestado.id)
- `data` (VARCHAR)
- `preco` (INTEGER)

## 🛠️ Funcionalidades

### Para Clientes
- Cadastro de usuário
- Login no sistema
- Busca de serviços disponíveis
- Solicitação de serviços

### Para Prestadores
- Cadastro de usuário
- Login no sistema
- Cadastro de serviços oferecidos
- Visualização dos próprios serviços
- **Edição de serviços existentes** ✨
- Ativação/desativação de serviços
- Gerenciamento de pedidos

## 📡 API Endpoints

### Autenticação
- `POST /api/login` - Login de usuários

### Usuários
- `POST /api/cadastro-usuario` - Cadastro de usuários

### Serviços Gerais
- `GET /api/cadastro-servico-geral` - Listar categorias de serviços
- `POST /api/cadastro-servico-geral` - Criar nova categoria

### Serviços Prestados
- `GET /api/cadastro-servico-prestado` - Listar todos os serviços
- `GET /api/cadastro-servico-prestado/:id` - **Buscar serviço por ID** ✨
- `POST /api/cadastro-servico-prestado` - Cadastrar novo serviço
- `PUT /api/cadastro-servico-prestado/:id` - **Atualizar serviço existente** ✨

### Pedidos
- `GET/POST /api/cadastro-pedido` - Gerenciamento de pedidos

## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js
- npm
- Docker e Docker Compose

### 1. Configurar o Banco de Dados

```bash
cd postgresql/
docker-compose up -d
```

### 2. Configurar o Backend

```bash
cd backend/
npm install
node src/main.js
```

O backend estará rodando em `http://localhost:3001`

### 3. Configurar o Frontend

```bash
cd frontend/
npm install
npm start
```

O frontend estará rodando em `http://localhost:3000`

## 🔧 Configuração do Banco

### Credenciais PostgreSQL
- **Host**: localhost
- **Porta**: 5432
- **Database**: itecnico
- **Usuário**: itecnico
- **Senha**: itecnico123

### Inicialização
As tabelas são criadas automaticamente através do script `create-tables.sql` durante a inicialização do container.

## 🚦 Rotas da Aplicação

### Frontend Routes
- `/` - Página inicial
- `/login` - Tela de login
- `/cadastro` - Seleção de tipo de cadastro
- `/cadastroCliente` - Cadastro de cliente
- `/cadastroPrestador` - Cadastro de prestador
- `/homeCliente` - Dashboard do cliente
- `/homePrestador` - Dashboard do prestador
- `/cadastroCliente/solicitaServico` - Solicitação de serviços
- `/cadastroPrestador/cadastroServico` - Cadastro de serviços
- `/meus-servicos` - **Lista de serviços do prestador** ✨
- `/editar-servico/:id` - **Edição de serviços existentes** ✨

## 🏗️ Arquitetura

### Backend (MVC Pattern)
- **Models**: Entidades e repositórios
- **Views**: Responses JSON
- **Controllers**: Lógica de negócio

### Frontend (Component-Based)
- **Pages**: Componentes de página
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState)

## 📝 Scripts Disponíveis

### Backend
- `node src/main.js` - Inicia o servidor

### Frontend
- `npm start` - Inicia em modo desenvolvimento
- `npm run build` - Build para produção
- `npm test` - Executa testes
- `npm run eject` - Ejeta configurações

## 🔒 Considerações de Segurança

- Senhas armazenadas em texto plano (⚠️ não recomendado para produção)
- CORS habilitado para desenvolvimento
- Validações básicas de entrada

## ⚠️ Pontos de Melhoria

1. **Segurança**:
   - Hash de senhas (bcrypt)
   - JWT para autenticação
   - Validação de entrada mais robusta

2. **Banco de Dados**:
   - Uso de DECIMAL para valores monetários
   - Índices para otimização
   - Migrations estruturadas

3. **Frontend**:
   - Context API para gerenciamento de estado
   - Componentes reutilizáveis
   - Tratamento de erros

4. **Geral**:
   - Testes automatizados
   - CI/CD
   - Documentação da API (Swagger)

## 👥 Desenvolvimento

Este projeto foi desenvolvido como parte de um projeto acadêmico de Desenvolvimento Web.

## 📄 Licença

ISC
