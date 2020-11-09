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
import { isAuthenticated } from "./auth/autenticacao";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rota Cliente */}
        <Route path="/" exact component={Home} />
        <Route path="/produtos/:idProduto" exact component={ProdutoDetails} />
        <Route path="/login" exact component={Login} />

        {/* Rota Admin */}
        <PrivateRoute path="/admin" exact component={Dashboard} />

        <PrivateRoute path="/admin/produtos" exact component={Produtos} />

        <PrivateRoute
          path="/admin/produtos/cadastrar"
          exact
          component={ProdutoCadastrar}
        />
        <PrivateRoute
          path="/admin/produtos/editar/:idProduto"
          exact
          component={ProdutoEditar}
        />

        <PrivateRoute
          path="/admin/usuarios/pedidos"
          exact
          component={Pedidos}
        />

        <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
        <PrivateRoute
          path="/admin/usuarios/cadastrar"
          exact
          component={UsuarioCadastrar}
        />
        <PrivateRoute
          path="/admin/usuarios/editar/:idUsuario"
          exact
          component={UsuarioEditar}
        />
      </Switch>
    </BrowserRouter>
  );
}
