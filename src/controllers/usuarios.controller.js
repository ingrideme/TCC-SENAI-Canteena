const Usuario = require('../models/usuario.model');
const jwt = require ('jsonwebtoken')
const auth = require ('../auth/key.json')
const bcrypt = require("bcryptjs")

const generateToken = (params = {}) => {
    return jwt.sign(params, auth.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async index(req, res){
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req, res){
        const { email } = req.body;
       
        if(await Usuario.findOne({ email })) {
            return res.status(400).send({ error: "Usuário já existe" })
        }
        else {
            const user = await Usuario.create(req.body)
            return res.status(500).json({
                user,
                token: generateToken({ id: user._id })
            });
        }
    },
//tela de login
    async autenticacao(req, res) {
        const { email, senha } = req.body

        if(!await Usuario.findOne({ email })) {
            return res.status(400).send({ error: "Usuário não existe" })
        }
        
        const user = await Usuario.findOne({ email })

        if(!await bcrypt.compare(senha, user.senha)) {
            return res.status(400).send({ error: "Senha inválida" })
        }

        return res.send({
            user,
            token: generateToken({ id: user._id })
        })
    },
    
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req, res){
        const {_id} = req.params;
        const user = await Usuario.findByIdAndDelete({_id});
        return res.json(user);
    },
    async update(req,res){
        const {_id, nome_usuario, email_usuario, senha_usuario, tipo_usuario} = req.body;
        const data = { nome_usuario, email_usuario, senha_usuario, tipo_usuario};
        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true});      
        res.json(user);
    }
}