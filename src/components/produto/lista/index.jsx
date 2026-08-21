import "./style.css";

function Produto() {
  return (
    <div className="col-sm-6 mb-3 p-4 produto-lista">
      <a href="/">
        <div className="row p-3 ps-0 border-bottom">
          <div className="col-3">
            <img
              className="img-fluid rounded"
              src="https://recipesblob.oetker.com.br/assets/fa238f6f683d4e8aa6260db042e82f73/750x910/pizza-caseira-lucas-alencar.webp"
              alt="Produto" />
          </div>

          <div className="col-9">
             <small className="d-block"><b>Pizza 4 queijos</b></small>
              <small className="d-block">Calabresa (linguiça, cebola, queijo), Marguerita (tomate, muçarela, manjericão) e Portuguesa (presunto, ovos, cebola, azeitona, queijo), além de brasileirismos como Frango com Catupiry.</small>
               <small className="d-inline-block mt-3 text-sucess">R$45,00</small>
               <small className="d-inline-block ms-4  mt-3 preco-antigo">R$60,00</small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Produto;
