import { Postres } from "./ArrayPostres.js";

const mostrarPostre = document.getElementById("mostrarPostre");

const pintarPostre = () => {
  Postres.forEach((postre) => {
    console.log(postre);
    mostrarPostre.innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${postre.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${postre.nombre}</h5>
        <h6>${postre.precio}</h6>
        <a href="#" class="card-link">Detalle</a>

        </div>
    </div>
    </div>
        
    `;
  });
};
pintarPostre();
