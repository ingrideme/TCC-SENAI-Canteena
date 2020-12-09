const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    produtos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto"
    }],
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsuarioMobile"
    }],
    qtdselecionado: Number,
    total: Number,

}, {
    timestamps: true
});


const pedidos = mongoose.model('Pedido', DataSchema);
module.exports = pedidos;