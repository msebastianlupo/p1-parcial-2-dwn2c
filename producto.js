'use strict'

class Catalogo{
    #storageCadena;
    #storageParse;
    constructor(storageCadena){
        this.#storageCadena = storageCadena;
    }

    parsearCatalogo(){
        return this.#storageParse = JSON.parse(this.#storageCadena);
    }

    obtenerCategorias(){
        let categorias = [];
        for(let producto of this.#storageParse){
            if(categorias.indexOf(producto.categoria) === -1){
                categorias.push(producto.categoria);
            }
        }
        return categorias;
    }

    get obtenerStorage(){
        return this.#storageParse;
    }
}