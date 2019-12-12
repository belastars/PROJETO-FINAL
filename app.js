const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const clientes = require('./routes/clientes')
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/clientes', clientes)

app.get('/', (request, response) => {
  response.send('Olá, Cliente')
})

app.listen(PORT)
console.info(`Rodando na porta ${PORT}`)
