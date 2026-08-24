import NavBar from "../../../components/Navbar";
import Pedido from "../../../components/pedido";

function Pedidos() {
  return (
    <div className="container-fluid mt-page">
      <NavBar />

      <div className="row">
        <div className="col-lg-8 offset-lg-2">

          <div className="col-12 mt-4">
            <h2 className="mt-2">Meus Pedidos</h2>
          </div>

          <div className="row mt-5">
            {[1, 2, 3, 4].map((pedido) => (
              <div className="col-12 mb-3" key={pedido}>
                <Pedido
                  url_imagem="https://i.pinimg.com/564x/09/8a/40/098a40582c174c0a6f8b7eecc3259a47.jpg"/>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pedidos;
