import { ListarPostre } from "./listProductos.js";

let formulario = document.getElementById('formulario');

const mostrarPostre = document.getElementById("listarPostre");
const url = "http://localhost:4000/products";

window.addEventListener('DOMContentLoaded', async () => {
   ListarPostre(url)  
})

//===================ADD POSTRE=================================================//
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    let nombre = document.getElementById('name').value;
    let descripcion = document.getElementById('descrip').value;
    let precio = document.getElementById('precio').value;
    let numUnidades = document.getElementById('num_unidad').value;
    let categoria = document.getElementById('categoria').value; 
    let imagen = document.getElementById('foto').value;
   
    let resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            descripcion : descripcion,
            precio : precio,
            numUnidades: numUnidades,
            categoria: categoria,
            imagen: imagen
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        //mode: 'no-cors'
    })
    let data = await resp.json();
       
})

