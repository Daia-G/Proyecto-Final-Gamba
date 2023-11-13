

const botonBuscar = document.getElementById("botonBuscar")
botonBuscar.addEventListener("click", buscarProducto)
const saludo = document.getElementById("saludo")

const inputNombre = document.getElementById("inputNombre")
const botonNombre = document.getElementById("botonNombre")
botonNombre.addEventListener("click", bienvenida)

function bienvenida(){
    Swal.fire({
        title: "MARCEL tienda",
        text: "Bienvenido/a "+inputNombre.value.toUpperCase()+"!",
        imageUrl: "bolsos.jpeg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
}

function buscarProducto(){
    const palabraClave = document.getElementById("inputBusqueda").value.toUpperCase();
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = "" 

    fetch("misproductos.json")
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            const productosFiltrados = productos.filter(producto => producto.nombre.toUpperCase().includes(palabraClave));

            (productosFiltrados.length>0)?mostrarProductos(productosFiltrados) : noHayProducto();
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Ups!...",
                text: "Algo salió mal."
              });
        })

        .finally(
            saludo.innerHTML=`<h3>Gracias por utilizar nuestro sistema.</h3>`
        )
            
        
}
        function mostrarProductos(productos) {
            const contenedor = document.createElement("div")
            productos.forEach(producto => {
                const misProductos = document.createElement("div")
                const nombre = document.createElement("h4");
                nombre.textContent = producto.nombre;
                misProductos.appendChild(nombre);
                const precio = document.createElement("p")
                precio.textContent = `Precio: $ ${producto.precio}`;
                misProductos.appendChild(precio);
                const stock = document.createElement("p")
                stock.textContent = `Stock disponible ${producto.stock}`
                misProductos.appendChild(stock);

                contenedor.appendChild(misProductos);


            })
            listaProductos.appendChild(contenedor);
        }
        function noHayProducto() {
            Swal.fire({
                icon: "warning",
                title: "Lo sentimos...",
                text: "No contamos con ese producto."
              });
        }

    
 