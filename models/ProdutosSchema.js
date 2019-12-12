const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProdutosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true }, //colocar kits
  descricao: { type: String, required: true },
  foto: { type: String, required: true },
  preco: { type: Number },
})

const produtosModel = mongoose.model('produtos', ProdutosSchema);

module.exports = { produtosModel, ProdutosSchema };
