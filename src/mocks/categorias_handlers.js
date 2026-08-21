import { http, HttpResponse } from "msw";

const categorias = [
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
]

export const categoriasHandlers = [
  http.get(
    "http://localhost:3000/api/v1/categorias",
    ({ request }) => {
      const url = new URL(request.url);

      const codCidade = Number(
        url.searchParams.get("cod_cidade")
      );

      if (!codCidade) {
        return HttpResponse.json(
          {
            message: "Código da cidade é obrigatório.",
          },
          {
            status: 400,
          }
        );
      }

      const resultado = categorias.filter(
        (categoria) =>
          categoria.cod_cidade === codCidade
      );

      return HttpResponse.json(resultado);
    }
  ),
];