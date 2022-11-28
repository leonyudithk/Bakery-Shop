let detalleMostrar= document.getElementById('detalle')

export const detalle = (data)=>{
    detalleMostrar.innerHTML= ''
    detalleMostrar.inert += `
    <center>
            <div style="margin:10%;">
                    <div>
                        <h1 >${data.nombre}</h1>
                    </div>
                    <img src="${data.imagen}" class="rounded" alt="..." style="width:92%;">
                    <h3>${data.categoria} </h3>
                    <div>
                        <p>${data.descripcion}</p>
                        <h3>Precio: ${data.precio}</h3>
                    </div>
         </div>
        </center>
        
    `
}
detalle()