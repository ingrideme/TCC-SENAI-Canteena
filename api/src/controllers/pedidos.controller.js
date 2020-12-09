const Pedido = require("../models/Pedido");

module.exports = {
  async index(req, res) {
    const pedidos = await Pedido.find().populate("produtos").exec()
    return res.json(pedidos);
  },
  async indexById(req, res) {
    const { id } = req.params
    const pedidos = await (await Pedido.findById(id).populate("produtos").populate("usuarios")).execPopulate();
    return res.json(pedidos);
  },
  async create(req, res) {
    const { id } = req.params;
    const { total, produtos } = req.body;
    try {
      const pedido = await Pedido.create({
        usuarios: id,
        produtos,
        total,
      })
      .populate("usuarios")

      if (!pedido) {
        return res.status(400).send({ error: "Faça um pedido" });
      }
      return res.json(pedido);
    } catch (err) {
      return res.send({ error: err });
    }
  },

  async details(req, res) {
    const { _id } = req.params;
    const pedidos = await Pedido.findOne({ _id });
    res.json(pedidos);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const pedidos = await Pedido.findByIdAndDelete({ _id });
    return res.json(pedidos);
  },
};
