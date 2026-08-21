function Endereco() {
  return (
    <div className="col-12 pt-3 pb-3 border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <span className="d-block"><b>Av. Paulista, 1500 - Ap 62</b></span>
          <small className="d-block">Centro - São Paulo - SP</small>
          <small className="d-inline-block me-3">CEP: 05214-000</small>
          <small className=" d-inline-block text-danger">Endereço Principal</small>
        </div>

        <div>
          <button className="btn btn-outline-danger me-3 m-2">
            Editar
          </button>
          <button className="btn btn-danger m-2">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Endereco;
