import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Imports pastas admin
import Dashboard from "./pages/admin/dashboard";

import Produtos from "./pages/admin/produtos/";
import ProdutoEditar from "./pages/admin/produtos/produtos.editar";
import ProdutoCadastrar from "./pages/admin/produtos/produtos.cadastrar";

import Usuarios from "./pages/usuarios";
import UsuarioEditar from "./pages/usuarios/usuarios.editar";
import UsuarioCadastrar from "./pages/usuarios/usuarios.cadastrar";

//Imports pastas client
import Home from "./pages/client/home";
import ProdutoDetails from "./pages/client/produtos/produtos.details";
import Pedidos from "./pages/admin/pedidos";
import Login from "./pages/admin/login";
import PrivateRoute from './services/wAuth';
import PedidosDetails from "./pages/admin/pedidos/pedidos.details";

import UsuariosMobile from "./pages/admin/usuariosmobile/index";
import UsuarioMobileEditar from "./pages/admin/usuariosmobile/usuariosmobile.editar";



export default function Routes() {
  return(
    <BrowserRouter>
        <Switch>
            {/* Rota Cliente */}
            <Route path="/" exact component={Login} />
            <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />

            {/* Rota Admin */}
            <Route path="/admin/login" exact component={Login} />
            <PrivateRoute path="/admin" exact component={Dashboard} />

            <PrivateRoute path="/admin/pedidos" exact component={Pedidos} />
            <PrivateRoute path="/admin/pedidos.details/:idPedido" exact component={PedidosDetails} />


            <PrivateRoute path="/admin/produtos" exact component={Produtos} />
            <PrivateRoute path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
            <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

            <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
            <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
            <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />

            <PrivateRoute path="/admin/usuariosmobile" exact component={UsuariosMobile} />
            <PrivateRoute path="/admin/usuariosmobile/editar/:idUsuarioMobile" exact component={UsuarioMobileEditar} /> 

        </Switch>
    </BrowserRouter>
)
        }