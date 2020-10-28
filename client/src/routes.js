import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//Imports pastas admin
import Dashboard from './pages/admin/dashboard';

import Produtos from './pages/admin/produtos/';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';

import Usuarios from './pages/usuarios';
import UsuarioEditar from './pages/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/usuarios/usuarios.cadastrar';

//Imports pastas client
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';
import Pedidos from './pages/admin/pedidos';

export default function Routes() {
    return(
        <BrowserRouter>
        <Switch>
            {/* Rota Cliente */}
            <Route path="/" exact component={Home}/>
            <Route path="/produtos/:idProduto" exact component={ProdutoDetails}/>
        
          {/* Rota Admin */}
          <Route path="/admin" exact component={Dashboard}/>
           
            <Route path="/admin/produtos" exact component={Produtos}/>
            <Route path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar}/>
            <Route path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar}/>


            <Route path="/admin/usuarios/pedidos" exact component={Pedidos}/>

            <Route path="/admin/usuarios" exact component={Usuarios}/>
            <Route path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar}/>
            <Route path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar}/>
        </Switch>
        </BrowserRouter>
    )
}