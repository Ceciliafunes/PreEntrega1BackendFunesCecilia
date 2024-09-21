const express = require("express");
const productsRouter = require("./routes/productos.router.js");
const cartRouter = require("./routes/carts.router.js");
const app = express();
const PUERTO = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);



app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
});



