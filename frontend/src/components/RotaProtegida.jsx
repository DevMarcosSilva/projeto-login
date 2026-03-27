import { Navigate } from 'react-router-dom'

function RotaProtegida({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default RotaProtegida
