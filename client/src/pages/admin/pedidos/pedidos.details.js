import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../../src/services/api";
import { useParams } from "react-router-dom";


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

export default function PedidosDetails() {
  const [pedidos, setPedidos] = useState();
  const { idPedido } = useParams();

  useEffect(() => {
    async function loadPedidos() {
      const response = await api.get("/api/pedidos/" + idPedido);
      setPedidos(response.data);
      console.log(pedidos);
    }
    loadPedidos();
  }, []);

  if (!pedidos || pedidos === undefined) return <h1>Carregando...</h1>;

  async function handleDelete(idPedido) {
    if (window.confirm("Deseja realmente excluir este pedido?")) {
      api.delete("/api/pedidos/" + idPedido).then((res) => console.log(res.data));
      window.location.href = '/admin/usuariosmobile';
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Total do pedido: R${pedidos.total}</h1>
      {pedidos.usuarios.map((item) => (
        <div key={item._id}>
          <h1>{item.nome_usuario}</h1>
          <h1>{item.email_usuario}</h1>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px 10px",
        }}
      >
        {pedidos.produtos.map((item) => (
          <div
            style={{
              width: 200,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={item._id}
          >
            <img style={{ height: 100 }} src={item.imagem_txt} alt="Imagem" />
            <h1>{item.nome_produto}</h1>
            <h3>Quantidade: {item.quantidade_selecionada}</h3>
          </div>
        ))}
        {console.log(pedidos)}
    </div>
                <h2>PEDIDO DETALHE</h2>
                                  <Button
                                    color="secondary"
                                    onClick={() => handleDelete(idPedido)}
                                  >
                                    Excluir
                                  </Button>
         
                                  </div>
  );
}
