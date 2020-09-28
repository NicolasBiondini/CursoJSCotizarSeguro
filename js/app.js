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
        div.classList = "correcto";
        div.innerText = mensaje;

        resultado.appendChild(div);

        //eliminar Div despues de 3 segundos
        setTimeout(function() {div.remove()}, 2500);
        
    }
}

Interfaz.prototype.mostarCoste = function(coste){
    const div = document.createElement("div");
    div.classList = "resultado";
    
    const p = document.createElement("p");
    p.classList = "header";

    p.innerText = 'El coste de tu seguro es de: $' + coste;

    div.appendChild(p);
    resultado.appendChild(div);
    setTimeout(function() {div.remove()}, 4000);
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
        interfaz.mostarError("Datos ingresados correctamente. Calculando su seguro!", "correcto");
        const loading = document.querySelector("#cargando");
        const loadingImg = document.createElement("img");
        
        //crear spinner

        loadingImg.setAttribute("src", "img/spinner.gif");
        loading.appendChild(loadingImg);
                
        //quitar spinner
        setTimeout(function() {loadingImg.remove()}, 2500);

        //entra la tarjeta costo de seguro
        setTimeout(function() {costoDeSeguro(newCar, interfaz)}, 2500);
    }
    
})

//Funcion que calcula costo del seguro y se ejecuta. 
function costoDeSeguro(datosAuto, interfazVisual) {
    
    let marca = datosAuto.marca;
    let anio = Number(datosAuto.anio);
    let tipo = datosAuto.seguro;

    // variable correspondiente al valor del auto
    let valorAuto;
    valorAuto = valorDelAuto(marca);

    // variable correspondiente a la cantidad de años
    let valorAnio;
    valorAnio = polizaDelAño(anio);

    //variable correspondiente al tipo de seguro
    let valorTipoSeguro;
    if(tipo == "basico"){
        valorTipoSeguro = 4.5 / 100;
    } else {
        valorTipoSeguro = 10 / 100;
    }

    // Calculando el valor con los datos dados
    let valorSeguro;
    valorSeguro = calculadoraSeguro(valorAuto, valorAnio, valorTipoSeguro);

    // mostrar visualmente el coste
    let interfaz = interfazVisual;
    interfaz.mostarCoste(valorSeguro);
}

// Funcion que da el valor del auto
function valorDelAuto(marca) {
    if (marca == 1) {
        return 15000;
    }
    else if (marca == 2) {
        return 12500;
    }
    else if (marca == 3) {
        return 20000;
    }
}

// Funcion Poliza del año
function polizaDelAño(anio) {
    let anios = 0;
    for(let i = anio; i < max; i++ )
    {
        anios = anios + 1;
    }
    return anios;
}

// Funcion calculadora de seguro

function calculadoraSeguro(valorAuto, cantidadAnios, tipo) {
    let valor = valorAuto;
    for(let i = cantidadAnios; i > 0; i--) {
        valor = valor - (valorAuto *3 / 100);
    }
    valor = valor * tipo;
    return valor;

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

