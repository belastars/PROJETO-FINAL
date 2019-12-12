const mongoose = require('mongoose');
const { ProdutosSchema } = require('./ProdutosSchema')
const Schema = mongoose.Schema;
const ClientesSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  foto: { type: String, required: true },
  produtos: [ProdutosSchema],
  senha: { type: String, required: true },
  grupo: { type: String }
})

const clientesModel = mongoose.model('clientes', ClientesSchema);

module.exports = clientesModel;
