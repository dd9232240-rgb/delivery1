import { Link } from "react-router-dom";
import "./style.css";

function Banner(props) {
  return (
    <Link
      to={`/busca?id_banner=${props.id_banner}&descr=${props.descricao}`}
    >
      <div className="banner">
        <img
          className="img-banner"
          src={
            props.url_imagem ||
            "https://via.placeholder.com/300x150.png?text=Banner"
          }
          alt="Banner"
        />
      </div>
    </Link>
  );
}

export default Banner;