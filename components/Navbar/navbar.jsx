import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="navbar-top">
      {/* ESQUERDA (ex: logo / links) */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">Logo</Link>
      </div>

      {/* CENTRO (ex: busca) */}
      <div className="nav-center">
        <input className="nav-search" placeholder="Buscar..." />
      </div>

      {/* DIREITA (perfil) */}
      <div className="nav-right" ref={menuRef}>
        <button
          type="button"
          className="btn-perfil"
          onClick={() => setOpen((v) => !v)}
        >
          Perfil
        </button>

        <ul className={`dropdown-menu ${open ? "show" : ""}`}>
          <li><Link to="/favoritos" className="dropdown-item">Favoritos</Link></li>
          <li><Link to="/perfil" className="dropdown-item">Perfil</Link></li>
          <li><Link to="/enderecos" className="dropdown-item">Meus Endereços</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link to="/" className="dropdown-item">Sair</Link></li>
        </ul>
      </div>
    </nav>
  );
}
  