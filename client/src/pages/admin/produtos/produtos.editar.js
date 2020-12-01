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

import Footer from '../../../components/footer-admin';

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

export default function ProdutoCadastrar() {
  
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [preco, setPreco ] = useState('');
  const [descricao, setDescricao ] = useState('');
  const [qtd, setQtd ] = useState('');
  const [tipo, setTipo ] = useState('');
  const [imagemtxt, setImagemtxt ] = useState('');
  const[quantidade_selecionada] = useState(0)
  const[selecionado] = useState(false)


  const { idProduto } = useParams();
 
  useEffect(() => {
    async function getProduto(){
      var response = await api.get('/api/produtos.details/'+idProduto);
      
      setNome(response.data.nome_produto);
      setPreco(response.data.preco_produto);
      setDescricao(response.data.descricao_produto);
      setQtd(response.data.qtd_produto);
      setImagemtxt(response.data.imagem_txt);
      setTipo(response.data.tipo_produto);

    }

    getProduto();
  },[])

  async function handleSubmit(){

    const data = {
      nome_produto: nome,
      preco_produto: preco,
      qtd_produto: qtd, 
      descricao_produto: descricao,
      tipo_produto: tipo,
      imagem_txt: imagemtxt,
      _id: idProduto,
      quantidade_selecionada:quantidade_selecionada,
      selecionado:selecionado
    }

    if(nome!==''&&preco!==''&&qtd!==''&&descricao!==''&&tipo!==''&&imagemtxt!==''){
      const response = await api.put('/api/produtos', data);

      if(response.status===200){
        window.location.href='/admin/produtos'
      }else{
        alert('Erro a atualizar o produto!');
      }
    }else{
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'PRODUTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
       
        <Grid container spacing={3}>
          <Grid item sm={12}>
          <Paper className={classes.paper}>
            <h2>Atualização de Produto</h2>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
          <TextField
            required
            id="nome"
            name="nome"
            label="Produto"
            fullWidth
            autoComplete="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="descricao"
            name="descricao"
            label="Descricao"
            fullWidth
            autoComplete="descricao"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField
            type="preco"
            required
            id="preco"
            name="preco"
            label="Preco"
            fullWidth
            autoComplete="preco"
            value={preco}
            onChange={e => setPreco(e.target.value)}
          />
        </Grid>
           <Grid item xs={12} sm={3}>
          <TextField
            type="qtd"
            required
            id="qrd"
            name="qtd"
            label="QTd"
            fullWidth
            autoComplete="qtd"
            value={qtd}
            onChange={e => setQtd(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            type="qtd"
            required
            id="qrd"
            name="qtd"
            label="QTd"
            fullWidth
            autoComplete="qtd"
            value={qtd}
            onChange={e => setQtd(e.target.value)}
          />
        </Grid>


        <Grid xs={12} sm={3}>
        <FormControl className={classes.formControl}>
                    <InputLabel id="labelTipo">Tipo</InputLabel>
                    <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}             
                       >
                      <MenuItem value={1}>Bebidas</MenuItem>
                      <MenuItem value={2}>Doces</MenuItem>
                      <MenuItem value={3}>Salgados</MenuItem>
                    </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
          <TextField
            required
            id="imagemtxt"
            name="imagemtxt"
            label="String de Imagem"
            fullWidth
            autoComplete="imagemtxt"
            value={imagemtxt}
            onChange={e => setImagemtxt(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Salvar
        </Button>
        </Grid>
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