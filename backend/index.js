const express = require('express');
const app = express();
const cors= require('cors');
const products = require('./routes/products');






// Middlewares
app.use(cors())
app.use(express.json());
app.use('/products', products); 


// Levantamiento del servidor
app.set("port", 4000);
app.listen(app.get("port"), () => {
    console.clear();
    console.log(`Servidor corriendo en el puerto ${app.get("port")}`)
})