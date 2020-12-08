import React, { useState, useEffect } from "react";
import api from "../../../../src/services/api";
import { useParams } from "react-router-dom";

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
      {pedidos.usuario_id.map((item) => (
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
    </div>
  );
}
