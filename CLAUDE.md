# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend
```bash
cd backend
node server.js          # start server (no dev script configured)
```

### Frontend
```bash
cd frontend
npm start               # dev server on port 3000
npm run build           # production build
npm test                # run tests
```

## Environment Variables

Both services require `.env` files that are git-ignored.

**`backend/.env`**
```
PORT=5001
MONGO_URI=<mongodb connection string>
JWT_SECRET=<secret>
```

**`frontend/.env`**
```
REACT_APP_API_URL=http://localhost:5001
```

## Architecture

Full-stack login/dashboard app split into two independent services:

- **Backend** (`/backend`): Express 5 + MongoDB/Mongoose. One route file (`routes/auth.js`) with two endpoints — `POST /api/auth/cadastro` and `POST /api/auth/login`. JWT issued on login, signed with `JWT_SECRET`, 1-day expiry. Passwords hashed with bcrypt (10 rounds).
- **Frontend** (`/frontend`): React 19 + React Router 7 + Axios. Three pages: Login, Cadastro, Dashboard. The `/dashboard` route is guarded by `RotaProtegida` (checks for `token` in localStorage). Token and `nome` are stored in localStorage on login and cleared on logout.

## Known Issues

- `Cadastro.jsx` hardcodes `http://localhost:5001` instead of using `process.env.REACT_APP_API_URL` — inconsistent with `Login.jsx`.
- Route protection is client-side only (localStorage check); backend has no middleware to validate JWT on protected resources.
- CORS, rate limiting, and input validation are not configured on the backend.
