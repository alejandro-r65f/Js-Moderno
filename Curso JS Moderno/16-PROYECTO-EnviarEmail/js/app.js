document.addEventListener("DOMContentLoaded", function(){

    const correo = {
        email: '',
        asunto:  '',
        mensaje: ''
    }

    const email = document.querySelector("#email")
    const asunto = document.querySelector("#asunto")
    const mensaje = document.querySelector("#mensaje")
    const formulario = document.querySelector("#formulario")
    const btnSubmit = document.querySelector("#formulario button[type='submit']")
    const btnReset = document.querySelector("#formulario button[type='reset']")
    const spinner = document.querySelector("#spinner")

    email.addEventListener("input", validar)
    asunto.addEventListener("input", validar)
    mensaje.addEventListener("input", validar)
    formulario.addEventListener("submit", enviarEmail)
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove()
        }
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)

        const alerta = document.createElement('P');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        referencia.appendChild(alerta);
        
    }

    function enviarEmail(e){
        e.preventDefault()

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetFormulario()

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'El email se envio con exito';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove()
            }, 3000);

        }, 3000)
    }

    function validar (e) {
        
        if(e.target.value.trim() === '' ){
            mostrarAlerta(`El elemento ${e.target.id} es necesario`, e.target.parentElement)
            correo[e.target.name] = '';
            comprobarCorreo();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El ${e.target.id} que usted escribio es invalido`, e.target.parentElement)
            correo[e.target.name] = '';
            comprobarCorreo();
            return;
        }

        limpiarAlerta(e.target.parentElement)

        correo[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarCorreo()
    }

    function comprobarCorreo(){
        if(Object.values(correo).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    
    function resetFormulario (){
        correo.email = ''
        correo.asunto = ''
        correo.mensaje = ''

        formulario.reset();
        comprobarCorreo;
    }
})