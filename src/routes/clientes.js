const express = require('express');
const router = express.Router();
const controller = require("../controllers/ClientesController")
// const jwt = require('jsonwebtoken')



// const autenticar = (request, response, next) => {
//   const authHeader = request.get('authorization')
//   let autenticado = false

//   if (!authHeader) {
//     return response.status(401).send('Você precisa fazer login!')
//   }

//   const token = authHeader.split(' ')[1]

//   jwt.verify(token, SEGREDO, (error, decoded) => {
//     if (error) {
//       autenticado = false
//     } else {
//       if (decoded.grupo == 'comum' || decoded.grupo == 'ProfissionalEstetica') {
//         autenticado = true
//       } else {
//         autenticado = false
//       }
//     }
//   })

//   if (!autenticado) {
//     return response.status(403).send('Acesso negado.')
//   }

//   next()
// }

// const autenticarProfissionalEstetica = (request, response, next) => {
//   const authHeader = request.get('authorization')
//   let autenticado = false

//   if (!authHeader) {
//     return response.status(401).send('Você precisa fazer login!')
//   }

//   const token = authHeader.split(' ')[1]

//   jwt.verify(token, SEGREDO, (error, decoded) => {
//     if (error) {
//       autenticado = false
//     } else {
//       if (decoded.grupo == 'ProfissionalEstetica') {
//         autenticado = true
//       } else {
//         autenticado = false
//       }
//     }
//   })

//   if (!autenticado) {
//     return response.status(403).send('Acesso negado.')
//   }

//   next()
// }

// router.get('',autenticar, controller.getAll)
// router.post('', autenticarProfissionalEstetica, controller.add)// comum 
// router.post('/profissionalEstetica', autenticarProfissionalEstetica, controller.addProfEst) //ADM
// router.get('/:id', autenticar, controller.getById)
// router.patch('/:id', autenticar, controller.update)
// router.delete('/:id', autenticar, controller.remove)
// router.post('/:clienteId/tratamentos', autenticar, controller.addTratamento)
// //router.patch('/:clienteId/tratamentos/:tratamentoId/alterarDados', autenticar, controller.alterarDadosProduto)
// router.get('/:id/tratamentos', autenticar, controller.getTratamentos)
// router.patch('/:clienteId/tratamentos/:tratamentoId', autenticar, controller.updateTratamento)
// router.get('/:clienteId/tratamentos/:tratamentoId', autenticar, controller.getTratamentoById)
// router.post('/login', controller.login)


router.get('',controller.getAll)
router.post('', controller.add)// comum 
router.post('/profissionalEstetica', controller.addProfEst) //ADM
router.get('/:id',  controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.post('/:clienteId/tratamentos', controller.addTratamento)
//router.patch('/:clienteId/tratamentos/:tratamentoId/alterarDados', autenticar, controller.alterarDadosProduto)
router.get('/:id/tratamentos', controller.getTratamentos)
router.patch('/:clienteId/tratamentos/:tratamentoId', controller.updateTratamento)
router.get('/:clienteId/tratamentos/:tratamentoId', controller.getTratamentoById)
router.post('/login', controller.login)


module.exports = router
