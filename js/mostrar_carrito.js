document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    // Obtener carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    const renderizarCarrito = () => {
        // Limpiar tabla
        tablaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            tablaCarrito.innerHTML = "<tr><td colspan='6'>El carrito está vacío.</td></tr>";
            totalCarrito.textContent = "0.00";
            return;
        }

        // Renderizar productos en la tabla
        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><img src="${producto.imagen}" class="muestra"></td>
                <td class="columna-cantidad">${producto.cantidad}</td>
                <td>${producto.nombre}</td>
                <td class="columna-precio">$${producto.precio.toLocaleString('es-AR')}</td>
                <td>$${(parseFloat(producto.precio)*parseInt(producto.cantidad)).toLocaleString('es-AR')}</td>
                <td>
                    <button class="btn btn-danger btn-sm" data-index="${index}" data-nombre="${producto.nombre}">Eliminar</button>
                </td>
            `;
            tablaCarrito.appendChild(fila);
        });

        // Actualizar el total
        calcularTotal();
    };


    const calcularTotal = () => { 
        
        const total = carrito.reduce((suma, producto) => suma + (parseFloat(producto.precio)*parseInt(producto.cantidad)), 0);
    
        totalCarrito.textContent = total.toLocaleString('es-AR',{
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2  
        });
    };
    

    tablaCarrito.addEventListener("click", (event) => { 
    
        if (event.target.classList.contains("btn-danger")) { 
    
            const index = event.target.getAttribute("data-index"); 

            let producto, respuesta
            producto=event.target.getAttribute("data-nombre");
            respuesta=confirm("Está seguro que desea eliminar el artículo "+producto);
            if (respuesta){
                carrito.splice(index, 1); 
        
                localStorage.setItem("carrito", JSON.stringify(carrito)); 
        
                renderizarCarrito(); 
        
            }
        }
    });
    
    renderizarCarrito();
});