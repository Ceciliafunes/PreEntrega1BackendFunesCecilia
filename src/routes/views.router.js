const express = require("express");
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

router.get("/products", async (req, res) => {
    try {
        const productos = await manager.getProducts();
        res.render("home", {productos});
    } catch (error) {
        console.error("error el obtener los productos", error);
        res.status(500).json({error: "Error interno del servidor"});
    } 
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        const productos = await manager.getProducts();
        res.render("realtimeproducts", {productos})
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


module.exports = router;