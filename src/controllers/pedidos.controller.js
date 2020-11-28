const Pedido = require('../models/pedido.model');


module.exports = {
    async index(req, res){
        const pedidos = await Pedido.find();
        res.json(pedidos);
    },
    async create(req, res){
        const {nome_produto, qtd_produto, preco_produto
        } = req.body;
       
        let data = {};
        let pedidos =  await Pedido.findOne({nome_produto});

        if(!pedidos){
            data = {nome_produto, qtd_produto, preco_produto
            };

            pedidos = await Pedido.create(data);
            return res.status(200).json(pedidos);
        }else{
            return res.status(500).json(pedidos);
        }
    },
    
    async details(req,res){
        const {_id} = req.params;
        const pedidos = await Pedido.findOne({_id});
        res.json(pedidos);
    },
    async delete(req, res){
        const {_id} = req.params;
        const pedidos = await Pedido.findByIdAndDelete({_id});
        return res.json(pedidos);
    }
}