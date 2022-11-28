const express = require('express');
const router = express.Router();

const mysqlConnection = require('../db/db');

// ================ GET GENERAL PARA TODOS LOS PRODUCTOS ================ //
router.get('/', (req, res) => {
    const query = "SELECT * FROM products";

    mysqlConnection.query(query, (err, rows, field) => {
        if (!err) {
            res.status(200).json(rows);
        } else {
            res.json(err);
        }
    })
});

// ================ GET PARA OBTENER UN PRODUCTO POR SU ID ================ //
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM products WHERE id = ?";
    const dataParams = [id];

    mysqlConnection.query(query, dataParams, (err, rows) => {

        if (!err) {

            if (rows.length > 0) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).json({
                    message: "Product not found"
                })
            }

        } else {
            res.json(err);
        }
    })
});

// ================ GET PARA OBTENER LOS PRODUCTOS DE UNA CATEGORIA ================ //
router.get('/by_category/:category', (req, res) => {
    const { category } = req.params;
    const query = "SELECT * FROM products WHERE categoria = ?";
    const dataParams = [category];

    if (!category) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        mysqlConnection.query(query, dataParams, (err, rows) => {
            if (!err) {

                if (rows.length > 0) {
                    res.status(200).json(rows);
                } else {
                    res.status(404).json({
                        message: "Category not found"
                    })
                }

            } else {
                res.json(rows);
            }
        })
    }
})


// ================ POST PARA CREAR UN PRODUCTO ================ //
router.post("/", (req, res) => {
    const { nombre, descripcion, precio, numUnidades, categoria, imagen } = req.body;
    const query = "INSERT INTO products(nombre, descripcion, precio, numUnidades, categoria, imagen) VALUES(?, ?, ?, ?, ?, ?)";
    const dataParams = [nombre, descripcion, precio, numUnidades, categoria, imagen];

    if (!nombre || !descripcion || !precio || !numUnidades || !categoria || !imagen) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        mysqlConnection.query(query, dataParams, (err, rows) => {
            if (!err) {
                res.status(200).json({
                    message: "Product created"
                })
            } else {
                return console.error(err.message);
            }
        })
    }
})

// ================ PUT PARA ACTUALIZAR UN PRODUCTO ================ //
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, imagen } = req.body;
    const query = "UPDATE products SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, imagen = ? WHERE id = ?";
    const dataParams = [nombre, descripcion, precio, categoria, imagen, id];

    if (!nombre || !descripcion || !precio || !categoria || !imagen || !id) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        mysqlConnection.query(query, dataParams, (err, rows) => {
            if (!err) {
                res.status(200).json({
                    message: "Product updated"
                })
            } else {
                return console.error(err);
            }
        })
    }
});

// ================ PUT PARA ACTUALIZAR EL NUMERO DE UNIDADES UN PRODUCTO ================ //
router.put("/num_unidades/:id", (req, res) => {
    const { id } = req.params;
    const { numUnidades } = req.body;
    const query = "UPDATE products SET numUnidades = ? WHERE id = ?";
    const dataParams = [numUnidades, id];

    if (!id || !numUnidades) {
        res.status(400).json({
            message: "Bad request"
        })
    } else {
        mysqlConnection.query(query, dataParams, (err, rows) => {
            if (!err) {
                res.status(200).json({
                    message: "Product updated"
                })
            } else {
                return console.error(err);
            }
        })
    }
})

// ================ DELETE PARA ELIMINAR UN PRODUCTO ================ //
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";
    const dataParams = [id]; 

    if(!id){
        res.status(400).json({
            message: "Bad request"
        })
    }else {
        mysqlConnection.query(query, dataParams, (err, rows) => {
            if (!err) {
                res.status(200).json({
                    message: "Removed product"
                })
            } else {
                return console.error(err);
            }
        })
    }
})






module.exports = router;