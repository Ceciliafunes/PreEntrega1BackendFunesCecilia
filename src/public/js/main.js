// socket del lado del cliente //
//FRONT
const socket = io();

socket.on("productos", (data)=>{
    renderProductos(data);
})
//para renderizar prd

const renderProductos = (data) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("producto-card");
        card.classList.add("col-6");
        card.classList.add("card")
        card.innerHTML = `
                            <p> ID: ${item.id} </p>
                            <p> Producto:  ${item.title} </p>
                            <p> Precio: ${item.price} </p>
                            <button class="btn-eliminar btn btn-primary" data-id="${item.id}">Eliminar producto</button> 
                            `;
        contenedorProductos.appendChild(card);
        
    });
    // Manejar la eliminación de productos   
    contenedorProductos.addEventListener("click", (event) => {  
        if (event.target.classList.contains("btn-eliminar")) {  
            const id = event.target.dataset.id;  
                eliminarProducto(id);  
            }  
        });   
}


//Eliminar producto
const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

//form agregar product
document.getElementById("btnEnviar").addEventListener("click",(event)=>{
    event.preventDefault();
    console.log("enviado");
    agregarProducto();
})


//Agregar producto
const agregarProducto = () => {
    const title = document.getElementById("title").value;
    const description= document.getElementById("description").value;
    const price= document.getElementById("price").value;
    const img= document.getElementById("img").value;
    const code= document.getElementById("code").value;
    const stock= document.getElementById("stock").value;
    
    // Validar que todos los campos estén completos  
    if (!title || !description || !price || !img || !code || !stock) {  
        return console.error("no fueron rellenados todos los campos");
        
    }  
    
    const producto = { title, description, price, img, code, stock};
    socket.emit("agregarProducto", producto);
    console.log("producto agregado");

}
