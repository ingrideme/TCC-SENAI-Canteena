import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MenuAdmin from '../../../components/menu.admin';
import Footer from './../../../components/footer-admin';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api';

import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { getNomeTipo, getNomeTipoLabel } from '../../../functions/static_data';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
 
}));


export default function UsuariosListagem() {
  const classes = useStyles();

const [usuariosmobile, setUsuariosMobile] = useState([]);

useEffect(() =>{
  async function loadUsuariosMobile(){
  const response = await api.get("/api/usuariosmobile")
  setUsuariosMobile(response.data) 
}
  loadUsuariosMobile();
}, []);

async function handleDelete(id){
  if(window.confirm("Deseja realmente excluir este usuário?")){
    var result = await api.delete('/api/usuariosmobile/'+id);
    if(result.status==200){
      window.location.href = '/admin/usuariosmobile';
    }else{
    alert('Ocorreu um erro. Por favor, tente novamente!');
  }
}}


  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USUARIOS MOBILE'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item sm={12}>
          <Paper className={classes.paper}>
            <h2>Listagem de Usuários - Sistema</h2>
            <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Data de Cadastro</TableCell>
            <TableCell align="center">Saldo</TableCell>
            <TableCell align="right">Opções</TableCell>
          </TableRow>
        </TableHead>
         <TableBody>
          {usuariosmobile.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.nome_usuario}
              </TableCell>
              <TableCell align="center">{row.email_usuario}</TableCell>
              <TableCell align="center"><Chip label={getNomeTipo(row.tipo_usuario)} color={getNomeTipoLabel(row.tipo_usuario)}/></TableCell>
              <TableCell align="center">{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
           <TableCell align="center">{row.saldo_usuario}</TableCell>
              <TableCell align="right">
              <ButtonGroup aria-label="outlined primary button group">
              <Button color="primary" href={'/admin/usuariosmobile/editar/'+row._id}>Atualizar</Button>
              <Button color="secondary" onClick={() => handleDelete(row._id)}>Excluir</Button>
              </ButtonGroup> 
              </TableCell>
              </TableRow>
          ))}
        </TableBody> 
      </Table>
    </TableContainer>
          </Grid>
          </Grid>
        </Paper>
          </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}