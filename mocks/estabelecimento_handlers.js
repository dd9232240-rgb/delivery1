import { http, HttpResponse } from "msw";

const estabelecimentos = [
  {
    id_estabelecimento: 1,
    nome: "Black Dog",
    categoria: "Lanches",
    avaliacao: 3.0,
    url_logo:
      "https://www.blackdog.com.br/wp-content/uploads/2023/11/logo.png",
  },
  {
    id_estabelecimento: 2,
    nome: "Bonjour Dona Helena",
    categoria: "2",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMDMNn9x6rXnHKF3hjCuARBEOxst6uy_3N9veN9V_WSdd2tCXm9uICjlc&s=10",
  },
  {
    id_estabelecimento: 3,
    nome: "Burguer King",
    categoria: "1",
    avaliacao: 3.5,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLh91kSEBevN0-wnF7kb0KAxEPjLXlcffruxsqkRFtN1DFnRP0t6ZrBXo&s=10",
  },
  {
    id_estabelecimento: 4,
    nome: "Coco Bambu",
    categoria: "Lanches",
    avaliacao: 4.3,
    url_logo:
      "https://www.londrinatur.com.br/wp-content/uploads/2020/11/coco-bambu-destaque-home.png",
  },
  {
    id_estabelecimento: 5,
    nome: "Empresa Teste",
    categoria: "Lanches",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 6,
    nome: "Empresa Teste 10",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 7,
    nome: "Empresa Teste 11",
    categoria: "1",
    avaliacao: 3.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 8,
    nome: "Empresa Teste 12",
    categoria: "1",
    avaliacao: 3.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 9,
    nome: "Empresa Teste 13",
    categoria: "1",
    avaliacao: 3.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 10,
    nome: "Empresa Teste 14",
    categoria: "1",
    avaliacao: 3.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 11,
    nome: "Empresa Teste 15",
    categoria: "1",
    avaliacao: 3.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 12,
    nome: "Empresa Teste 2",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 13,
    nome: "Empresa Teste 3",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 14,
    nome: "Empresa Teste 4",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 15,
    nome: "Empresa Teste 5",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbe79xHRliOt3jCZXUnh6xvEiLdwE1HaGy4nz4KzEG3XKynWnqBivD2Vbo&s=10",
  },
  {
    id_estabelecimento: 16,
    nome: "Empres Teste 6",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXxyxGsgbL34IlERWBR_lWByNwxTxFk9t3HM6ljmkdV3jMs-aZPzvlEW0jRxyBaCaag-aW1FFkwLnIue0UPXEDHoinajPje9gc4_FtsREQu93kqcidXN4qNZPeyy98QkJQAZ9B/s1600/mc+logos+4.jpg",
  },
  {
    id_estabelecimento: 17,
    nome: "Empresa Teste 7",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXxyxGsgbL34IlERWBR_lWByNwxTxFk9t3HM6ljmkdV3jMs-aZPzvlEW0jRxyBaCaag-aW1FFkwLnIue0UPXEDHoinajPje9gc4_FtsREQu93kqcidXN4qNZPeyy98QkJQAZ9B/s1600/mc+logos+4.jpg",
  },
  {
    id_estabelecimento: 18,
    nome: "Empresa Teste 8",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXxyxGsgbL34IlERWBR_lWByNwxTxFk9t3HM6ljmkdV3jMs-aZPzvlEW0jRxyBaCaag-aW1FFkwLnIue0UPXEDHoinajPje9gc4_FtsREQu93kqcidXN4qNZPeyy98QkJQAZ9B/s1600/mc+logos+4.jpg",
  },
  {
    id_estabelecimento: 19,
    nome: "Empresa Teste 9",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXxyxGsgbL34IlERWBR_lWByNwxTxFk9t3HM6ljmkdV3jMs-aZPzvlEW0jRxyBaCaag-aW1FFkwLnIue0UPXEDHoinajPje9gc4_FtsREQu93kqcidXN4qNZPeyy98QkJQAZ9B/s1600/mc+logos+4.jpg",
  },
  {
    id_estabelecimento: 20,
    nome: "Griletto",
    categoria: "1",
    avaliacao: 3.9,
    url_logo:
      "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Shopping-Taboao/Arquivos-Wise-It/Lojas-logos/20504122/516181.jpeg",
  },
  {
    id_estabelecimento: 21,
    nome: "Habib's",
    categoria: "1",
    avaliacao: 4.6,
    url_logo:
      "https://gkpb.com.br/wp-content/uploads/2021/02/novo-logo-habibs-2021.jpg",
  },
  {
    id_estabelecimento: 22,
    nome: "McDonald's",
    categoria: "1",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbtRhWCRDyAOsmIVfiXbx7ITL-VI9h6nAvbejsshCCw&s=10",
  },
  {
    id_estabelecimento: 23,
    nome: "Pizza Hut",
    categoria: "Pizza",
    avaliacao: 4.0,
    url_logo:
      "https://logosmarcas.net/wp-content/uploads/2021/10/Pizza-Hut-Logo-1999-2010.jpg",
  },
  {
    id_estabelecimento: 24,
    nome: "Poke House",
    categoria: "Saudável",
    avaliacao: 4.0,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF-9yECNH2mRdB60mLBE1hDCCGl2tOmuTJW8bN5wLIQ&s",
  },
  {
    id_estabelecimento: 25,
    nome: "Pop Vegan Food",
    categoria: "Saudável",
    avaliacao: 4.0,
    url_logo:
      "https://media.licdn.com/dms/image/v2/C4E0BAQEehnpt0FBrjg/company-logo_200_200/company-logo_200_200/0/1630619763714/pop_vegan_food_logo?e=2147483647&v=beta&t=VJ4H9Pmb13Wl7z8ch9F9Mrx4Ujr5tAhKbaGAu6B0d6E",
  },
  {
    id_estabelecimento: 26,
    nome: "Popeyes",
    categoria: "1",
    avaliacao: 4.4,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ap3FrTZVfq-qzJW8Rwqocc-U5J_Ul6IIVD131pvUuQ&s",
  },
  {
    id_estabelecimento: 27,
    nome: "The Fifties",
    categoria: "1",
    avaliacao: 4.9,
    url_logo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDnMx2vh1-5XhylUngeFCNkerdjsOvSE4mO_JPZnZp1i2jkip5av_rxDc&s=10",
  },
];

export const estabelecimentoHandlers = [
 http.get(
    "http://localhost:3000/api/v1/estabelecimentos/:id",
    ({ params }) => {
      const id = Number(params.id);

      const estabelecimento = estabelecimentos.find(
        (item) =>
          item.id_estabelecimento === id
      );

      // Se não encontrou
      if (!estabelecimento) {
        return HttpResponse.json(
          {
            message: "Estabelecimento não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      // Encontrou
      return HttpResponse.json({
        data: estabelecimento,
      });
    }
  ),

  http.get(
    "http://localhost:3000/api/v1/estabelecimentos",
    ({ request }) => {
      const url = new URL(request.url);

      const idCategoria =
        url.searchParams.get("id_categoria");

      const q = url.searchParams
        .get("q")
        ?.trim()
        .toLowerCase();

      let resultado = [...estabelecimentos];

      // Filtro por busca
      if (q) {
        resultado = resultado.filter((estabelecimento) =>
          estabelecimento.nome
            .toLowerCase()
            .includes(q)
        );
      }

      // Filtro por categoria
      if (idCategoria) {
        resultado = resultado.filter(
          (estabelecimento) =>
            estabelecimento.categoria ===
            idCategoria
        );
      }

      return HttpResponse.json({
        data: resultado,
      });
    }
  ),
];