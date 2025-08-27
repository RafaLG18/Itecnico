# ITécnico Frontend

Frontend do sistema ITécnico desenvolvido em React - Uma plataforma moderna para conectar prestadores de serviços técnicos com clientes.

## 🚀 Tecnologias

- **React** 19.1.0 - Biblioteca JavaScript para interfaces
- **React Router DOM** 7.7.0 - Roteamento SPA
- **Tailwind CSS** 3.4.17 - Framework CSS utility-first
- **React Scripts** 5.0.1 - Toolchain para desenvolvimento
- **PostCSS** + **Autoprefixer** - Processamento CSS

## 📁 Estrutura do Projeto

```
src/
├── pages/                 # Páginas da aplicação
│   ├── Home.jsx          # Página inicial
│   ├── Login.jsx         # Tela de login
│   ├── TelaCadastro.jsx  # Seleção de tipo de cadastro
│   ├── CadastroCliente.jsx
│   ├── CadastroPrestador.jsx
│   ├── TelaHomeCliente.jsx    # Dashboard do cliente
│   ├── TelaHomePrestador.jsx  # Dashboard do prestador
│   ├── SolicitaServicos.jsx   # Solicitação de serviços
│   ├── CadastrarServico.jsx   # Cadastro de serviços
│   ├── EditarServico.jsx      # Edição de serviços
│   ├── MeusServicos.jsx       # Lista de serviços do prestador
│   └── MeusPedidos.jsx        # Lista de pedidos do cliente
├── App.js                # Componente principal com rotas
├── App.css              # Estilos globais
└── index.js             # Ponto de entrada da aplicação
```

## 🎨 Design System

### Paleta de Cores
- **Primary**: Gradientes roxo/azul (#8b5cf6, #3b82f6)
- **Background**: Tons escuros (#1a1a2e, #16213e)
- **Text**: Branco e tons de cinza
- **Accent**: Verde para sucesso, vermelho para erros

### Componentes Principais
- **Cards responsivos** com hover effects
- **Modais interativos** para ações detalhadas
- **Dashboards** com estatísticas em tempo real
- **Formulários** com validação visual
- **Loading states** e feedback visual

## 🌐 Rotas da Aplicação

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Home | Página inicial |
| `/login` | Login | Autenticação |
| `/cadastro` | TelaCadastro | Seleção de tipo |
| `/cadastroCliente` | CadastroCliente | Cadastro cliente |
| `/cadastroPrestador` | CadastroPrestador | Cadastro prestador |
| `/homeCliente` | TelaHomeCliente | Dashboard cliente |
| `/homePrestador` | TelaHomePrestador | Dashboard prestador |
| `/solicitaServicos` | SolicitaServicos | Solicitação de serviços |
| `/cadastroServico` | CadastrarServico | Cadastro de serviços |
| `/meus-servicos` | MeusServicos | Serviços do prestador |
| `/editar-servico/:id` | EditarServico | Edição de serviço |
| `/meus-pedidos` | MeusPedidos | Pedidos do cliente |

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm start
```
Inicia a aplicação em modo de desenvolvimento em `http://localhost:3000`

### Build de Produção
```bash
npm run build
```
Cria uma versão otimizada para produção na pasta `build/`

### Testes
```bash
npm test
```
Executa os testes em modo interativo

### Análise do Bundle
```bash
npm run build
npx serve -s build
```

## 📱 Funcionalidades

### Para Clientes
- ✅ Cadastro e login
- ✅ Dashboard com estatísticas
- ✅ Exploração de serviços
- ✅ Solicitação de serviços via modal
- ✅ Visualização de pedidos
- ✅ Cancelamento de pedidos

### Para Prestadores
- ✅ Cadastro e login
- ✅ Dashboard com métricas
- ✅ Cadastro de serviços
- ✅ Edição de serviços
- ✅ Gerenciamento de pedidos
- ✅ Controle de status

## 🔧 Configuração

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação
```bash
# Clone o repositório (se necessário)
cd frontend/

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Variáveis de Ambiente
Crie um arquivo `.env` no diretório raiz do frontend:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

## 🎯 Integração com Backend

O frontend consome a API REST do backend através das seguintes integrações:

- **Autenticação**: `POST /api/login`
- **Usuários**: `POST /api/cadastro-usuario`
- **Serviços**: `GET/POST/PUT /api/cadastro-servico-prestado`
- **Pedidos**: `GET/POST/DELETE /api/cadastro-pedido`

## 📚 Padrões de Desenvolvimento

### Estado Local
Utiliza `useState` e `useEffect` para gerenciamento de estado das páginas

### Navegação
React Router DOM com navegação programática via `useNavigate`

### Requisições HTTP
`fetch` API nativa para comunicação com o backend

### Estilos
Tailwind CSS com classes utilitárias e componentes customizados

## 🔄 Estados da Aplicação

### Estados de Carregamento
- Loading spinners durante requisições
- Estados vazios para listas
- Feedback visual para ações do usuário

### Tratamento de Erros
- Mensagens de erro contextualizadas
- Validação de formulários
- Fallbacks para falhas de rede

## 🚀 Deployment

### Build
```bash
npm run build
```

### Servir Estático
```bash
# Com serve
npx serve -s build

# Com nginx (exemplo)
server {
    location / {
        root /path/to/build;
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔍 Troubleshooting

### Problemas Comuns

**Erro de CORS**
- Verifique se o backend está rodando
- Confirme a configuração de CORS no servidor

**Falha no Build**
- Limpe o cache: `npm start -- --reset-cache`
- Reinstale dependências: `rm -rf node_modules && npm install`

**Rotas não funcionam**
- Verifique se todas as rotas estão definidas no App.js
- Confirme que o React Router está configurado corretamente

## 📄 Licença

ISC - Projeto acadêmico