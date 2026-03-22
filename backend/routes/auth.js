const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const router = express.Router()

// Rota de cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body
        const usuarioExiste = await Usuario.findOne({ email })
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado!' })
            }
            
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada
        })

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' })

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor', erro })
    }
})

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body

        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos' })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha incorretos' })
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token, nome: usuario.nome })

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro no servidor', erro })
    }
})

module.exports = router