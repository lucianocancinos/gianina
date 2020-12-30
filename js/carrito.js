function miFuncion(){
    var probando = document.getElementsByClassName("car-logo")[0].style.color = "green";
    const diva = document.getElementById("alerta");
        const parrafo = document.createElement("p");
        parrafo.textContent="Producto añadido con exito!";
        parrafo.classList.add("progress-bar", "bg-success", "rounded");
        diva.appendChild(parrafo);  
};
 