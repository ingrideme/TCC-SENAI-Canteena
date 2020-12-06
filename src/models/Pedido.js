const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    produtos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto"
    }],
    usuario_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }],

    qtdselecionado: Number,

    total: Number,

    // produtos: [String]

}, {
    timestamps: true
});


const pedidos = mongoose.model('Pedido', DataSchema);
module.exports = pedidos;