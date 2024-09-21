const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

//listar todos los productos 

router.get("/", async(req, res) =>{
    let limit = req.query.limit;
    try{
        const arrayProductos = await manager.getProducts();

        if(limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//GET para traer productos por id

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;

    try {
        const productoBuscado = await manager.getProductById(parseInt(id));

        if (!productoBuscado) {
            res.send("Producto no encontrado");
        } else {
            res.send(productoBuscado);
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})

//Post para agregar producto

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).send("Producto agregado con exito");
    } catch(error) {
        res.status(500).send("Error del servidor");
    }
});

//PUT para actualizar producto por id
router.put("/:pid", async (req, res)=>{
    let id = req.params.pid;
    const productoActualizado = req.body;

    try {
        await manager.updateProduct(parseInt(id), productoActualizado);
        res.status(200).send("producto actualizado con exito")
    } catch (error) {
        console.log("error al intentar actualizar el producto", error);
        res.status(500).send("error del servidor")
    }
})
//DELETE para eliminar producto por id 
router.delete("/:pid", async (req, res) =>{
    let id = req.params.pid;

    try {
        await manager.deleteProduct(parseInt(id));
        res.status(204).send("producto eliminado correctamente")
    } catch (error) {
        console.log("Error al eliminar el producto", error);
        res.status(500).send("error del servidor");
    }
})

module.exports = router;