const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DataSchema = new mongoose.Schema({
    nome_usuario:String,
    email_usuario:{
        type: String,
        unique: true
    },
    tipo_usuario:{type:Number, default:1},
    senha_usuario:String,
},{
    timestamps:true
});

DataSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha_usuario, 10)
    this.senha_usuario = hash
    next()
});


const usuarios = mongoose.model('Usuario',DataSchema);
module.exports = usuarios;