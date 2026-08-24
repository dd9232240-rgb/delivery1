import { http, HttpResponse } from "msw";

const cardapios = {
  1: [
    {
      id_produto: 1,
      nome: "X-Burger",
      descricao: "Hambúrguer artesanal com queijo e molho especial",
      preco: 25.9,
      categoria: "Hambúrgueres",
      foto: "",
    },
    {
      id_produto: 2,
      nome: "X-Salada",
      descricao: "Hambúrguer, queijo, alface, tomate e maionese",
      preco: 28.9,
      categoria: "Hambúrgueres",
      foto: "",
    },
    {
      id_produto: 3,
      nome: "Batata Frita",
      descricao: "Porção de batatas fritas crocantes",
      preco: 15.9,
      categoria: "Porções",
      foto: "",
    },
    {
      id_produto: 4,
      nome: "Onion Rings",
      descricao: "Anéis de cebola empanados e crocantes",
      preco: 18.9,
      categoria: "Porções",
      foto: "",
    },
    {
      id_produto: 5,
      nome: "Coca-Cola",
      descricao: "Refrigerante Coca-Cola lata 350ml",
      preco: 6.0,
      categoria: "Bebidas",
      foto: "",
    },
    {
      id_produto: 6,
      nome: "Guaraná",
      descricao: "Refrigerante Guaraná Antarctica lata 350ml",
      preco: 6.0,
      categoria: "Bebidas",
      foto: "",
    },
  ],

  2: [
    {
      id_produto: 7,
      nome: "Croissant",
      descricao: "Croissant tradicional amanteigado",
      preco: 12.9,
      categoria: "Cafeteria",
      foto: "",
    },
    {
      id_produto: 8,
      nome: "Café Expresso",
      descricao: "Café expresso tradicional",
      preco: 7.5,
      categoria: "Cafeteria",
      foto: "",
    },
    {
      id_produto: 9,
      nome: "Bolo de Chocolate",
      descricao: "Fatia de bolo de chocolate com cobertura",
      preco: 14.9,
      categoria: "Doces",
      foto: "",
    },
    {
      id_produto: 10,
      nome: "Cheesecake",
      descricao: "Cheesecake artesanal",
      preco: 16.9,
      categoria: "Doces",
      foto: "",
    },
  ],

  3: [
    {
      id_produto: 11,
      nome: "Whopper",
      descricao: "Hambúrguer clássico com carne bovina, queijo e molho",
      preco: 32.9,
      categoria: "Hambúrgueres",
      foto: "",
    },
    {
      id_produto: 12,
      nome: "Cheeseburger",
      descricao: "Hambúrguer com queijo e molho especial",
      preco: 19.9,
      categoria: "Hambúrgueres",
      foto: "",
    },
    {
      id_produto: 13,
      nome: "Batata Frita",
      descricao: "Batatas fritas crocantes",
      preco: 12.9,
      categoria: "Acompanhamentos",
      foto: "",
    },
    {
      id_produto: 14,
      nome: "Refrigerante",
      descricao: "Refrigerante lata 350ml",
      preco: 6.5,
      categoria: "Bebidas",
      foto: "",
    },
  ],
};

export const cardapiosHandlers = [
  http.get("http://localhost:3000/api/v1/cardapios/:id", ({ params }) => {
    const id = Number(params.id);

    const resultado = cardapios[id] || [];

    return HttpResponse.json(resultado);
  }),
];
