const form = document.querySelector('#formulario');
const tweet = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
const contenedor = document.querySelector('#contenido');
let cajaTweets = []

eventListeners()
function eventListeners(){
    form.addEventListener('submit', enviarTweet)

    listaTweets.addEventListener('click', borrarTweet)
    
    document.addEventListener('DOMContentLoaded', () =>{
        cajaTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(cajaTweets)
        mostrarTweets()
    })
}






function enviarTweet(e) {
    e.preventDefault();

    if(tweet.value === ''){
        alertaError('Escribe un tweet valido')
        return
    }
    const newTweet = {
        id: Date.now(),
        tweet: tweet.value
    }

    

    cajaTweets = [...cajaTweets, newTweet];    

    form.reset()
    mostrarTweets()
}

function mostrarTweets(){
    limpiarLista()

   
    if(cajaTweets.length > 0){
            cajaTweets.forEach((e) => {
                const tweetText = e.tweet;
                const li = document.createElement('li');
                li.innerText = tweetText;
                console.log(e.id)
                li.dataset.tweetId = e.id
                console.log(li)

                const borrarTweet = document.createElement('A');
                borrarTweet.classList = 'borrar-tweet';
                borrarTweet.innerText = 'X'

                li.appendChild(borrarTweet)
                listaTweets.appendChild(li);
            })
        }

    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(cajaTweets))
}

function limpiarLista(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function alertaError(mensaje) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('error')

    form.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 3000);

}

function borrarTweet (e){
    e.preventDefault;

    const id = e.target.parentElement.dataset.tweetId
    cajaTweets = cajaTweets.filter( tweets =>  tweets.id != id )

    console.log(cajaTweets)

    mostrarTweets()
}