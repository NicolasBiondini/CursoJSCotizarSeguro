function Seguro(marca, anio, seguro) {
    this.marca = marca;
    this.anio = anio;
    this.seguro = seguro;
}

// Relacionado con la interfaz grafica que se va a mostrar
function Interfaz() {};

Interfaz.prototype.mostarError = function(mensaje, tipo) {
    const div = document.createElement("div");
    if(tipo == "error"){
        div.classList = "error";
        div.innerText = mensaje;

        resultado.appendChild(div);
        
        //eliminar Div despues de 3 segundos
        setTimeout(function() {div.remove()}, 3000);
    } else{
        const loading = document.querySelector("#cargando");
        const loadingImg = document.createElement("img");
        loadingImg.setAttribute("src", "img/spinner.gif");
        loading.appendChild(loadingImg);
                
        //quitar spinner
        setTimeout(function() {loadingImg.remove()}, 2500);

        //entra la tarjeta costo de seguro
        setTimeout(function() {costoDeSeguro()}, 2500);
    }
}

// Event Listener y recopilacion de datos

const formulario = document.querySelector("#cotizar-seguro");
const resultado = document.getElementById("resultado");

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

    const interfaz = new Interfaz();

    // comprobar que se seleccionan elementos
    if(marcaSeleccionada == "" || anioSeleccionado == "" || tipo == ""){
        interfaz.mostarError("Hay un error en los campos enviados, intente nuevamente", "error");
    } else {
        const newCar = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        interfaz.mostarError("mensaje", "hola");
        console.log(newCar);
    }
    
})

//Funcion que calcula costo del seguro y se ejecuta. 
function costoDeSeguro() {
    console.log("HOLAAAAAAAAAAAAAA");
}

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

