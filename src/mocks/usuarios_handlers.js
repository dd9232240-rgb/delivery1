import { http, HttpResponse } from "msw";
import { db } from "./db";

export const usuariosHandlers = [
  http.post("/v1/usuarios/registro", async ({ request }) => {
    const body = await request.json();

    const {
      nome,
      email,
      senha,
      endereco,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      cod_cidade,
    } = body;

    // validações
    if (!nome || !email || !senha) {
      return HttpResponse.json(
        {
          message: "Campos obrigatórios não informados.",
        },
        {
          status: 400,
        }
      );
    }

    // email já cadastrado
    const usuario = db.usuarios.find(u => u.email === email);

    if (usuario) {
      return HttpResponse.json(
        {
          message: "E-mail já cadastrado.",
        },
        {
          status: 409,
        }
      );
    }

    const novoUsuario = {
      id: crypto.randomUUID(),
      nome,
      email,
      senha,
      endereco,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      cod_cidade,
      created_at: new Date().toISOString(),
    };

    db.usuarios.push(novoUsuario);

    return HttpResponse.json(
      {
        message: "Usuário cadastrado com sucesso.",
        usuario: novoUsuario,
      },
      {
        status: 201,
      }
    );
  }),
];