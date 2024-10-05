const express = require("express");

const productsRouter = require("./routes/productos.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const expresshand = require("express-handlebars");

const { Server } = require('socket.io');
const app = express();
const PUERTO = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('src/public'));

//rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

//Express-Handlebars
app.engine('handlebars', expresshand.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//referencia servidor
const server = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO} `);
});

///BACKEND

const io = new Server(server);
const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

io.on("connection", async (socket) =>{
    console.log("cliente conectado");
    socket.emit("productos", await manager.getProducts()); //enviamos el array de productos a realtim

    socket.on("eliminarProducto", async (id) =>{
        await manager.deleteProduct(id);
        io.emit("productos", await manager.getProducts());
    })
    //agregar productos 
    socket.on("agregarProducto", async (producto) =>{
        await manager.addProduct(producto);
        io.emit("productos", await manager.getProducts());
    } )

})

