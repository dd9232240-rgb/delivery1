import { http, HttpResponse } from "msw";

const destaques = [
  {
    descricao: "Destaque",
    estabelecimentos: [
      {
      id: 1,
     url_imagem: "https://www.blackdog.com.br/wp-content/uploads/2023/11/logo.png",
     nome: "Black Dog",
     avaliacao: "3.0",
     categoria: "Lanches",
     cod_cidade: 1,
      },
      {
        id: 2,
        url_imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbtRhWCRDyAOsmIVfiXbx7ITL-VI9h6nAvbejsshCCw&s=10",
        nome: "MCDonald's",
        avaliacao: "4.0",
        categoria: "Lanches",
        cod_cidade: 1,
      },
      {
        id: 3,
        url_imagem: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Shopping-Taboao/Arquivos-Wise-It/Lojas-logos/20504122/516181.jpeg",
        nome: "Griletto",
        avaliacao: "3.9",
        categoria: "Lanches",
        cod_cidade: 1,
      },

      {
        id: 4,
        url_imagem: "https://www.londrinatur.com.br/wp-content/uploads/2020/11/coco-bambu-destaque-home.png",
        nome: "Coco Bambu",
        avaliacao: "4.3",
        categoria: "Pizzas",
        cod_cidade: 1,
      },
      {
        id: 5,
        url_imagem: "https://gkpb.com.br/wp-content/uploads/2021/02/novo-logo-habibs-2021.jpg",
        nome: "Habib's",
        avaliacao: "4.6",
        categoria: "Pizzas",
        cod_cidade: 1,
      },
    ],
  },
  {
    descricao: "entrega gratis",
    estabelecimentos: [
      {
        id: 1,
        url_imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLh91kSEBevN0-wnF7kb0KAxEPjLXlcffruxsqkRFtN1DFnRP0t6ZrBXo&s=10",
        nome: "Burger King",
        avaliacao: "3.5",
        categoria: "Lanches",
        cod_cidade: 1,
      },
      {
        id: 2,
        url_imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDnMx2vh1-5XhylUngeFCNkerdjsOvSE4mO_JPZnZp1i2jkip5av_rxDc&s=10",
        nome: "The Fifties",
        avaliacao: "4.9",
        categoria: "Lanches",
        cod_cidade: 1,
      },
    ],
  },
];

export const destaquesHandlers = [
  http.get(
    "http://localhost:3000/api/v1/destaques",
    ({ request }) => {
      const url = new URL(request.url);

      const codCidade = Number(
        url.searchParams.get("cod_cidade")
      );

      const resultado = destaques.filter((grupo) =>
        grupo.estabelecimentos.some(
          (item) => item.cod_cidade === codCidade
        )
      );

      return HttpResponse.json(resultado);
    }
  ),
];