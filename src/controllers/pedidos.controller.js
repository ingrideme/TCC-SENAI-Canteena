const Pedido = require('../models/pedido.model');


module.exports = {
    async index(req, res){
        const pedidos = await Pedido.find();
        res.json(pedidos);
    },
    async create(req, res){
        const { produto_id, usuario_id } = req.headers
        const { qtdselecionado, preco_total } = req.body
        try {

            const pedido = await Pedido.create({
                qtdselecionado,
                produto_id,
                usuario_id,
                preco_total
            })

            if(!pedido) {
                return res.send({ error: "Faça um pedido" })
            }

            return res.json(pedido)
        }
        catch(err) {
            return res.send({ error: err.message })
        }
        // const {produto_id, usuario_id, qtdselecionado,
        // } = req.body;
       
        // let data = {};
        // let pedidos =  await Pedido.findOne({produto_id});

        // if(!pedidos){
        //     data = {produto_id,
        //         usuario_id,
        //   qtdselecionado,
        //     };
        //     pedidos = await Pedido.create(data);
        //     return res.status(200).json(pedidos);
        // }else{
        //     return res.status(500).json(pedidos);
        // }
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