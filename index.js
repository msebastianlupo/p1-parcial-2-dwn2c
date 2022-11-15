'use strict'

let catalogo = new Catalogo(localStorage.getItem("productos"));
catalogo.parsearCatalogo();
let carrito = [];

/**
 * genera un artículo completo
 * @param {object} producto el producto completo
 * @returns {string} el nombre del producto
 */
function generarItem(producto){
    let contenedor = document.querySelector("#contenedor");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let boton = document.createElement("button");
    div.id = producto.id;
    div.className = "items";
    img.src = producto.img;
    img.alt = producto.id;
    p.innerText = `${producto.marca} ${producto.nombre}`;
    span.innerText = producto.categoria;
    boton.setAttribute("onclick", `generarDetalles('${producto.id}')`);
    boton.innerText = `$${producto.precio} Ver más`;
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(boton);
    contenedor.appendChild(div);
    return producto.id;
}

/**
 *  * Genera todo el contenido relacionado a los productos
 * @param {string|boolean} categoria si es false le enviará uno a uno los productos a generarItem(), de lo contrario solo los que coincidan
 * @returns {string|boolean} el nombre de la categoría a filtrar o false si no se especifica
 */
function generarMercado(categoria=false){
    let prodCategorias = catalogo.obtenerCategorias();
    let storage = catalogo.obtenerStorage;
    let categorias = document.querySelector("#categorias");
    if(!document.querySelector("#contenedor")){
        for(let categoria of prodCategorias){
            let opcion = document.createElement("option");
            opcion.value = categoria;
            opcion.innerText = categoria;
            categorias.appendChild(opcion);
        }
        let elementos = document.querySelector("#elementos");
        let divContenedor = document.createElement("div");
        divContenedor.id = "contenedor";
        elementos.appendChild(divContenedor);
    }

    if(categoria){
        let items = document.querySelectorAll(".items");
        for(let item of items){
            item.remove();
        }

        for(let producto of storage){
            if(producto.categoria === categoria){
                generarItem(producto);
            }
        }
    }
    if(!categoria || categoria === "todas"){
        for(let producto of storage){
            generarItem(producto);
        }
    }
    return categoria;
}

/**
 * Muestra una ventana modal del producto clickeado
 * @param {string} id del producto en el almacen
 * @returns {string} el id del producto
 */
function generarDetalles(id){
    let item;
    let storage = catalogo.obtenerStorage;
    for(let producto of storage){
        if(producto.id === id){
            item = producto;
            break;
        }
    }
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let boton = document.createElement("button");
    let boton2 = document.createElement("button");
    div.id = "moddet";
    img.src = item.img;
    img.alt = item.id;
    p.innerText = `${item.marca} ${item.nombre}`;
    p2.innerText = item.descripcion;
    boton.setAttribute("onclick", "destruirElemento('moddet')");
    boton.innerText = "CERRAR";
    boton2.setAttribute("onclick", `sumarAlCarro('${JSON.stringify(item)}')`);
    boton2.innerText = `AGREGAR ($${item.precio})`;
    div2.appendChild(img);
    div2.appendChild(p);
    div2.appendChild(p2);
    div2.appendChild(boton);
    div2.appendChild(boton2);
    div.appendChild(div2);
    document.body.appendChild(div);
    return item.id;
}

/**
 * remueve el DOM que se le pase como argumento
 * @param {*} id cualquiera que se desea
 * @returns {string} el id del elemento removido
 */
function destruirElemento(id){
    let elemento = document.querySelector(`#${id}`);
    return elemento.remove();
}

/**
 * suma productos al array carrito o resta unidades si se activa "revertir"
 * @param {object} producto el item a agregar (completo)
 * @param {number} revertir un valor truthy le quita unidades al item del carrito. cuando no hay más unidades lo elimina por completo
 * @returns {number|string} -1 si se agregan productos al carro o aumentan unidades. 1 o mayor si se quita unidades. string del item eliminado
 */
