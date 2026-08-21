import NavBar from "../../../components/Navbar"
import Estabelecimento from "../../../components/estabelecimento"

function Favoritos (){
 return <div className="container-fluid mt-page">
<NavBar />

<div className="row col-lg-8 offset-2">

<div className="row m-2">
    <h3>Meus Favoritos</h3>
</div>

<div className="row m-2">
  {
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(estabelecimento => {
      return <Estabelecimento
      key ={estabelecimento} 
       url_imagem="https://thumbs.dreamstime.com/b/mcdonalds-vetor-de-logotipo-pronto-para-imprimir-desenho-do-ave-falc%C3%A3o-dourado-em-fundo-branco-182834292.jpg"
nome="McDonald's" 
avaliacao="4.5" 
categoria="Pizza"
btnRemoverFavorito />
    })
  }
</div>
</div>
 </div>
}

export default Favoritos