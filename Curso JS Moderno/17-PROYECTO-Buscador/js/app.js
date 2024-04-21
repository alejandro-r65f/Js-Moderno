

const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision")
const color = document.querySelector("#color")
const contenedor = document.querySelector('#resultado')



//Agrega años
const max = new Date().getFullYear();
const min = max - 10;

for(let i = max; i > min; i--){
    const years = document.createElement("option");
    years.value = i;
    years.textContent = i;
    year.appendChild(years);
}

const datos = {
    year: '',
    marca: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Guarda los datos del formulario en un objeto
function escuchaBusquedas(data){
    data.addEventListener('input', (e) => {
    
        const datoId = data.id;
        const dato = e.target.value;
        
        if(datoId === 'year' || datoId === 'puertas'){
            datos[datoId] = parseInt(dato)
        } else {
            datos[datoId] = dato; 
        }
        console.log(datos);
        
        
        filtrarAutos();
    })
}

escuchaBusquedas(year)
escuchaBusquedas(marca)
escuchaBusquedas(minimo)
escuchaBusquedas(maximo)
escuchaBusquedas(puertas)
escuchaBusquedas(transmision)
escuchaBusquedas(color)

document.addEventListener('DOMContentLoaded', () => {
    enseñarAutos(autos)
})



function enseñarAutos(autos){
    limpiaHtml()

    autos.forEach(auto => {
        const autoHtml = document.createElement('P');
        autoHtml.innerHTML = `
            <p>${auto.marca} - ${auto.year} - ${auto.puertas} puertas - transmision: ${auto.transmision} - color: ${auto.color} - Precio:${auto.precio}   </p>
        `;
        contenedor.appendChild(autoHtml)
    });
}

function noResultado() {
    limpiaHtml();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    contenedor.appendChild(noResultado);
}

//MINI FUNCTIONES
function limpiaHtml(){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

function filtrarAutos() {
    const resultado = autos.filter(filtrarYear).filter(filtrarMarca).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
    console.log(resultado)
 //    console.log(resultado);
    if(resultado.length){
         enseñarAutos(resultado);
    } else {
        noResultado();
    }
 }

 // Aplica los filtros
 function filtrarMarca(auto) {
     if(datos.marca){
         return auto.marca === datos.marca;
     } 
     return auto;
 }
 function filtrarYear(auto) {

     if(datos.year){
         return auto.year === datos.year;
     }
     return auto;
 }
 function filtrarMinimo(auto) {
     if(datos.minimo){
         return auto.precio >= datos.minimo;
     }
     return auto;
 }
 function filtrarMaximo(auto) {
     if(datos.maximo){
         return auto.precio <= datos.maximo;
     }
     return auto;
 }
 function filtrarPuertas(auto) {
     if(datos.puertas){
         return auto.puertas === datos.puertas;
     }
     return auto;
 }
 function filtrarTransmision(auto) {
     if(datos.transmision){
         return auto.transmision === datos.transmision;
     } 
     return auto;
 }
 function filtrarColor(auto){
     if(datos.color){
         return auto.color === datos.color;
     } 
     return  auto;
 }
 
 