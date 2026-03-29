import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./styles/Login.css";


export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem,setMensagem] = useState('')
    const navigate = useNavigate()


    async function handleLogin(e){
        e.preventDefault()
        try{
            const resposta = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                senha
            })
            localStorage.setItem('token',resposta.data.token)
            localStorage.setItem('nome',resposta.data.nome)
            navigate('/dashboard')
        }catch (erro){
            setMensagem('E-mail ou senha inválidos!')
        }
    }
    return(
        <div className="login-page">
        <div className="login-card">
            <div className="login-header">
                <div className="login-icon">🔐</div>
                <h2>Compras auto</h2>
                <p>Faça login para continuar</p>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                </div>
                <button className="btn-entrar" type="submit">
                    Entrar
                </button>
                {mensagem && <p className="mensagem-erro">{mensagem}</p>}
            </form>
            <p className="link-cadastro">
                Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
            <p className="link-cadastro">
                Desenvolvido por <strong>marcos silva</strong> © 2026
            </p>
        </div>
    </div>
    )
}