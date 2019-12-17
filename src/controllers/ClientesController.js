// conectar com o repositorio
const { connect } = require('../models/Repository')

//requisitando o clientesModel a fazer este caminho
const clientesModel = require('../models/ClientesSchema')

//requisitando o tratamentosModel a fazer este caminho
const { tratamentosModel } = require('../models/TratamentosSchema')

// bcrypt é um método de criptografia do tipo hash para senhas
const bcrypt = require('bcryptjs')

//
const jwt = require('jsonwebtoken')

const SEGREDO = process.env.SEGREDO


// Create: Criar um novo registro na tabela
// Retrieve: Consultar, recuperar registros de uma ou mais tabelas (query)
//	Update: Atualizar o valor de um registro existente em uma tabela
// 	Delete: Remover um registro da tabela





connect()

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

const addProfEst = (request, response) => {
  const senhaCriptografada = bcrypt.hashSync(request.body.senha)
  request.body.senha = senhaCriptografada
  request.body.grupo = 'ProfissionalEstetica'
  const novoCliente = new clientesModel(request.body)

  console.log('novo', novoCliente)

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
  const tratamento = request.body
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
    { _id: clienteId, 'produto._id': tratamentoId },
    {
      $set: {
        'tratamentos.$.nome': request.body.nome,
        'email': request.body.email,
        'idade': request.body.idade,
        'telefone': request.body.telefone,
        'endereco': request.body.endereco,
        'alergias': request.body.alergias
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
  addProfEst,
  remove,
  update,
  addTratamento,
  getTratamentos,
  updateTratamento,
  getTratamentoById,
  login
}
