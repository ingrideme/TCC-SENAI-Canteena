import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../../src/services/api";
import { useParams } from "react-router-dom";
import stylepedido from './stylepedido.css';


import Chip from "@material-ui/core/Chip";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   title: {
//     flexGrow: 1,
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//   },
// }));

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
      window.location.href = '/admin/pedidos';
    }
  }


  return (
<div class="quote-container">
  <i class="pin"></i>
  <blockquote class="note yellow">


  <h1>Total do pedido: R${pedidos.total}</h1>
      {pedidos.usuarios.map((item) => (
        <div key={item._id}>
          <h1>{item.nome_usuario}</h1>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px 10px",
        }}
      >
        {pedidos.produtos.map((item) => (
          <div class="bordinha"
            key={item._id}
          >
            <img style={{ height: 100 }} src={item.imagem_txt} alt="Imagem" />
            <h1>{item.nome_produto}</h1>
            <h3>Quantidade: {item.quantidade_selecionada}</h3>
          </div>
        ))}
        {console.log(pedidos)}
    </div>
                                
         

    <cite class="author">  <Button
                                    color="secondary"
                                    onClick={() => handleDelete(idPedido)}
                                  >
                                    Excluir
                                  </Button></cite>
  </blockquote>
</div>


                                  
  );
}
