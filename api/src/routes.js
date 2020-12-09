const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');
const UsuarioMobile = require('./controllers/usuariosmobile.controller');
const Produto = require('./controllers/produtos.controller');
const Pedido = require('./controllers/pedidos.controller');

// Rotas de Usuários
routes.post('/api/usuarios',Usuario.create);
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);
routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id',Usuario.delete);
routes.put('/api/usuarios', Usuario.update);
routes.get('/api/usuarios/checktoken',Usuario.checkToken);


// Rotas de Usuário Mobile
routes.post('/api/usuariosmobile',UsuarioMobile.create);
routes.post('/api/usuarios/loginmobile',UsuarioMobile.loginmobile);
routes.get('/api/usuariosmobile',UsuarioMobile.index);
routes.get('/api/usuariosmobile.details/:_id', UsuarioMobile.details);
routes.delete('/api/usuariosmobile/:_id',UsuarioMobile.delete);
routes.patch('/api/usuariosmobile/:id', UsuarioMobile.update);

// Rotas de Pedido
routes.post('/api/pedidos/:id',Pedido.create);
routes.get('/api/pedidos/list',Pedido.index);
routes.get('/api/pedidos/:id',Pedido.indexById);
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