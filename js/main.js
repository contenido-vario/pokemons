
//MAPEAR HTML
const BTN_PREV = document.getElementById('anterior');
const BTN_NEXT = document.getElementById('siguiente');
const LISTA = document.getElementById("lista-pokemons");
const ENC_LISTA = document.getElementById("enc-lista");

// VARIABLES GLOBALES
let urlSiguiente = 'https://pokeapi.co/api/v2/pokemon';
let urlAnterior = null; 
let contador = 0;
let inicio = true;
let numeroPokemones = 0

// DEFINICION DE FUNCIONES

const mostrarDatos = (resultado) => {
  LISTA.innerHTML = ""; 
  ENC_LISTA.innerText = `Pokémons ${contador + 1} al ${contador + 20}`;

  urlAnterior = resultado.previous;
  urlSiguiente = resultado.next;
   
  let htmlAside = ""; // Creamos un "saco" vacío fuera del bucle
  let pokemons = resultado.results;

  // La primera vez que muestra los datos actualiza el numero de pokemones
  if (inicio) { 
    numeroPokemones = resultado.count;
    inicio = false;
  }
  console.log(resultado);

  for (const valor of pokemons) {
    // Vamos SUMANDO (+=) los strings en la memoria del código, 
    // sin tocar la pantalla todavía
    htmlAside += `<p class="cursor-pointer hover:text-amber-400 mb-1" data-info="${valor.url}">
    ${contador+1}. ${valor.name}
    </p>`; 
    contador++;
  }
  // console.log(htmlAside)
  console.log(contador);
  // Al salir del bucle, inyectamos todo de un solo golpe en el DOM
  LISTA.innerHTML = htmlAside;  

}

const leerUrlPokemon = (e) => {
  // Buscamos si el usuario ha hecho clic en una <p> 
  const elementoClicado = e.target.closest('[data-info]');
  
  // Si efectivamente clicó en un Pokémon...
  if (elementoClicado) {
    // LEER EL DATO: Accedemos a data-info usando .dataset.info
    const urlPokemon = elementoClicado.dataset.info;    
    console.log(`¡Has clicado un Pokémon! Su URL es: ${urlPokemon}`);
    // Aquí ya puedes llamar a tu función 
    // para hacer el fetch de los datos de ese Pokémon
    // ejemplo: buscarDetallePokemon(urlPokemon);
  }
}


LISTA.addEventListener('click', leerUrlPokemon);

const cargarDatos = (url) => { 
  inicio = false;

  fetch(url) // llama a la URL que te paso por parámetro
    // guarda los datos en una variable llamada respuesta
    // y transformalos a un objeto literal 
    // (quita comillas del JSON estándar)
    .then (respuesta => respuesta.json())
    // la respuesta transformada a objeto 
    // la guardas en la variable resultado y se la pasas 
    // a la función mostrarDatos
    .then (resultado => mostrarDatos(resultado))
}

const paginaSiguiente = () => {  
  // alert(contador);
  if (contador == 0) {
    urlSiguiente = 'https://pokeapi.co/api/v2/pokemon';
  }
  cargarDatos(urlSiguiente);
}
BTN_NEXT.addEventListener("click", paginaSiguiente);

const paginaAnterior = () => {
  contador -= 40;
  // alert(contador);
  contador = Math.max(contador, 0);
  if (contador == 0) {
    urlSiguiente = 'https://pokeapi.co/api/v2/pokemon';
    cargarDatos(urlSiguiente);
  } else {
    cargarDatos(urlAnterior);
  }
}
BTN_PREV.addEventListener("click", paginaAnterior);

cargarDatos(urlSiguiente);