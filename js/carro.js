const cards = document.getElementById('cards');
//guardamos los elementos para poder pasarlos al carrito
const items = document.getElementById('items');
const footer = document.getElementById('footer-carrito');
//guardamos los template
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
//Creamos el fragment
const fragment = document.createDocumentFragment();
//creamos el carrito que es un objeto vacio
let carrito = {};

//capturar los datos
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})
//que los productos detecten el click //con la e capturamos el elemento que queremos modificar
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

//  Leer JSON con los productos
const fetchData = async () => {
    // hacemos la petición
    try {
        //cree una falsa API para poder utilizar fetch
        const res = await fetch('https://my-json-server.typicode.com/lucianocancinos/json/productos')
        // guardamos la información en formato JSON 
        const data = await res.json()
        // console.log(data)
    } catch (error) { 
        console.log(error)
    }
}

const addCarrito = e => {
    // console.log(e.target);
    //con este console preguntamos si el elemento que estamos clickeando contiene la clase
    // console.log(e.target.classList.contains('btn-info'));
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    // console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h2').textContent,
        precio: objeto.querySelector('h3').textContent,
        cantidad: 1,
    }
    //Acá decimos para que no se repita la cantidad
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    //lo empujamos al carrito
    carrito[producto.id] = {...producto};
    pintarCarrito();
     //console.log(producto);
} 

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío, porfavor realice una compra!</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}