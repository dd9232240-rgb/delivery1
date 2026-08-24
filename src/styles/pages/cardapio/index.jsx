import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../../components/Navbar";
import Produto from "../../../components/produto/lista";
import Footer from "../../../components/Footer";

import Star from "../../../assets/star.png";
import api from "../../../services/api";

import "./style.css";

function Cardapio() {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [foto, setFoto] = useState("");
  const [entrega, setEntrega] = useState(0);
  const [minimo, setMinimo] = useState(0);
  const [qtd, setQtd] = useState(0);

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [estabelecimento, setEstabelecimento] =
    useState(null);

  // =====================================================
  // PRIMEIRO useEffect
  // Busca o estabelecimento
  // =====================================================

  useEffect(() => {
    if (!id) return;

    const buscarEstabelecimento = async () => {
      try {
        const response = await api.get(
          `/v1/estabelecimentos/${id}`
        );

        console.log(
          "Resposta da API:",
          response.data
        );

        const dados = Array.isArray(response.data)
          ? response.data[0]
          : response.data?.data || response.data;

        if (!dados) {
          console.error(
            "Estabelecimento não encontrado."
          );

          return;
        }

        setEstabelecimento(dados);

        setNome(dados.nome || "");
        setEndereco(dados.endereco || "");
        setComplemento(dados.complemento || "");
        setBairro(dados.bairro || "");
        setCidade(dados.cidade || "");
        setUF(dados.uf || "");
        setAvaliacao(dados.avaliacao || 0);
        setFoto(dados.foto || "");
        setEntrega(dados.entrega || 0);
        setMinimo(dados.minimo || 0);
        setQtd(dados.qtd || 0);

      } catch (error) {
        console.error(
          "Erro ao buscar estabelecimento:",
          error
        );
      }
    };

    buscarEstabelecimento();

  }, [id]);

  // =====================================================
  // SEGUNDO useEffect
  // Busca os produtos e categorias
  // =====================================================

  useEffect(() => {
    if (!id) return;

    api.get(`/v1/cardapios/${id}`)
      .then((response) => {

        const dados = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const categoriasLista = dados
          .map((item) => item.categoria)
          .filter(Boolean);

        const categoriaUnica = [
          ...new Set(categoriasLista),
        ];

        setCategorias(categoriaUnica);
        setProdutos(dados);

      })
      .catch((err) => {
        console.log(
          "Erro ao buscar cardápio:",
          err
        );

        setProdutos([]);
        setCategorias([]);
      });

  }, [id]);

  // =====================================================
  // TERCEIRO useEffect
  // Trata a imagem do estabelecimento
  // =====================================================

  useEffect(() => {
    if (!estabelecimento) return;

    let imagem =
      estabelecimento.foto;

    console.log(
      "Foto original:",
      imagem
    );

    if (
      imagem &&
      typeof imagem === "object"
    ) {
      imagem =
        imagem.url ||
        imagem.path ||
        imagem.src ||
        imagem.nome ||
        "";
    }

    if (imagem) {
      imagem =
        String(imagem).trim();
    }

    if (!imagem) {
      setFoto("");

    } else if (
      imagem.startsWith("http://") ||
      imagem.startsWith("https://") ||
      imagem.startsWith("data:image")
    ) {
      setFoto(imagem);

    } else {
      const baseURL =
        api.defaults.baseURL || "";

      const urlFinal =
        `${baseURL.replace(
          /\/$/,
          ""
        )}/${imagem.replace(
          /^\//,
          ""
        )}`;

      console.log(
        "URL final da imagem:",
        urlFinal
      );

      setFoto(urlFinal);
    }

    if (
      Array.isArray(
        estabelecimento.produtos
      )
    ) {
      setProdutos(
        estabelecimento.produtos
      );
    }

  }, [estabelecimento]);

  // =====================================================
  // FORMATA MOEDA
  // =====================================================

  const formatarMoeda = (valor) => {
    const numero =
      Number(valor) || 0;

    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    ).format(numero);
  };

  // =====================================================
  // TELA
  // =====================================================

  return (
    <>
      <NavBar />

      <div className="container">
        <div className="row col-lg-8 offset-lg-2">

          {/* IMAGEM */}

          <div className="col-12">
            {foto ? (
              <img
                src={foto}
                alt={
                  nome ||
                  "Estabelecimento"
                }
                className="img-fluid rounded img-estabelecimento-cardapio"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  console.error(
                    "Erro ao carregar imagem:",
                    foto
                  );

                  e.currentTarget.style.display =
                    "none";
                }}
              />
            ) : (
              <div
                className="sem-imagem"
                style={{
                  width: "100%",
                  height: "300px",
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              >
                Sem imagem
              </div>
            )}
          </div>

          {/* INFORMAÇÕES */}

          <div className="col-12 mt-4">

            <h2>
              {nome}
            </h2>

            <span>
              {endereco}

              {complemento && (
                <>
                  {" - "}
                  {complemento}
                </>
              )}

              {bairro && (
                <>
                  {" - "}
                  {bairro}
                </>
              )}

              {cidade && (
                <>
                  {" - "}
                  {cidade}
                </>
              )}

              {uf && (
                <>
                  {" - "}
                  {uf}
                </>
              )}
            </span>

            <div className="classificacao mt-3">

              <img
                src={Star}
                alt="Avaliação"
                className="star"
              />

              <span className="ms-1">
                {Number(avaliacao).toFixed(1)}
              </span>

              <span className="ms-3">
                {qtd} avaliações
              </span>

            </div>

            <div className="classificacao mt-3">

              <span>
                <b>
                  Taxa de entrega:
                </b>{" "}

                {formatarMoeda(entrega)}
              </span>

              <span className="ms-5">
                <b>
                  Pedido mínimo:
                </b>{" "}

                {formatarMoeda(minimo)}
              </span>

            </div>

          </div>

          {/* PRODUTOS POR CATEGORIA */}

          {categorias.length > 0 ? (

            categorias.map((categoria) => {

              const produtosDaCategoria =
                produtos.filter(
                  (produto) =>
                    produto.categoria === categoria
                );

              return (
                <div
                  className="row mt-5"
                  key={categoria}
                >

                  <div className="mb-3">
                    <h5>
                      {categoria}
                    </h5>
                  </div>

                  {produtosDaCategoria.map(
                    (produto, index) => (
                      <Produto
                        key={
                          produto.id ||
                          produto.id_produto ||
                          index
                        }
                        produto={produto}
                      />
                    )
                  )}

                </div>
              );
            })

          ) : produtos.length > 0 ? (

            <div className="row mt-5">

              <div className="mb-3">
                <h5>
                  Produtos
                </h5>
              </div>

              {produtos.map(
                (produto, index) => (
                  <Produto
                    key={
                      produto.id ||
                      produto.id_produto ||
                      index
                    }
                    produto={produto}
                  />
                )
              )}

            </div>

          ) : (

            <div className="row mt-5">

              <div className="mb-3">
                <h5>
                  Destaques
                </h5>
              </div>

              {produtos.map(
                (produto, index) => (
                  <Produto
                    key={
                      produto.id ||
                      produto.id_produto ||
                      index
                    }
                    produto={produto}
                  />
                )
              )}

            </div>

          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cardapio;
