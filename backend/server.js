require('dotenv').config()
const express = require('express')// — é o framework que transforma o Node em um servidor web. Sem ele teríamos que escrever muito mais código para criar rotas e receber requisições.
const cors  = require('cors')// permite que o React (rodando em localhost:3000) converse com o Node (rodando em localhost:3001). Sem ele o navegador bloquearia a comunicação.
const conectarBanco = require('./database')
const authRoutes = require('./routes/auth')

const app = express()

app.use(cors())
app.use((express.json()))

conectarBanco()

app.use('/api/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send('Servidor funcionando, AI PAPAI!')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta!\n http://localhost:${process.env.PORT}`)
})