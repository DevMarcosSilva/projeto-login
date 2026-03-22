//\\const { default: mongoose } = require('mongoose')
const mongoose = require('mongoose')

const conectarBanco = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Banco de dados conectado com sucesso!')
    }catch (erro){
        console.log('ERRO AO CONECATAR AO BANCO!!',erro);
    }
}

module.exports = conectarBanco