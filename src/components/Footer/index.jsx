import './style.css'

function Footer (){
       const ano = new Date().getFullYear();

    return <div className="row footer border-top mt-5">
      <div className="col-12 mt-4 ms-3">
      <p className="copyright">
        Copyright O {ano} Dev Point - Todos os direitos reservados.
      </p>
      </div>
    </div>
}

export default Footer;