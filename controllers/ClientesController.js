const { connect } = require('../models/Repository')
const clientesModel = require('../models/ClientesSchema')
const { tratamentosModel } = require('../models/TratamentosSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SEGREDO = 'MIICXAIBAAKBgQCOl54HaBM/WiL/jPPdFGjm9f8VprUst1J+vs7G/YRGRHYLGqt+M/ljAhcROPy3FdaVi2smqqyZhf4d+EZ9lKM6LVed91sxvcyMFEp6x8R2KS9wIzUtJ6r1MAIKd8HURmbaN4V2TV/FLeOUANRCZ+QhYEy+eNbuVIJANYtXBUSn8QIDAQABAoGBAIuVS/MAJGdNuxjiSA5Q3mfIw03UhWIiirTb39rXbNbESbGRB/NguW38K8yGNoya6hY2BkwxowgeLKX11js0d5sSHgEgL+pDQtXshHu7vlYU0ksHwfmD/R8+ZHJH6F6L0vuzs4NoVK/8iQHFLboUjF2sORyuLHbBmFZQWhInet8pAkEA0OlL2uHCYhkNuokJ9H+OnJEqKS2BtYSkH3Hrh2opZg2HtvUtXEIxzmj/95CzxMXQtNJhQMK3ekvnF3Upcj2avwJBAK67i8OEKM2jerbFKrBqr6/kUkZeyHLA8I4L2C3/3nKPGUj/GAc2xxuK1XxnpC0e3Wqz5OMwzkWU4Ynblsdq2U8CQHu9U6LICbzVHh6YwP7C9xOhoBlXzPZZJGVDssA4j2DVLsednUqCIsIhy0s1uGUazi3sVpJnQwn7H1vzl6ME/j0CQAT7qj+4LCW5LM27j70aPcppW4NQPq0vHW0fn1moe2KO/CydwcSq5kC909rJZeA3ih755GQqRyeq2EfDMGidfncCQD770Za6sJP1/i1vcdoWuWYnhpiU8TNKjFb2vJEN598amcyJV9PlAAdEkszh6EDA76t6/yT6NoUn/y9x4YskzQo='

connect()

// const calcularPreco = (inicio, fim, nivelAtual) => {
//   const diff = Math.abs(new Date(inicio) - new Date(fim)) / 3600000

//   return (diff / 4) + nivelAtual;
// }

const getAll = (request, response) => {
  clientesModel.find((error, clientes) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(clientes)
  })
}

const getById = (request, response) => {
  const id = request.params.id

  return clientesModel.findById(id, (error, cliente) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (cliente) {
      return response.status(200).send(cliente)
    }

    return response.status(404).send('Cliente não encontrado.')
  })
}

const add = (request, response) => {
  const senhaCriptografada = bcrypt.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada
  request.body.grupo = 'comum'
  const novoCliente = new clientesModel(request.body)

  novoCliente.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoCliente)
  })
}

const addAdmin = (request, response) => {
  const senhaCriptografada = bcrypt.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada
  request.body.grupo = 'admin'
  const novoCliente = new clientesModel(request.body)

  novoCliente.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoCliente)
  })
}

const remove = (request, response) => {
  const id = request.params.id

  clientesModel.findByIdAndDelete(id, (error, cliente) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (cliente) {
      return response.status(200).send(id)
    }

    return response.status(404).send('Cliente não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const clienteUpdate = request.body
  const options = { new: true }

  clientesModel.findByIdAndUpdate(
    id,
    clienteUpdate,
    options,
    (error, cliente) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (cliente) {
        return response.status(200).send(cliente)
      }

      return response.status(404).send('Cliente não encontrado.')
    }
  )
}

const addTratamento = async (request, response) => {
  const clienteId = request.params.clienteId
  const ptratamento = request.body
  const options = { new: true }
  const novoTratamento = new tratamentosModel(tratamento)
  const cliente = await clientesModel.findById(clienteId)

  cliente.tratamentos.push(novoTratamento)
  cliente.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(cliente)
  })
}

// const alterarDadosProduto = async (request, response) => {
//   const pokemonId = request.params.pokemonId
//   const treinadorId = request.params.treinadorId
//   const treinador = await clientesModel.findById(treinadorId)
//   const pokemon = treinador.pokemons.find(pokemon => pokemon._id == pokemonId)

//   pokemon.nivel = calcularPreco(request.body.inicio, request.body.fim, pokemon.nivel)

//   return treinador.save((error) => {
//     if (error) {
//       return response.status(500).send(error)
//     }

//     return response.status(200).send(treinador)
//   })
// }

const getTratamentos = async (request, response) => {
  const clientesId = request.params.id
  await clientesModel.findById(clientesId, (error, clientes) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (clientes) {
      return response.status(200).send(clientes.tratamentos)
    }

    return response.status(404).send('Cliente não encontrado.')
  })
}

const updateTratamento = (request, response) => {
  const clienteId = request.params.clienteId
  const tratamentoId = request.params.tratamentoId
  const options = { new: true }

  clientesModel.findOneAndUpdate(
    { _id: clienteId, 'produto._id': produtoId },
    {
      $set: {
        'tratamentos.$.nome': request.body.nome,
        'email': request.body.email,
        'idade': request.body.idade,
        'telefone': request.body.telefone,
        'endereco': request.body.endereco,
        'alergias': request.body.alergiasn

      }
    },
    options,
    (error, cliente) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (cliente) {
        return response.status(200).send(cliente)
      }

      return response.status(404).send('Cliente não encontrado.')
    }
  )
}

const getTratamentoById = async (request, response) => {
  const clienteId = request.params.clienteId
  const tratamentoId = request.params.tratamentoId
  const cliente = await clientesModel.findById(clienteId)
  const tratamento = cliente.tratamentos.find(tratamento => tratamento._id == tratamentoId)

  return response.status(200).send(produto)
}

const login = async (request, response) => {
  const clienteEncontrado = await clientesModel.findOne({ email: request.body.email })

  if (clienteEncontrado) {
    const senhaCorreta = bcrypt.compareSync(request.body.senha, clienteEncontrado.senha)

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          grupo: clienteEncontrado.grupo
        },
        SEGREDO,
        { expiresIn: 6000 }
      )

      return response.status(200).send({ token })
    }

    return response.status(401).send('Senha incorreta.')
  }

  return response.status(404).send('Cliente não encontrado.')
}

module.exports = {
  getAll,
  getById,
  add,
  addAdmin,
  remove,
  update,
  addTratamento,
 // clienteProduto: alterarDadosProduto,
  getTratamentos,
  updateTratamento,
  getTratamentoById,
  login
}
