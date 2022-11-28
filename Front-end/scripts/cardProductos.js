import { getUrl } from "./get.js";

const cantidadCarrito = document.getElementsByClassName("offcanvas-body")
const mostrarPostre = document.getElementById("mostrarPostre");
const modalPostre = document.getElementById("modal-content");

const url = "http://localhost:4000/products/";
const urlCarrito = 'http://localhost:5000/carrito/';
document.addEventListener("DOMContentLoaded", () => {
  pintarPostre(url);
  mostrarPostre.addEventListener("click", (e) => {
    addcomprar(e);
  });
});
//=====================PINTAR LAS CARD DE LOS POSTRES=============================================//
const pintarPostre = async (url) => {
  let postres = await getUrl(url);
  postres.forEach((postre) => {
    mostrarPostre.innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${postre.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${postre.nombre}</h5>
        <h6>${postre.precio}</h6>
        <button  id=${postre.id} class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver</button>
        <button  id=${postre.id} class="btn btn-danger" onclick="addcomprar()">Comprar</button>
              </div>
    </div>
    </div>
      
    `;
  });
  //===================Click en Ver Detalle de Producto=====================================//
  mostrarPostre.addEventListener("click", async (e) => {
    const btnVer = e.target.classList.contains("btn-warning");
    const id = e.target.id;
    let data = await getUrl(url + id);
    if (btnVer) {
      modalPostre.innerHTML = "";
      modalPostre.innerHTML += `
      <div class="modal-header">
           <h1 class="modal-title fs-5" id="exampleModalLabel">${data.nombre}</h1>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <div class="text-center">
            <img src="${data.imagen}" class="rounded" alt="..." style="width:92%;">
            <h3>${data.categoria} </h3>
        </div>
        <div>
            <p>${data.descripcion}</p>
            <h3>Precio:  ${data.precio}</h3>
        </div>
       
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cancelar</button>
      
         </div>
       `;
    }
  });
};
  //===================Agregar Postre al Carrito=====================================//

const addcomprar = async (e) => {
  const btnComprar = e.target.classList.contains("btn-danger");
    if (btnComprar) {
      const id = e.target.id;
      let data = await getUrl(url + id);
     await addOrden(data)
     
    }
   
};

const addOrden =async(data)=>{

    let traerCarrito= await getUrl(urlCarrito)
    let id= data.id
    //buscar si ya esta agregado
    let buscarId = await traerCarrito.filter(encontre => id === encontre.id)
         //Si lo encuentro 
          if( buscarId.length>0){
                let cant = buscarId[0].cantidad +1
                let resp = await fetch(urlCarrito+id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        precio: data.precio,
                        nombre: data.nombre,
                        cantidad: cant,
                    }),
                    headers: {
                      "Content-Type": "application/json; charset=UTF-8",
                    },
                  });
                  let dataCarrito = await resp.json();

          }
          else
          if(buscarId.length==0)
          {
            let resp = await fetch(urlCarrito, {
              method: 'POST',
              body: JSON.stringify({
                id: data.id,
                precio: data.precio,
                nombre: data.nombre,
                cantidad: 1,
              }),
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
            });
            let dataCarrito = await resp.json();
          }
    
    //----------------------------/
    swal({
      title: "Postre",
      text: "Agregado a la Orden de Compra",
      icon: "success",
      button: "Listo",
    });
}

