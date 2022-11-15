'use strict'

//se guardará todos los productos en localStorage sin fines útiles
let productos;
if(!localStorage.getItem("productos")){
    productos = [
        {   
            id:"p01",
            nombre:"A400 480GB",
            marca:"Kington",
            descripcion:"Disco duro económico, ideal para netbooks del gobierno, esas que son más duras que un ladrillo",
            precio:7800,
            categoria:"almacenamiento",
            img:"img/a400.jpg"
        },
        {
            id:"p02",
            nombre:"Vengeance RGB PRO TUF 16GB (2x8GB) 3200mHz DDR4",
            marca:"Corsair",
            descripcion:"Memoria RAM re zarpada, con lucecitas y coso",
            precio:28100,
            categoria:"memorias-ram",
            img:"img/vengeance.jpg"
        },
        {
            id:"p03",
            nombre:"Genérica 550W",
            marca:"PERFORMANCE",
            descripcion:"Fuente más barata del mercado. Aviso: en caso de incendio, la garantía se anula",
            precio:2500,
            categoria:"fuentes-atx",
            img:"img/generica550w.jpg"
        },
        {   
            id:"p04",
            nombre:"G903 Lightspeed",
            marca:"Logitech",
            descripcion:"Mouse wireless que se maneja solo, viene con rayo láser",
            precio:19500,
            categoria:"perifericos",
            img:"img/g903.jpg"
        },
        {
            id:"p05",
            nombre:"Harpe PRO K503 RGB",
            marca:"Redragon",
            descripcion:"Teclado que zafa, no es lo mejor, pero tu bolsillo lo puede pagar",
            precio:4900,
            categoria:"perifericos",
            img:"img/redragon.jpg"
        },
        {
            id:"p06",
            nombre:"Ryzen 9 7950X 5.7GHz AM5",
            marca:"AMD",
            descripcion:"CPU de última generación, potencia asegurada hasta el año 2050",
            precio:210000,
            categoria:"cpus",
            img:"img/ryzen9.jpg"
        },
        {
            id:"p07",
            nombre:"SP-Q180 USB",
            marca:"Genius",
            descripcion:"Parlantes que suenan fiero, pero se la bancan, no como los Noga",
            precio:2300,
            categoria:"perifericos",
            img:"img/parlantes.jpg"
        },
        {
            id:"p08",
            nombre:"Radeon RX 6600 8GB GDDR6",
            marca:"XFX",
            descripcion:"Placa de video para pobres",
            precio:82500,
            categoria:"gpus",
            img:"img/rx6600.jpg"
        },
        {
            id:"p09",
            nombre:"V250 ARGB Air",
            marca:"Thermaltake",
            descripcion:"Gabinete de buena calidad. Este sí que va",
            precio:27900,
            categoria:"gabinetes",
            img:"img/thermaltake.jpg"
        },
        {
            id:"p10",
            nombre:"RTX 4090 24GB GDDR6X Trinity",
            marca:"Zotac",
            descripcion:"Placa de video para elegir, entre comer tres meses o comprarla",
            precio:810200,
            categoria:"gpus",
            img:"img/rtx4090.jpg"
        },
        {
            id:"p11",
            nombre:"FIFA MT2000",
            marca:"Checkpoint",
            descripcion:"Silla gamer del mundial",
            precio:104900,
            categoria:"sillas",
            img:"img/mt2000.jpg"
        },
        {
            id:"p12",
            nombre:"MW150US",
            marca:"Mercusys",
            descripcion:"placa wifi USB. máxima velocidad de descarga de 10kbps",
            precio:900,
            categoria:"placas-wifi",
            img:"img/mw150us.jpg"
        }   
    ];
    let productosCadena = JSON.stringify(productos);
    localStorage.setItem("productos", productosCadena);
}