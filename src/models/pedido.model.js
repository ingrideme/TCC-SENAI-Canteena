const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({

    produto_id : Number,
    usuario_id: Number,
    qtdselecionado: Number,

}, {
    timestamps: true
});


const pedidos = mongoose.model('Pedidos', DataSchema);
module.exports = pedidos;