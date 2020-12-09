const Produto = require('../models/Produto');


module.exports = {
    async index(req, res) {
        const product = await Produto.find();
        return res.json(product);
    },
    async create(req, res) {
        const { nome_produto, descricao_produto,
            preco_produto, qtd_produto, tipo_produto, imagem_txt, selecionado
        } = req.body;

        let data = {};
        let product = await Produto.findOne({ nome_produto });

        if (!product) {
            data = { nome_produto, descricao_produto, preco_produto, qtd_produto, tipo_produto, imagem_txt, selecionado };

            product = await Produto.create(data);
            return res.status(200).json(product);
        } else {
            return res.status(500).json(product);
        }
    },
    async details(req, res) {
        const { _id } = req.params;
        const product = await Produto.findOne({ _id });
        return res.json(product);
    },
    async filtroProduto(req, res) {
        const { tipo_produto } = req.query;
        const product = await Produto.find({ tipo_produto });
        return res.json(product);
    },
    async selecionarProduto(req, res) {
        const { _id } = req.params;
        const product = await Produto.findByIdAndUpdate(_id, req.body, { new: true });
        return res.json(product);
    },
    async produtoSelecionado(req, res) {
        const { selecionado } = req.query;
        const product = await Produto.find({ selecionado });
        res.json(product);
    },

    async delete(req, res) {
        const { _id } = req.params;
        const product = await Produto.findByIdAndDelete({ _id });
        return res.json(product);
    },
    async update(req, res) {
        const { _id, nome_produto, descricao_produto, preco_produto, qtd_produto, tipo_produto, imagem_txt, selecionado,quantidade_selecionada } = req.body;
        const data = { nome_produto, descricao_produto, preco_produto, qtd_produto, tipo_produto, imagem_txt, selecionado,quantidade_selecionada };
        const product = await Produto.findOneAndUpdate({ _id }, data, { new: true });
        return res.json(product);
    }
}