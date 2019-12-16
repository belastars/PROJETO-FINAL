const mongoose = require('mongoose');
const { TratamentosSchema } = require('./TratamentosSchema')
const Schema = mongoose.Schema;
const ClientesSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  idade: { type: Number, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  alergias: { type: String, required: true },
  grupo: { type: String, required: true },
  tratamentos: [TratamentosSchema],


})

const clientesModel = mongoose.model('clientes', ClientesSchema);

module.exports = clientesModel;
