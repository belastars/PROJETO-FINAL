const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TratamentosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dataInicio: { type: Date },
  dataExpiracao:{ type: Date },
  preco: { type: Number }
})

const tratamentosModel = mongoose.model('tratamentos', TratamentosSchema);

module.exports = { tratamentosModel, TratamentosSchema };
