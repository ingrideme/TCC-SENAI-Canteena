const Pedido = require("../models/Pedido");

module.exports = {
  async index(req, res) {
    const { id } = req.params
    const pedidos = await Pedido.find({ usuario_id: id });
    return res.json(pedidos);
  },
  async create(req, res) {
    const { id } = req.params;
    const { total } = req.body;
    try {

      const pedido = await (
        await Pedido.create({
          usuario_id: id,
          total,
        })
      )
        .populate("Produto")
        .execPopulate();

      if (!pedido) {
        return res.status(400).send({ error: "Faça um pedido" });
      }
      return res.json(pedido);
    } catch (err) {
      return res.send({ error: err.message });
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
