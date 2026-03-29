# Projeto Login

Aplicação full-stack de autenticação com cadastro, login e dashboard protegido. Desenvolvida por **Marcos Silva** como projeto de estudo.

---

## Funcionalidades

- **Cadastro de usuário** — formulário com nome, e-mail e senha. A senha é armazenada com hash bcrypt (10 rounds).
- **Login** — autenticação via e-mail e senha. Retorna um token JWT com validade de 1 dia.
- **Dashboard protegido** — rota acessível somente com token válido. Redireciona para `/login` caso o usuário não esteja autenticado.
- **Logout** — remove o token e o nome do usuário do `localStorage` e redireciona para o login.

---

## Tecnologias

### Backend
| Tecnologia | Uso |
|---|---|
| Node.js + Express 5 | Servidor HTTP e roteamento |
| MongoDB + Mongoose | Banco de dados e ODM |
| bcrypt | Hash de senhas |
| jsonwebtoken | Geração e validação de tokens JWT |
| dotenv | Variáveis de ambiente |

### Frontend
| Tecnologia | Uso |
|---|---|
| React 19 | Interface |
| React Router 7 | Roteamento client-side |
| Axios | Requisições HTTP |
| Vite | Bundler e dev server |

### Infraestrutura
| Tecnologia | Uso |
|---|---|
| Turborepo | Orquestração do monorepo |
| Docker Compose | MongoDB local |

---

## Estrutura do projeto

```
projeto-login/
├── backend/               # API REST (Node.js)
│   ├── models/
│   │   └── usuario.js     # Schema do usuário (nome, email, senha)
│   ├── routes/
│   │   └── auth.js        # POST /api/auth/cadastro e /api/auth/login
│   ├── database.js        # Conexão com o MongoDB
│   └── server.js          # Entry point do servidor
├── frontend/              # SPA (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── RotaProtegida.jsx  # Guard de rota autenticada
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Cadastro.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx        # Definição de rotas
│   └── vite.config.js
├── docker-compose.yml     # MongoDB
└── turbo.json             # Pipeline do monorepo
```

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org) v18+
- [Docker](https://www.docker.com) (para o MongoDB)

### 1. Clone o repositório

```bash
git clone https://github.com/DevMarcosSilva/projeto-login.git
cd projeto-login
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `backend/.env`:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/projeto-login
JWT_SECRET=sua_chave_secreta_aqui
```

Crie o arquivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001
```

### 4. Suba o banco de dados

```bash
docker compose up -d
```

### 5. Inicie a aplicação

```bash
npm run dev
```

Isso inicia o backend e o frontend em paralelo via Turborepo:

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5001 |

---

## API

### `POST /api/auth/cadastro`

Cria um novo usuário.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minhasenha"
}
```

**Resposta (201):**
```json
{ "mensagem": "Usuário cadastrado com sucesso!" }
```

---

### `POST /api/auth/login`

Autentica um usuário e retorna um token JWT.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "minhasenha"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "nome": "João Silva"
}
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia backend e frontend em modo desenvolvimento |
| `npm run build` | Gera o build de produção do frontend |
| `npm test` | Executa os testes de todos os pacotes |
| `docker compose up -d` | Sobe o MongoDB em background |
| `docker compose down` | Para o MongoDB |
| `docker compose down -v` | Para o MongoDB e apaga os dados |
