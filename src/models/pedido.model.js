const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    preco_produto: Number, 
    nome_produto: String,
    qtd_produto:{type: Number, default:0} ,
},{
    timestamps:true
});


const pedidos = mongoose.model('Pedidos', DataSchema);
module.exports = pedidos;