document.addEventListener("DOMContentLoaded", () => {
    const productos=document.querySelectorAll(".tarjeta-producto")
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    productos.forEach(producto=>{
        const botonAgregar = producto.querySelector(".boton-agregar");
        const botonSumar = producto.querySelector(".sumar");
        const botonRestar = producto.querySelector(".restar");
        // Obtener datos del producto
        const nombre = producto.querySelector(".nombre-producto").textContent;
        const precio = parseFloat(botonAgregar.getAttribute("data-precio"));
        const imagen = producto.querySelector(".imagen-producto").getAttribute("src");
        const cantidadProducto = producto.querySelector(".cantidad");        

        botonAgregar.addEventListener("click", (event) => {
                event.preventDefault();
                let cantidad=parseInt(cantidadProducto.textContent);
                const productoExistente = carrito.find((item) => item.nombre === nombre);
                
                if (productoExistente) {
                    // Si el producto ya existe, aumenta la cantidad
                    productoExistente.cantidad = (productoExistente.cantidad || 1) + cantidad;
                } else {
                    // Si no existe, agregarlo con la cantidad actual
                    carrito.push({ nombre, precio, imagen, cantidad });
                }
    
                // Guardar el carrito actualizado en localStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));

                alert(`${nombre} agregado al carrito.`);
        });


        botonSumar.addEventListener("click", (event) => {

                let valor = parseInt(cantidadProducto.textContent);
                if (isNaN(valor)){
                    valor=0
                }
                valor++;
                cantidadProducto.textContent = valor;
        });
        
        botonRestar.addEventListener("click", (event) => {

                let valor = parseInt(cantidadProducto.textContent);
                if (isNaN(valor)){
                    valor=1
                } else if (valor>1){
                    valor--;
                }
        
                cantidadProducto.textContent = valor;
           
        });
    });
});
