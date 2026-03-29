import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Rotaprotegida from './components/RotaProtegida'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <Rotaprotegida>
            <Dashboard/>
            </Rotaprotegida>
            }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App