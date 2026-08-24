import "./style.css";

function Categoria({ url_imagem, nome }) {
  return (
    <div className="categoria-card">
      <div
        className="categoria-img"
        style={{
          backgroundImage: `url(${url_imagem})`,
        }}
      ></div>
      <span className="categoria-nome">{nome || "Categoria"}</span>
    </div>
  );
}

export default Categoria;
