import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import MenuAdmin from "../../../components/menu.admin";
import Footer from "../../../components/footer-admin";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import api from "../../../../src/services/api";

import Chip from "@material-ui/core/Chip";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function PedidosListagem() {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function loadPedidos() {
      await api.get("/api/pedidos/list").then(res => {
        setPedidos(res.data)
      })
    }
    loadPedidos();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este pedido?")) {
      api.delete("/api/pedidos/" + id).then((res) => console.log(res.data));
      window.location.reload()
    }
  }

  if(!pedidos) {
    return console.log("Essa porra não pega!!")
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={"PEDIDOS"} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Pedidos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <TableContainer
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>ID Pedido</TableCell>
                            <TableCell align="center">Usuário ID</TableCell>
                            <TableCell align="center">Preço Total </TableCell>
                            <TableCell align="center">Data de Pedido</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pedidos.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell>
                              <TableCell align="center">
                                {row.usuarios.map(item => item)}
                              </TableCell>
                              <TableCell align="center"> {row.total}</TableCell>
                              <TableCell align="center">
                                {new Date(row.createdAt).toLocaleDateString(
                                  "pt-br"
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button
                                    color="primary"
                                    href={"/admin/pedidos.details/" + row._id}
                                  >
                                    Detalhes
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    Excluir
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </TableContainer>
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
