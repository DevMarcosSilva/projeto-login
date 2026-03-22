import { useState } from "react";
import axios from "axios"
import "./styles/Cadastro.css";
import { Link } from "react-router-dom";

export default function Cadastro(){
    const [nome, setNome] = useState('')
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const [mensagem,setMensagem]= useState('')

    async function handleCadastro(e) {
        e.preventDefault()
        try{
            console.log('passei auqi')
            const resposta = await axios.post('http://localhost:5001/api/auth/cadastro',{
                nome,
                email,
                senha
            })
            setMensagem(resposta.data.mensagem)
        
        } catch (erro){
            setMensagem(erro.response.data.mensagem)
        }
    }
    return (
  <div className="cadastro-page">
    <div className="cadastro-card">
      <div className="cadastro-header">
        <h2>Cadastro</h2>
        <p>Preencha seus dados para criar sua conta</p>
      </div>

      <form onSubmit={handleCadastro} className="cadastro-form">
        <div className="input-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-cadastrar">
          Cadastrar
        </button>
      </form>

      {mensagem && (
        <div className="mensagem-feedback">
          {mensagem}
        </div>
      )}
      <p className="link-cadastro">
                voltar para <Link to="/login">Login</Link>
            </p>
    </div>
  </div>
);
}