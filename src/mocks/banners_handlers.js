import { http, HttpResponse } from "msw";

const banners = [
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

export const bannersHandlers = [
  http.get("http://localhost:3000/api/v1/banners", ({ request }) => {
    const url = new URL(request.url);

    const codCidade = Number(url.searchParams.get("cod_cidade"));

    const resultado = banners.filter(
      banner => banner.cod_cidade === codCidade
    );

    return HttpResponse.json(resultado);
  }),
];