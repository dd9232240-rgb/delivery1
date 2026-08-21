
import { Routes, Route } from "react-router-dom";

import Home from "./styles/pages/home";
import Busca from "./styles/pages/busca";
import Favoritos from "./styles/pages/favoritos";
import Enderecos from "./styles/pages/enderecos";
import Perfil from "./styles/pages/perfil";
import Cardapio from "./styles/pages/cardapio";
import Pedidos from "./styles/pages/pedidos";
import Login from "./styles/pages/login";
import Cadastro from "./styles/pages/cadastro";

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/busca" element={<Busca />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/enderecos" element={<Enderecos />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/cardapio/:id" element={<Cardapio />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

