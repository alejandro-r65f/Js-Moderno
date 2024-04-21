const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

eventsListeners()

function eventsListeners(){
    carrito.addEventListener('click', eliminarCurso);
    listaCursos.addEventListener("click", agregacurso)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
    

}




function agregacurso (e ) {
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement;

        leerDatosCurso(curso)
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        nombre: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso;
            } else {
                return curso;
            }
        
        })
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);

    carritoHtml()
}

function limpiarCarrito (){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function carritoHtml(){
    limpiarCarrito()

    articulosCarrito.forEach(elemento => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width=100></img>
            </td>
            <td> ${elemento.nombre}</td>
            <td> ${elemento.precio}</td>
            <td> ${elemento.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-set="${elemento.id}">X</a>
            </td>
        `

        contenedorCarrito.appendChild(row)
    })


}

function eliminarCurso(e){
    e.preventDefault()
   
    if(e.target.classList.contains("borrar-curso")){
       
        const cursoId = e.target.getAttribute('data-set')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHtml()
    }
}

function vaciarCarrito(){
    articulosCarrito = [];
    carritoHtml()
}