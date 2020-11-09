const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: {
        type: String,
        unique: true
    },
    tipo:{
        type:Number, 
        default:1
    },
    senha: String,
},{
    timestamps:true
});

UsuarioSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash
    next()
});

// UsuarioSchema.pre('findOneAndUpdate', function(next){
//     var password = this.getUpdate().senha_usuario+'';
//     if(password.length<55){
//         this.getUpdate().senha_usuario = bcrypt.hashSync(password, 10);
//     }
//     next();
// })

const Usuario = mongoose.model('Usuarios', UsuarioSchema);
module.exports = Usuario;