let menuNum = document.getElementById("menucantidad");
function miFuncion(){
    var probando = document.getElementsByClassName("car-logo")[0].innerHTML = "sumar";
    };
    menuNum.innerHTML = '(' + JSON.parse(localStorage.carrito).length + ")"; 