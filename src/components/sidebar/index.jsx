import { useState, useEffect } from "react";
import { Dock } from "react-dock";
import Produto from "../produto/sacola";
import "./style.css";

function SideBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const openSidebar = () => setShow(true);

    window.addEventListener("openSidebar", openSidebar);

    return () => {
      window.removeEventListener("openSidebar", openSidebar);
    };
  }, []);

  return (
    <Dock
      position="right"
      isVisible={show}
      size={0.35}              // 🔴 ESSENCIAL
      dimMode="none"
      onVisibleChange={setShow}
    >
      <div className="container-fluid h-100 pt-4 sidebar">
        <h5>Minha Sacola</h5>

       <div className="row produtos">
  {[1, 2, 3, 4, 5].map((item) => (
    <Produto
      key={item}
      nome="Pizza 4 Queijos"
      valor_total={80}
      qtd={2}
      valor_unit={40}
    />
  ))}
</div>

        <div className="row align-items-end footer">
          <div className="col-12 d-flex justify-content-between">
            <span>Subtotal</span>
            <span>R$45,00</span>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Cupom"
              />
              <button className="btn btn-outline-success">
                Aplicar
              </button>
            </div>

            <span className="text-success">- R$0,00</span>
          </div>

          <div className="col-12 d-flex justify-content-between mt-2">
            <span>Taxa de entrega</span>
            <span>R$5,00</span>
          </div>

          <div className="col-12 d-flex justify-content-between mt-3">
            <b>Total</b>
            <h3>R$150,00</h3>
          </div>

          <button className="btn btn-lg btn-danger rounded-0 btn-pedido">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </Dock>
  );
}

export default SideBar;
