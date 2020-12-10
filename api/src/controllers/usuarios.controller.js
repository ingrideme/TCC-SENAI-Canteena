const Usuario = require('../models/Usuario');
const jwt = require ('jsonwebtoken')
const secret = "mysecret";
const bcrypt = require("bcryptjs")
const authConfig = require('../auth/key.json');

module.exports = {
    async index(req, res){
        const user = await Usuario.find();
        return res.json(user);
    },
    async create(req,res){
        const {nome_usuario, email_usuario, tipo_usuario,senha_usuario} = req.body;
        let data = {};
        let user =  await Usuario.findOne({email_usuario});
        
        if(!user){
            data = {nome_usuario,email_usuario,tipo_usuario,senha_usuario};

            user = await Usuario.create(data);
            return res.status(200).json(user);
        }else{
            return res.status(500).json(user);
        }
    }, async login(req,res){
        const { email, senha } = req.body;
        Usuario.findOne({email_usuario: email, tipo_usuario:1}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
            }else if (!user){
                res.status(200).json({status:2, error: 'E-mail não encontrado no banco de dados'});
            }else{
                user.isCorrectPassword(senha, async function (err, same){
                    if(err){
                        res.status(200).json({error: "Erro no servidor. Por favor, tente novamente"});
                    }else if(!same){
                        res.status(200).json({status:2, error: "A senha não confere"});
                    }else{
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status:1, auth:true, token:token,id_client: user._id,user_name:user.nome_usuario,user_type:user.tipo_usuario});
                    }
                })
               
            }
        })
    },
    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            return res.json({status:401,msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    return res.json({status:401,msg:'Não autorizado: Token inválido!'});
                }else{
                    return res.json({status:200})
                }
            })
        }
    },
    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token',null,{httpOnly:true});
        }else{
            return res.status(401).send("Logout não autorizado!")
        }
        return res.send("Sessão finalizada com sucesso!");
    },
    
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        return res.json(user);
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
        return res.json(user);
    },
    
    async loginmobile(req, res) {
      const { email_usuario, senha_usuario } = req.body
  
      const user = await Usuario.findOne({ email_usuario })
      if(!user) {
          return res.send({ error: "Usuário não encontrado" })
      }
  
      if(!await bcrypt.compare(senha_usuario, user.senha_usuario)) {
          return res.send({ error: "Senha inválida" })
      }
  
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: 86400
      })
  
      return res.send({ user, token })
    }

}