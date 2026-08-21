import { useEffect, useState } from "react";

import NavBar from "../../../components/Navbar";
import Banner from "../../../components/banner";
import Categoria from "../../../components/categoria";
import Estabelecimento from "../../../components/estabelecimento";
import Footer from "../../../components/Footer";

import api from "../../../services/api";

import "./style.css";


const IMAGEM_PADRAO_ESTABELECIMENTO =
  "https://cdn.awsli.com.br/300x300/2394/2394401/produto/241055378113828d0b4.jpg";


const CATEGORIAS_FAKE = [
  {
    id_categoria: 1,
    nome: "Hambúrguer",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id_categoria: 2,
    nome: "Pizza",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
  },
  {
    id_categoria: 3,
    nome: "Sushi",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/2718/2718224.png",
  },
  {
    id_categoria: 4,
    nome: "Bebidas",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/3050/3050155.png",
  },
  {
    id_categoria: 5,
    nome: "Açaí",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/5787/5787016.png",
  },
  {
    id_categoria: 6,
    nome: "Sorvetes",
    url_foto:
      "https://cdn-icons-png.flaticon.com/512/3082/3082016.png",
  },
];


const BANNERS_FAKE = [
  {
    id_banner: 1,
    descricao: "Hambúrguer Artesanal",
    foto:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id_banner: 2,
    descricao: "Pizza em Dobro",
    foto:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
];



function normalizarTexto(texto = "") {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}



function normalizarLista(response) {

  const dados =
    response?.data?.data ??
    response?.data ??
    [];

  return Array.isArray(dados)
    ? dados
    : [];

}



function processarGruposDestaques(response) {

  const dados = normalizarLista(response);

  const grupos = {};


  dados.forEach((item) => {

    const descricao =
      item.descricao ||
      item.titulo ||
      item.nome_grupo ||
      item.nome ||
      "Outros";


    if (!grupos[descricao]) {

      grupos[descricao] = {
        descricao,
        estabelecimentos: [],
      };

    }


    if (Array.isArray(item.estabelecimentos)) {

      grupos[descricao].estabelecimentos.push(
        ...item.estabelecimentos
      );

    } else if (Array.isArray(item.itens)) {

      grupos[descricao].estabelecimentos.push(
        ...item.itens
      );

    } else if (Array.isArray(item.lista)) {

      grupos[descricao].estabelecimentos.push(
        ...item.lista
      );

    } else {

      grupos[descricao].estabelecimentos.push(item);

    }

  });


  return Object.values(grupos);

}



function ehDestaquePraVoce(descricao) {

  const texto =
    normalizarTexto(descricao);


  return (
   texto.includes("para voce") ||
    texto.includes("destaque")
  );

}



function ehEntregaGratis(descricao) {

  const texto =
    normalizarTexto(descricao);


  return texto.includes("entrega gratis");

}



function montarUrlImagemEstabelecimento(item, baseURL) {

  const imagem =
    item.url_imagem ||
    item.url_foto ||
    item.foto;


  if (!imagem) {

    return IMAGEM_PADRAO_ESTABELECIMENTO;

  }


  if (imagem.startsWith("http")) {

    return imagem;

  }


  return `${baseURL}${imagem}`;

}



function renderEstabelecimentos(lista = [], keyPrefix) {

  if (lista.length === 0) {

    return (
      <Estabelecimento
        url_imagem={IMAGEM_PADRAO_ESTABELECIMENTO}
        nome="McDonald's"
        avaliacao="4.5"
        categoria="Lanches"
      />
    );

  }


  return lista.map((item, index) => (

    <Estabelecimento
      key={`${keyPrefix}-${item.id_estabelecimento || index}`}
      // url_imagem={IMAGEM_PADRAO_ESTABELECIMENTO}
      url_imagem={
        montarUrlImagemEstabelecimento(
          item,
          api.defaults.baseURL
       )
      }
      nome={
        item.nome || "McDonald's"
      }
      avaliacao={
        item.avaliacao || "4.5"
      }
      categoria={
        item.categoria ||
        item.nome_categoria ||
        "Lanches"
      }
    />

  ));

}

export default function Home() {

  const [categorias, setCategorias] = useState([]);
  const [banners, setBanners] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [entregasGratis, setEntregasGratis] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function carregarDados() {

      const codCidade =
        localStorage.getItem("sessionCodCidade") || 1;



      // CATEGORIAS

      try {

        const response =
          await api.get(
            `v1/categorias?cod_cidade=${codCidade}`
          );


        const dados =
          normalizarLista(response);


        setCategorias(
          dados.length > 0
            ? dados
            : CATEGORIAS_FAKE
        );


      } catch(error) {

        console.log(
          "Erro categorias:",
          error
        );

        setCategorias(
          CATEGORIAS_FAKE
        );

      }



      // BANNERS

      try {

        const response =
          await api.get(
            `v1/banners?cod_cidade=${codCidade}`
          );


        const dados =
          normalizarLista(response);


        setBanners(
          dados.length > 0
            ? dados
            : BANNERS_FAKE
        );


      } catch(error) {

        console.log(
          "Erro banners:",
          error
        );

        setBanners(
          BANNERS_FAKE
        );

      }



      // DESTAQUES

      try {

        const response =
          await api.get(
            `v1/destaques?cod_cidade=${codCidade}`
          );

          let gruposUnico =  response.data.map(grupo => grupo.descricao);
           gruposUnico = gruposUnico.filter((itemArray, i, arrayCompleto) => {
          return arrayCompleto.indexOf(itemArray) === i;
           })

           // removido: chamada incorreta

           setGrupos(grupos);
           setDestaques(response.data);
          

        console.log(
          "RETORNO API DESTAQUES:",
          response.data
        );


        const gruposProcessados =
          processarGruposDestaques(response);



        const listaDestaques =
          gruposProcessados
            .filter((grupo) =>
              ehDestaquePraVoce(
                grupo.descricao
              )
            )
            .flatMap((grupo) =>
              grupo.estabelecimentos
            );



        const listaGratis =
          gruposProcessados
            .filter((grupo) =>
              ehEntregaGratis(
                grupo.descricao
              )
            )
            .flatMap((grupo) =>
              grupo.estabelecimentos
            );



        const outrosGrupos =
          gruposProcessados.filter(
            (grupo) =>
              grupo.estabelecimentos.length > 0 &&
              !ehDestaquePraVoce(
                grupo.descricao
              ) &&
              !ehEntregaGratis(
                grupo.descricao
              )
          );



        setDestaques(
          listaDestaques
        );


        setEntregasGratis(
          listaGratis
        );


        setGrupos(
          outrosGrupos
        );



      } catch(error) {

        console.log(
          "Erro destaques:",
          error
        );

        setDestaques([]);
        setEntregasGratis([]);
        setGrupos([]);

      }



      setLoading(false);

    }



    carregarDados();

  }, []);




  return (

    <>

      <NavBar />


      <div className="home-wrap container-fluid">


        <div className="categorias-topo row">

          {
            loading ? (

              <p>
                Carregando...
              </p>

            ) : (

              categorias.map(
                (categoria) => (

                  <Categoria

                    key={
                      categoria.id_categoria
                    }

                    id_categoria={
                      categoria.id_categoria
                    }

                    descricao={
                      categoria.nome ||
                      categoria.descricao
                    }

                    url_imagem={
                      categoria.url_foto ||
                      categoria.url_imagem
                    }

                  />

                )
              )

            )

          }

        </div>




        <div className="row banners-row mt-4 mb-5">

          {
            (banners.length > 0
              ? banners
              : BANNERS_FAKE
            )
            .map(
              (banner) => (

                <div
                  className="col-auto"
                  key={
                    banner.id_banner
                  }
                >

                  <Banner

                    id_banner={
                      banner.id_banner
                    }

                    descricao={
                      banner.descricao
                    }

                    url_imagem={
                      banner.foto ||
                      banner.url_imagem ||
                      banner.url_foto
                    }

                  />

                </div>

              )
            )

          }

        </div>



      

        
        <div className="row mt-5 m-2">

          <h4>
            Destaque: Pra Você
          </h4>

          {
            renderEstabelecimentos(
              destaques,
              "destaque"
            )
          }

        </div>
       




        <div className="row mt-5 m-2">

          <h4>
            Entrega Grátis
          </h4>

          {
            renderEstabelecimentos(
              entregasGratis,
              "gratis"
            )
          }

        </div>



       

        {
          grupos.map(
            (grupo, index) => (

              <div

                className="row mt-5 m-2"

                key={
                  `grupo-${grupo.descricao || index}`
                }

              >

                <h4>
                  {grupo.descricao}
                </h4>


                {
                  destaques.map(destaque =>{
                    return  destaque.descricao === grupo ?
                    <Estabelecimento
                      key={destaque.id_estabelecimento}
                      id_estabelecimento={destaque.id_estabelecimento}
                      nome={destaque.nome}
                      avaliacao={destaque.avaliacao}
                      categoria={destaque.categoria}
                      descricao={destaque.descricao}
                      url_imagem={destaque.url_logo}
                    />:null
                  })
                 
                }


              </div>

            )
          )
        }





        <Footer />

      </div>

    </>

  );

}