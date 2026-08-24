import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import NavBar from "../../../components/Navbar";
import Estabelecimento from "../../../components/estabelecimento";
import api from "../../../services/api";

function Busca() {
const [searchParams] = useSearchParams();

const [estabelecimentos, setEstabelecimentos] = useState([]);
const [processando, setProcessando] = useState(false);

const busca = (searchParams.get("q") || "")
.trim()
.toLowerCase();

const idCategoria =
searchParams.get("id_categoria") || "";

function limparTexto(texto) {
return String(texto || "")
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.replace(/'/g, "")
.replace(/\s/g, "")
.trim();
}

async function listarEstabelecimentos() {
setProcessando(true);

try {
  const response = await api.get(
    "/v1/estabelecimentos",
    {
      params: {
        q: busca,
        nome: busca,
        id_categoria: idCategoria,
        cod_cidade:
          localStorage.getItem(
            "SessionCodCidade"
          ),
        pagina: 1,
        limite: 9999,
      },
    }
  );

  let dados = [];

  // API retornando { data: [...] }
  if (Array.isArray(response.data?.data)) {
    dados = response.data.data;
  }

  // API retornando diretamente [...]
  else if (Array.isArray(response.data)) {
    dados = response.data;
  }

  // Filtra somente quando houver pesquisa
  if (busca.length > 0) {
    const pesquisa = limparTexto(busca);

    dados = dados.filter((restaurante) => {
      const nome = limparTexto(
        restaurante.nome ||
          restaurante.fantasia ||
          restaurante.razao_social ||
          restaurante.nome_estabelecimento ||
          ""
      );

      return nome.includes(pesquisa);
    });
  }

  setEstabelecimentos(dados);
} catch (error) {
  console.error(
    "Erro ao buscar restaurantes:",
    error
  );

  setEstabelecimentos([]);
} finally {
  setProcessando(false);
}


}

useEffect(() => {
listarEstabelecimentos();
}, [busca, idCategoria]);

return ( <div className="container-fluid mt-page"> <NavBar />

  <div className="row m-2">
    <h3>
      {busca
        ? `Resultado para "${busca}"`
        : "Todos os restaurantes"}
    </h3>
    {busca.length > 0 ? <small className="mb-4 text-secondary">Pesquisando por "{busca}"</small> : null}
  </div>

  <div className="row m-2">
    {estabelecimentos.length > 0 ? (
      estabelecimentos.map((estabelecimento) => (
        <Estabelecimento
          key={
            estabelecimento.id_estabelecimento ||
            estabelecimento.id
          }
          id_estabelecimento={
            estabelecimento.id_estabelecimento ||
            estabelecimento.id
          }
          url_imagem={
            estabelecimento.url_logo ||
            estabelecimento.url_imagem ||
            ""
          }
          nome={
            estabelecimento.nome ||
            estabelecimento.fantasia ||
            estabelecimento.razao_social ||
            estabelecimento.nome_estabelecimento ||
            ""
          }
          avaliacao={
            estabelecimento.avaliacao || 0
          }
          categoria={
            estabelecimento.categoria || ""
          }
        />
      ))
    ) : (
      !processando && (
        <div className="text-center my-4">
          <h5>
            Nenhum restaurante encontrado.
          </h5>
        </div>
      )
    )}
  </div>

  {processando && (
    <div className="text-center my-4">
      <div
        className="spinner-border text-danger"
        role="status"
      ></div>

      <p className="text-danger mt-2 fw-bold">
        Buscando restaurantes...
      </p>
    </div>
  )}
</div>


);
}

export default Busca;
