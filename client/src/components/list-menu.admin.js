import React from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {getToken, logout} from '../services/auth';
import api from '../services/api';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/usuarios" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários Admin" />
      </ListItem>
      <ListItem button component="a" href="/admin/usuariosmobile" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários Mobile" />
      </ListItem>     
    
        <ListItem button component="a" href="/admin/pedidos" >
    <ListItemIcon>
    <ShoppingCartIcon />
</ListItemIcon>
       <ListItemText primary="Pedidos" />
     </ListItem>
    <ListItem button component="a" href="/admin/produtos" >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair(){
  if(window.confirm("Deseja realmente sair do sistema?")){
    const response = await api.get("/api/usuarios/destroytoken",{headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href = '/admin/login'
    }else{
      alert("Não foi possível fazer o logout!");
    }
  }
}