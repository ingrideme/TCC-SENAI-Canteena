const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({

    produto_id : [String],
    usuario_id : String,
    qtdselecionado: Number,
    preco_total: Number,

},
{
    timestamps: true
});


const pedidos = mongoose.model('Pedidos', DataSchema);
module.exports = pedidos;