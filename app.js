require('dotenv-extended').load()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const clientes = require('./src/routes/clientes')
const PORT = process.env.PORT || 3000
const controllers = require("./src/controllers/ClientesController")


app.use(cors())
app.use(bodyParser.json())
app.use('/clientes', clientes)

app.get('/', (request, response) => {
  response.send('Olá, Cliente')
})


app.listen(PORT)
console.info(`Rodando na porta ${PORT}`)

