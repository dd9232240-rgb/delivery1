import { usuariosHandlers } from "./usuarios_handlers";
import { bannersHandlers } from "./banners_handlers";
import { destaquesHandlers } from "./destaques_handlers";
import { categoriasHandlers } from "./categorias_handlers";
import { estabelecimentoHandlers } from "./estabelecimento_handlers";
import { cardapiosHandlers } from "./cardapios_handlers";

export const handlers = [
  ...usuariosHandlers,
  ...bannersHandlers,
  ...destaquesHandlers,
  ...categoriasHandlers,
  ...estabelecimentoHandlers,
  ...cardapiosHandlers,
];
