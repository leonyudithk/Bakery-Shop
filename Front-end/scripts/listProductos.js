import { getUrl } from "./get.js";

const mostrarPostre = document.getElementById("listarPostre");
let accionTabla = document.querySelector("tbody");
const modalPostre = document.getElementById("modal-content");

const url = "http://localhost:4000/products/";

document.addEventListener("DOMContentLoaded", () => {
  ListarPostre(url);
});

//===================LIST POSTRE=================================================//
export const ListarPostre = async (url) => {
  let postres = await getUrl(url);
  mostrarPostre.innerHTML = "";
  postres.forEach((postre) => {
    mostrarPostre.innerHTML += `
    <tr>
    <td>${postre.id}</td>
    <td>${postre.nombre}</td>
    <td>${postre.precio}</td>
    <td>${postre.categoria}</td>
    <td> <img src="${postre.imagen}"  alt="..." style="width:70px"></td>
    <td>
    <button  id=${postre.id}  class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    <button  id=${postre.id}  class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Cant</button>
    <button  id=${postre.id}  class="btn btn-danger">X</button>
    </td>
     
  </tr>
         
    `;
  });
};

//===================Click en Delete=====================================//
accionTabla.addEventListener("click", async (e) => {
  console.log(e);
  const btnDelete = e.target.classList.contains("btn-danger");
  const id = e.target.id;
  console.log(btnDelete, id);
  console.log(`la nueva ruta es ${url}:${id}`);
  if (btnDelete) {
    await fetch(url + id, {
      method: "DELETE",
    });
    swal({
      title: "Postre",
      text: "Eliminado de la Base de Dato",
      icon: "error",
      button: "Listo",
    });
  }
});

//===================Click en Editar=====================================//
accionTabla.addEventListener("click", async (e) => {
  console.log(e);
  const btnEdit = e.target.classList.contains("btn-info");
  const id = e.target.id;
  let data = await getUrl(url + id);
  console.log(btnEdit, id, data.descripcion, data.nombre);
  if (btnEdit) {
    modalPostre.innerHTML = "";
    modalPostre.innerHTML += `
     <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${data.nombre}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form id="formulario" style="margin:3%;">
        <div class="campo">
            <label for="name" class="form-label body1Regular label-edit">Nombre del producto</label>
            <input id="name" name="name" class="edit form-control" type="text" value=${data.nombre}>
        </div>
        <div class="campo">
            <label for="descrip" class="form-label body1Regular label-edit">Descripción</label>
            <input id="descrip" name="descrip" class="edit form-control" type="text" value=${data.descripcion}>
        </div>
        <div class="campo">
            <label for="precio"  class="form-label body1Regular label-edit">Precio</label>
            <input id="precio" name="precio" class="edit form-control" type="number" value=${data.precio}>
        </div>
        <div class="campo">
            <label for="num_unidad"  class="form-label body1Regular label-edit">Número de Unidades</label>
            <input id="num_unidad" name="num_unidad" class="edit form-control" type="number" value=${data.numUnidades} readonly>
        </div>
        <div class="campo">
            <label for="categoria"  class="form-label body1Regular label-edit">Categoria</label>
            <input id="categoria" name="categoria" class="edit form-control" type="text" placeholder="galletas ó tortas ó muffins" value=${data.categoria}>
        </div>
        <div class="campo">
            <label for="foto" class="form-label body1Regular label-edit">Imagen </label>
            <input id="foto" name="foto" class="edit form-control" type="text" placeholder="Ingresar Url de la imagen .jpg" value=${data.imagen}>
        </div>
        <button id="${data.id}" type="submit" class="btn btnModificar btn-info" data-bs-dismiss="modal">Guardar</button>   
        </form>
        </div>
    
      `;

    modalPostre.addEventListener("submit", async (e) => {
      e.preventDefault();
      let nombre = e.target.name.value;
      let descripcion = e.target.descrip.value;
      let precio = e.target.precio.value;
      let categoria = e.target.categoria.value;
      let imagen = e.target.foto.value;
      let numUnidades = e.target.num_unidad.value;

      console.log(nombre, descripcion, precio, categoria, imagen, numUnidades);
      console.log(`${url}num_unidades/${id}`);
      let enviar = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify({
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          categoria: categoria,
          imagen: imagen,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      let data = await enviar.json();
    });
  }
});

//===================Click en Editar Num de Unidades=====================================//
accionTabla.addEventListener("click", async (e) => {
  console.log(e);
  const btnCant = e.target.classList.contains("btn-success");
  const id = e.target.id;
  let data = await getUrl(url + id);
  console.log(btnCant, id, data.descripcion, data.nombre);

  if (btnCant) {
    modalPostre.innerHTML = "";
    modalPostre.innerHTML += `
     <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${data.nombre}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form id="formulario" style="margin:3%;">
     
        <div class="campo">
            <label for="num_unidad"  class="form-label body1Regular label-edit" >Número de Unidades</label>
            <input id="num_unidad" name="num_unidad" class="edit form-control" type="number" value=${data.numUnidades} >
        </div>
        
        <button id="${data.id}" type="submit" class="btn btnModificar btn-info" data-bs-dismiss="modal">Guardar</button>   
        </form>
        </div>
    
      `;

    modalPostre.addEventListener("submit", async (e) => {
      e.preventDefault();
      let numUnidades = e.target.num_unidad.value;
      console.log(numUnidades);
      console.log(`${url}num_unidades/${id}`);

      let enviar = await fetch(`${url}num_unidades/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          numUnidades: numUnidades,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      let data = await enviar.json();
    });
  }
});
