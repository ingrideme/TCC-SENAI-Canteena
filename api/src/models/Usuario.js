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

DataSchema.pre('findOneAndUpdate', function (next){
    var password = this.getUpdate().senha_usuario+'';
    if(password.length<55){
        this.getUpdate().senha_usuario = bcrypt.hashSync(password,10);
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback ){
    bcrypt.compare(password,this.senha_usuario,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    })
}



const usuarios = mongoose.model('Usuario',DataSchema);
module.exports = usuarios;