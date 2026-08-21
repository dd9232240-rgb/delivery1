function Produto (props){
return <div className="col-12">
<div className="row p-3 ps-0 border-bottom">
     <div className="col-3">
       <img  className= "img-fluid rounded" src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D" alt="produto" />
     </div>

     <div className="col-9">
        <div className="d-flex justify-content-between align-items-center">
       <small>
        <b>{props.nome}</b>
       </small>
       <small>
        <b>{props.valor_total}</b>
       </small>
        </div>

        <small className="d-block">
         {props.qtd} X {props.valor_unit}
       </small>

       <button className="btn btn-sm btn-outline-danger mt-2">Remover</button>
     </div>
</div>
</div>
}

export default Produto