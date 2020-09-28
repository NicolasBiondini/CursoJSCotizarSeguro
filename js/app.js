function Seguro() {

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

