import React from 'react';
import NavBar from '../../../components/Navbar';
import Endereco from '../../../components/endereco/lista';

function Enderecos() {
  return (
    <div className="container-fluid mt-page">
      <NavBar />

      <div className="row">
        <div className="col-lg-6 offset-lg-3">

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h2 className="mb-0">Meus Endereços</h2>

            <button className="btn btn-sm btn-outline-danger ms-2">
              Adicionar Endereço
            </button>
          </div>

          <div className="row mt-5">
            {[1, 2, 3, 4].map((endereco) => (
              <Endereco key={endereco}/>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Enderecos;
