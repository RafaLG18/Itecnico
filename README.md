# ITécnico - Sistema de Serviços Técnicos

Sistema web completo desenvolvido em React + Node.js para conectar prestadores de serviços técnicos com clientes que necessitam desses serviços. Plataforma full-stack com funcionalidades avançadas de gerenciamento de serviços e pedidos.

## 📋 Sobre o Projeto

O ITécnico é uma plataforma que facilita a conexão entre:
- **Clientes**: Pessoas que precisam de serviços técnicos
- **Prestadores**: Profissionais que oferecem serviços técnicos

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 19.1.0 - Biblioteca principal
- **React Router DOM** 7.7.0 - Roteamento SPA
- **Tailwind CSS** 3.4.17 - Framework CSS moderno com design responsivo
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade entre navegadores
- **React Scripts** 5.0.1 - Build tools

### Backend
- **Node.js** com **Express** 4.21.2
- **PostgreSQL** - Banco de dados relacional
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **pg** 8.16.0 - Driver PostgreSQL para Node.js
- **ES6 Modules** - Sintaxe moderna de módulos

### Banco de Dados
- **PostgreSQL** 13+ (containerizado com Docker)
- Docker Compose para orquestração e configuração

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

### 🔵 Para Clientes
- ✅ **Cadastro e autenticação** de usuário
- ✅ **Login seguro** no sistema
- ✅ **Exploração de serviços** disponíveis com busca e filtros
- ✅ **Solicitação de serviços** com modal interativo
- ✅ **Dashboard pessoal** com estatísticas em tempo real
- ✅ **Meus Pedidos** - Visualização completa de solicitações
- ✅ **Cancelamento de pedidos** com confirmação de segurança
- ✅ **Interface responsiva** com design moderno

### 🟢 Para Prestadores
- ✅ **Cadastro e autenticação** de usuário
- ✅ **Login seguro** no sistema
- ✅ **Cadastro de serviços** oferecidos
- ✅ **Gerenciamento completo** - Visualização, edição e controle de status
- ✅ **Dashboard avançado** com estatísticas e métricas
- ✅ **Pedidos recebidos** - Visualização e gerenciamento de solicitações
- ✅ **Ações sobre pedidos** - Aceitar, recusar e visualizar detalhes
- ✅ **Interface intuitiva** com modals informativos

### 🎨 Recursos de Interface
- ✅ **Design responsivo** - Funciona em desktop, tablet e mobile
- ✅ **Tema escuro moderno** com gradientes e efeitos visuais
- ✅ **Animações suaves** com hover effects e transições
- ✅ **Modais interativos** para ações detalhadas
- ✅ **Feedback visual** com loading states e confirmações
- ✅ **Navegação intuitiva** entre páginas

## 📡 API Endpoints

### 🔐 Autenticação
- `POST /api/login` - Login de usuários com validação

### 👥 Usuários
- `POST /api/cadastro-usuario` - Cadastro de novos usuários

### 🏷️ Serviços Gerais (Categorias)
- `GET /api/cadastro-servico-geral` - Listar categorias de serviços
- `POST /api/cadastro-servico-geral` - Criar nova categoria

### 🛠️ Serviços Prestados
- `GET /api/cadastro-servico-prestado` - Listar todos os serviços disponíveis
- `GET /api/cadastro-servico-prestado/:id` - Buscar serviço específico por ID
- `POST /api/cadastro-servico-prestado` - Cadastrar novo serviço
- `PUT /api/cadastro-servico-prestado/:id` - Atualizar serviço existente

### 📋 Pedidos
- `POST /api/cadastro-pedido` - Criar nova solicitação de serviço
- `GET /api/cadastro-pedido/cliente/:id_cliente` - ✨ **Buscar pedidos do cliente**
- `GET /api/cadastro-pedido/prestador/:id_prestador` - ✨ **Buscar pedidos do prestador**
- `DELETE /api/cadastro-pedido/:id` - ✨ **Cancelar pedido** (cliente)

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
- `/homeCliente` - Dashboard do cliente com estatísticas em tempo real
- `/homePrestador` - Dashboard do prestador com pedidos recebidos
- `/solicitaServicos` - **Solicitação de serviços pelos clientes** ✨
- `/cadastroServico` - Cadastro de serviços pelo prestador
- `/meus-servicos` - **Lista de serviços do prestador** ✨
- `/editar-servico/:id` - **Edição de serviços existentes** ✨
- `/meus-pedidos` - **Lista de pedidos do cliente** ✨

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
- `cd backend/` - Navegar para diretório do backend
- `npm install` - Instalar dependências
- `node src/main.js` - Inicia o servidor em http://localhost:3001

### Frontend
- `cd frontend/` - Navegar para diretório do frontend
- `npm install` - Instalar dependências
- `npm start` - Inicia em modo desenvolvimento em http://localhost:3000
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
