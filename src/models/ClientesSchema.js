const mongoose = require('mongoose');
const { TratamentosSchema } = require('./TratamentosSchema')
const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  idade: { type: Number },
  telefone: { type: String },
  endereco: { type: String },
  alergias: { type: String },
  grupo: { type: String },
  tratamentos: [TratamentosSchema],

})

const clientesModel = mongoose.model('clientes', ClientesSchema);

module.exports = clientesModel;
