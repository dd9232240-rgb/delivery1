import NavBar from "../../../components/Navbar";

function Perfil() {
  return (
    <div className="container-fluid mt-page">
      <NavBar />

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="row mb-4">
            <h3>Meu Perfil</h3>
          </div>

          <div className="row">
            <form>
              {/* Nome */}
              <div className="mb-3">
                <label htmlFor="InputNome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="InputNome"
                  aria-label="nome"
                />
              </div>

              {/* E-mail */}
              <div className="mb-5">
                <label htmlFor="InputEmail" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail"
                  aria-label="email"
                />
              </div>

              {/* Botão Salvar */}
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-lg btn-danger">
                  Salvar Dados
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
