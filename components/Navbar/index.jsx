import { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function NavBar({ openSidebar }) {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const realizarBusca = () => {
    const termo = busca.trim();

    if (termo === "") {
      return;
    }

    navigate(`/busca?q=${encodeURIComponent(termo)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      realizarBusca();
    }
  };

  const handleOpenSidebar = () => {
    window.dispatchEvent(new CustomEvent("openSidebar"));

    if (openSidebar) {
      openSidebar();
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ps-3 pe-3">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Logo"
            className="mt-1"
          />
        </Link>

        {/* BOTÃO MENU MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTEÚDO DA NAVBAR */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* BUSCA */}
          <div className="mx-auto mt-2 mt-lg-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Procurar Restaurante"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                type="button"
                className="btn btn-danger"
                onClick={realizarBusca}
              >
                <i className="fa-solid fa-magnifying-glass me-1"></i>
                Buscar
              </button>
            </div>
          </div>

          {/* AÇÕES DO USUÁRIO */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">

            {/* LOCALIZAÇÃO */}
            <button
              type="button"
              className="btn btn-outline-danger me-3"
            >
              <i className="fas fa-map-marker-alt me-1"></i>
              Entrega: São Paulo
            </button>

            {/* USUÁRIO */}
            <div className="dropdown me-3">
              <button
                type="button"
                className="btn btn-outline-danger dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link to="/pedidos" className="dropdown-item">
                    Pedidos
                  </Link>
                </li>

                <li>
                  <Link to="/favoritos" className="dropdown-item">
                    Favoritos
                  </Link>
                </li>

                <li>
                  <Link to="/perfil" className="dropdown-item">
                    Perfil
                  </Link>
                </li>

                <li>
                  <Link to="/enderecos" className="dropdown-item">
                    Meus Endereços
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link to="/" className="dropdown-item">
                    Sair
                  </Link>
                </li>
              </ul>
            </div>

            {/* SACOLA */}
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleOpenSidebar}
            >
              <i className="fas fa-shopping-bag me-1"></i>
              Sacola
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;