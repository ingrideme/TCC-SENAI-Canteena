const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');
const Produto = require('./controllers/produtos.controller');
const Pedido = require('./controllers/pedidos.controller');


routes.get('/',Usuario.index);

// Rotas de Usuários
routes.post('/api/usuarios',Usuario.create);
routes.post('/api/usuarios/login',Usuario.login);
routes.post('/api/usuarios/loginmobile',Usuario.loginmobile);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);
routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id',Usuario.delete);
routes.put('/api/usuarios', Usuario.update);
routes.get('/api/usuarios/checktoken',Usuario.checkToken);

// Rotas de Pedido
routes.post('/api/pedidos/:id',Pedido.create);
routes.get('/api/pedidos',Pedido.index);
routes.get('/api/pedidos/:id',Pedido.indexId);
routes.get('/api/pedidos.details/:_id', Pedido.details);
routes.delete('/api/pedidos/:_id',Pedido.delete);


// Rotas de Produtos
routes.post('/api/produtos',Produto.create);
routes.get('/api/produtos',Produto.index);
routes.get('/api/produtos.details/:_id', Produto.details);
routes.delete('/api/produtos/:_id',Produto.delete);
routes.put('/api/produtos', Produto.update);
routes.get('/api/filtro',Produto.filtroProduto);
routes.get('/api/filtro/produtos',Produto.produtoSelecionado);
routes.patch('/api/produtos/:_id',Produto.selecionarProduto);


module.exports = routes;

