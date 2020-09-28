function Seguro(marca, anio, seguro) {
    this.marca = marca;
    this.anio = anio;
    this.seguro = seguro;
}

// Relacionado con la interfaz grafica que se va a mostrar
function Interfaz() {};

// Event Listener y recopilacion de datos

const formulario = document.querySelector("#cotizar-seguro");

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.getElementById("marca");
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    // leer el año seleccionado
    const anio = document.getElementById("anio");
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // leer el tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const newCar = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

    console.log(newCar);
})

// Crear fechas del año
const max = new Date().getFullYear();
const min = max - 20;

for(let i = max; i >= min; i--){
    let option = document.createElement("option");
    let select = document.querySelector("#anio")
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
}

