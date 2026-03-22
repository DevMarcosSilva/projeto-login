import { useNavigate } from "react-router-dom"
import './styles/Dashboard.css';

export default function Dashboard(){
        const navigate = useNavigate()
        const nome = localStorage.getItem('nome')

        function handleLogout(){
            localStorage.removeItem('token')
            localStorage.removeItem('nome')
            navigate('/login')
        }

    return(
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="header-logo">
                    <span>🏠</span>
                    <h1>MyApp</h1>
                </div>
                <div className="header-usuario">
                    <span>👤 {nome}</span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </header>
            <main className="dashboard-conteudo">
                <div className="boas-vindas">
                    <h2>Olá, {nome}! 👋</h2>
                    <p>Você está logado com sucesso!</p>
                </div>
                <div className="cards-grid">
                    <div className="card">
                        <span>📊</span>
                        <h3>Relatórios</h3>
                        <p>Visualize seus relatórios</p>
                    </div>
                    <div className="card">
                        <span>⚙️</span>
                        <h3>Configurações</h3>
                        <p>Gerencie sua conta</p>
                    </div>
                    <div className="card">
                        <span>📁</span>
                        <h3>Arquivos</h3>
                        <p>Acesse seus arquivos</p>
                    </div>
                </div>
            </main>
        </div>
    )
}