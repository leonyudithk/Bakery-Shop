import { getUrl } from "./get.js"

const url = 'http://localhost:5000/carrito/'

const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const itemss = document.getElementById('itemss')
const footer = document.getElementById('footer-Total')

document.addEventListener('DOMContentLoaded', ()=>{
    pintarCarrito(url)
})

 export const pintarCarrito =async (url) =>{
    let comprar = await getUrl(url)
     itemss.innerHTML=''
        Object.values(comprar).forEach(boton =>{
            templateCarrito.querySelector('th').textContent = boton.id;
            templateCarrito.querySelectorAll('td')[0].textContent = boton.nombre;
            templateCarrito.querySelectorAll('td')[1].textContent = boton.cantidad
            templateCarrito.querySelector('span').textContent = boton.cantidad*boton.precio
             const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    itemss.appendChild(fragment)

    pintarFooter(comprar)
}


const pintarFooter=(comprar)=>{
    footer.innerHTML= ''
    if(Object.keys(comprar).length ===0)
    {
        footer.innerHTML=`
        <th scope="row" colspan="5">Sin Orden de Postres!</th>
        `
    }
   //calculando la suma total de las cantidades con nCant y la suma total a pagar con Nprecio
    const nCant = Object.values(comprar).reduce((acum, {cantidad})=> acum + cantidad, 0)
    const nPrecio = Object.values(comprar).reduce((acc, {cantidad, precio}) => acc + cantidad*precio,0) 
    console.log(nCant, nPrecio)


    //enviando a pintar en mi tabla en el template-footer
    templateFooter.querySelectorAll('td')[0].textContent = nCant
    templateFooter.querySelector('span').textContent = nPrecio
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)


    // vaciar o limpiar mi compra
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', async () => {
        swal({
            title: "Bakery shop!",
            text: "Borraremos la Orden de compra",
            icon: "error",
            button: "Ok",
          });

        await comprar.forEach(v =>{
         //===================Click en Delete=====================================//
        fetch(url + v.id, {
               method: "DELETE",
         });
        })     
      
         pintarCarrito(url)
    })

    const botonPagar = document.querySelector('#pagar')
    botonPagar.addEventListener('click', () => {
        comprar = {}
       Gracias()
    })
}

const Gracias =()=>{
    swal({
        title: "Bakery shop!",
        text: "Te da las gracias por su compra. Que los Disfrute!",
        icon: "success",
        button: "Ok",
      });
}