function sumarAlCarro(producto, revertir=0){
    if(document.querySelector("#moddet")){
        destruirElemento("moddet");
    }
    let productoParse = JSON.parse(producto);
    let numItems = document.querySelector("#numitems");
    let existe = 0;
    let indice = 0;
    for(let numItem in carrito){
        if(carrito[numItem].id === productoParse.id){
            existe = 1;
            indice = numItem;
            break;
        }
    }
    if(!existe){
        carrito.push(productoParse);
        carrito.at(-1).cantidad = 1;
    }else{
        if(revertir){
            if(carrito[indice].cantidad === 1){
                carrito.splice(indice,1);
            }else{
                carrito[indice].cantidad--;
                carrito[indice].cantidad;
            }
        }else{
            carrito[indice].cantidad++;
        }
    }
    if(document.querySelector("#modcar")){
        if(!carrito.length){
            let modcar = document.querySelector("#modcar");
            modcar.remove();
        }else{
            crearItemsCarro(carrito);
        }
    }
    if(carrito.length){
        numItems.innerText = carrito.length;
    }else{
        numItems.innerText = "x";
    }
    return -1;
}


/**
 * muestra una ventana modal con todos los productos agregados al array
 * @param {array} carro el array del carrito
 * @returns 
 */
function crearItemsCarro(carro){
    let contenCarro = document.querySelector("#contenedorcarro");
    if(contenCarro){
        contenCarro.remove();
    }else{
        let modCar = document.createElement("div");
        modCar.id = "modcar";
        document.body.appendChild(modCar);
    }
    let divContenedor = document.createElement("div");
    let h1 = document.createElement("h1");
    divContenedor.id = "contenedorcarro";
    h1.innerText = "Carrito de compras";
    divContenedor.appendChild(h1);
    document.querySelector("#modcar").appendChild(divContenedor);
    let precioTotal = 0;
    for(let item of carro){
        precioTotal += item.precio * item.cantidad;
        let divItem = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");
        let boton = document.createElement("button");
        let span = document.createElement("span");
        divItem.id = item.id;
        divItem.className = "itmcarro";
        img.src = item.img;
        img.alt = item.nombre;
        p.innerText = `${item.marca} ${item.nombre}`;
        boton.title = `Quitar unidad - ${item.marca} ${item.nombre}`
        boton.innerText = "➖";
        boton.setAttribute("onclick", `sumarAlCarro('${JSON.stringify(item)}', '1')`);
        span.innerText = `${item.cantidad} X $${item.precio}`;
        divItem.appendChild(img);
        divItem.appendChild(p);
        divItem.appendChild(boton);
        divItem.appendChild(span);
        divContenedor.appendChild(divItem);
    }
    let divBoton = document.createElement("div");
    let boton2 = document.createElement("button");
    let boton3 = document.createElement("button");
    let boton4 = document.createElement("button");
    divBoton.id = "divboton";
    boton2.innerText = "Salir";
    boton2.setAttribute("onclick", "destruirElemento('modcar')");
    boton3.innerText = `Pagar ($${precioTotal})`;
    boton4.id = "destructor";
    boton4.innerText = "Vaciar carro";
    boton4.setAttribute("onclick", "vaciarCarro()");
    divBoton.appendChild(boton2);
    divContenedor.appendChild(divBoton);
    if(carrito.length){
        divBoton.appendChild(boton3);
        document.querySelector("#modcar").appendChild(boton4);
    }else{
        h1.innerText = "El carrito está vacío";
        boton2.innerText = "Mejor llenalo";
    }
    return null;
}

/**
 * resetea el array carrito
 * @returns {boolean} solo true
 */
function vaciarCarro(){
    destruirElemento("modcar");
    document.querySelector("#numitems").innerText = "X";
    carrito = [];
    return true;
}

//deben mostrarse todos los productos al cargar
generarMercado();