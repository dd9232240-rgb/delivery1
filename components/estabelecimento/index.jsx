import "./style.css";
import Star from "../../assets/star.png";
import { Link } from "react-router-dom";

function Estabelecimento({
  id_estabelecimento,
  url_imagem,
  nome,
  avaliacao,
  categoria,
  btnRemoverFavorito,
}) {
  return (
    <div className="estabelecimento col-sm-6 col-md-4 col-lg-3 mb-3 p-2">
      <Link
        to={`/cardapio/${id_estabelecimento}`}
        className="text-decoration-none text-dark"
      >
        <div className="row align-items-center">
          <div className="col-3">
            <img
              className="img-estabelecimento"
              src={url_imagem}
              alt={`Logo ${nome}`}
            />
          </div>

          <div className="col-9 mt-2 ps-1">
            <span className="fw-bold">{nome}</span>

            <div className="avaliacao d-flex align-items-center gap-1">
              <img src={Star} alt="Avaliação" />
              <span>
                {Number(avaliacao).toFixed(1)} • {categoria}
              </span>
            </div>

            {btnRemoverFavorito && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  btnRemoverFavorito();
                }}
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Estabelecimento;