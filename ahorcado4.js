//Declaramos un Array de palabras
var palabras = ["Amoxicilina", "Desoxirribonucleico", "Zapato", "Ambiente", "Programacion", "Computador", "Seleccion", "Universidad"];
var palabra = aleatorio(0,7);
var hombre, l, espacio, poste, cabeza, torso, brazos, piernas, ojos, ganador, est;
var direccion = ["poste.png", "cabeza.png", "torso.png", "brazos.png", "piernas.png", "ojos.png", "ganador.png"];

var Ahorcado = function (con)
{
    //this es las variables locales de la clase, accesibles en toda la clase
    //this.contexto es el context de dibujo del canvas, que llega por parámetro
    //desde la variable con
    this.contexto = con;
    this.maximo = 5;
    this.intentos = -1;
    this.vivo = true;
    this.dibujar();
    this.trazar();
}

Ahorcado.prototype.dibujar = function ()
{
    var dibujo = this.contexto;

    //dibujando el Poste:
    poste = new Image();
    poste.src = direccion[0];
    poste.onload = function ()
    {
        dibujo.drawImage(poste, 125, 0);
    }

    if(this.intentos > 0)
    {
        //intentos = 1 --> cabeza
        cabeza = new Image();
        cabeza.src = direccion[1];
        cabeza.onload = function ()
        {
            dibujo.drawImage(cabeza, 125, 0);
        }

        if(this.intentos > 1)
        {
            //intentos = 2 --> torso
            torso = new Image();
            torso.src = direccion[2];
            torso.onload = function ()
            {
                dibujo.drawImage(torso, 125, 0);
            }

            if(this.intentos > 2)
            {
                //intentos = 3 --> brazos
                brazos = new Image();
                brazos.src = direccion[3];
                brazos.onload = function ()
                {
                    dibujo.drawImage(brazos, 125, 0);
                }

                if(this.intentos > 3)
                {
                    //intentos = 4 --> piernas
                    piernas = new Image();
                    piernas.src = direccion[4];
                    piernas.onload = function ()
                    {
                        dibujo.drawImage(piernas, 125, 0);
                    }

                    if(this.intentos > 4)
                    {
                        //intentos = 5 --> ojos
                        ojos = new Image();
                        ojos.src = direccion[5];
                        ojos.onload = function ()
                        {
                            dibujo.drawImage(ojos, 125, 0);
                        }
                    }
                }
            }
        }
    }
}

Ahorcado.prototype.trazar = function ()
{
    this.intentos++;
    if (this.intentos >= this.maximo)
    {
        this.vivo = false;
        var pista= document.getElementById("pista");
        pista.innerText = palabras[palabra];
        var w=document.getElementById("volver");
        est=document.getElementById("mensaje");
        est.innerText ="Ahorcado!!!! Perdiste! Estas Muerto!";
        var z = document.getElementById("letra");
        z.disabled=true;
    }
    this.dibujar();
       

}

function iniciar()
{
    l = document.getElementById("letra");
    var b = document.getElementById("boton");
    var canvas = document.getElementById("c");
    canvas.width = 500;
    canvas.height = 400;
    var contexto = canvas.getContext("2d");
    hombre = new Ahorcado(contexto);
   
    //Convierte a mayúsculas un texto
    palabras[palabra] = palabras[palabra].toUpperCase();

    //Declaro un array con n espacios de acuerdo al largo palabra
    espacio = new Array(palabras[palabra].length);

    //Agregamos una función que se dispare al dar click al boton
    b.addEventListener("click", agregarLetra);

    mostrarPista(espacio);
}

function agregarLetra()
{   
    var x=document.getElementById("letra");
    var letra = l.value;
    letra=letra.toUpperCase();
    if(x.value == "")
    {
        alert("Debes escribir una letra");
    }
    else
    {
        mostrarPalabra(palabras[palabra], hombre, letra);
    }
    if(x.disabled==true)
    {
        alert("Intenta Nuevamente!!! Haz click en Volver a Jugar!!!");
    }
    x.value = "";
}

function mostrarPalabra(palabra, ahorcado, letra)
{
    var encontrado = false;
    var p;
    letra = letra.toUpperCase();
    for(p in palabra)
    {
        if(letra == palabra[p])
        {
            espacio[p] = letra;
            encontrado = true;
        }
    }
    mostrarPista(espacio);

    //Si NO lo encontré
    if(!encontrado)
    {
        ahorcado.trazar();
    }

}

function mostrarPista(espacio)
{
    var pista = document.getElementById("pista");
    var texto = "";
    var i;
    var largo = espacio.length;
    var validar = "";

    for(i = 0; i < largo; i++)
    {
        if(espacio[i] != undefined)
        {
            texto += espacio[i] + " ";
            validar += espacio[i];
        }
        else
        {
            texto += "_ ";
            validar += "";
        }
    }
    pista.innerText = texto;
    validar = validar.toUpperCase();
    validarPalabra(validar);
}

// Esta funcion es para hacer algo cuando el usuario ya gano.
    function validarPalabra(vali)
    {
        if(vali == palabras[palabra])
            {

                est=document.getElementById("mensaje");
                est.innerText ="Ganaste!!! Felicidades!";
                
                var z = document.getElementById("letra");
                z.disabled=true;
               
            }
    }
function aleatorio(minimo, maximo)
{
    var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    return numero;
}
