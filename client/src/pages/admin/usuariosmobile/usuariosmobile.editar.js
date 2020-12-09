import  React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MenuAdmin from '../../../components/menu.admin';
import Footer from './../../../components/footer-admin';

import Button from '@material-ui/core/Button';

import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl:{
    width: '100%',
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
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  
}));

export default function UsuarioMobileEditar() {
  
  const classes = useStyles();

  const [nome, setNome ] = useState('');
  const [email, setEmail ] = useState('');
  const [saldo, setSaldo] = useState('');
  const [tipo, setTipo ] = useState('');

  const { idUsuarioMobile } = useParams();
 
  useEffect(() => {
    async function getUsuarioMobile(){
      var response = await api.get('/api/usuariosmobile.details/'+idUsuarioMobile);
      
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setSaldo(response.data.saldo_usuario);
      setTipo(response.data.tipo_usuario);
    }

    getUsuarioMobile();
  },[])

  async function handleSubmit(){
    if(saldo !== ''){
      api.patch(`/api/usuariosmobile/${idUsuarioMobile}`,{ saldo_usuario: saldo })
        .then(res => {
          window.location.href='/admin/usuariosmobile'
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS MOBILE'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
       
        <Grid container spacing={3}>
          <Grid item sm={12}>
          <Paper className={classes.paper}>
            <h2>Atualização de Usuário</h2>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
          <TextField
            required
            id="nome"
            name="nome"
            label="Nome Completo"
            fullWidth
            autoComplete="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
        <FormControl className={classes.formControl}>
                    <InputLabel id="labelTipo">Tipo</InputLabel>
                    <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}             
                       >
           <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Funcionário</MenuItem>
                      <MenuItem value={3}>Aluno</MenuItem>
                    </Select>
                  </FormControl>
        </Grid>
           <Grid item xs={12} sm={3}>
          <TextField
            id="saldo"
            name="saldo"
            label="Saldo"
            fullWidth
            autoComplete="saldo"
            value={saldo}
            onChange={e => setSaldo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Salvar
        </Button>
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