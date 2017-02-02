//Oceano debe de ser un objeto

var ocean = [
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
];
for (var i = 0; i < ocean.length; i++) {
  for (var j = 0; j < ocean.length; j++) {
    $("#ocean").append(`<div id="cell-${i}-${j}" class="water" />`);
  }
}

function Boats(boatName, occupy, position1, position2, direction) {
  this.boatName = boatName;
  this.occupy = occupy;
  this.position1 = getPosition();
  this.position2 = getPosition();
  this.direction = getDirection(Boats);
}

function getDirection(Boats) {

  if (Math.floor(Math.random() * 2) + 1 === 1) {
    Boats.direction = "h";
    return Boats.direction;
  } else {
    Boats.direction = "v";
    return Boats.direction;
  }
}

function getPosition(Boats) {
  return Math.floor(Math.random() * 10);
}


function shootMode(event) {
  var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
  switch (chCode) {
    case 13:
      var commands = document.getElementById('text-area').value;
      var valor = document.getElementById("terminal-text").value;
      var regex = /(attackCanon|attackPlane|attackBombardero|showRadar)\((\d+),\s*(\d+)\)/;
      var comando = regex.exec(valor);
      if (comando[1] == "attackPlane") {
        movePlane();
        shootPlane();
      } else if (comando[1] == "attackBombardero") {
        moveBombardero();
        shootBombarsero()
      } else if (comando[1] == "showRadar") {
        moveRadar();
      } else if (comando[1] == "attackCanon") {
        shootCanon();
      }
      document.getElementById('text-area').value += valor + "\n";
      document.getElementById('text-area').scrollTop = document.getElementById('text-area').scrollHeight;
      if (document.getElementById('terminal-text').value == valor) {
        document.getElementById('terminal-text').value = "";
      }
      break;
    default:
  }
}


function putBoat(Boats) {
  function placeBoat() {
    Boats.position1 = getPosition();
    Boats.position2 = getPosition();

    function putBoatInSea() {
      for (var i = 0; i < Boats.occupy; i++) {
        if (Boats.direction === "h") Boats.position2 += 1;
        else Boats.position1 += 1;
        ocean[Boats.position1][Boats.position2] = Boats.boatName;
      }
    }

    if (checkIfBoatFits(Boats)) {
      console.log("put in sea...");
      putBoatInSea();
      return true;
    } else {
      console.log("DON'T put in sea...");
      return false;
    }
  }
  var placed = false;
  while (!placed)
    placed = placeBoat(Boats);
}
//Funcion que comprueba si entra un barco y si hay mas barcos
function checkIfBoatFits(Boats) {
  function fitsInSea(pos) {
    console.log(`Checking: ${pos} + ${Boats.occupy} < 10`);
    return (pos + Boats.occupy) < 10;
  }

  function waterIsFree(pos) {
    var fits = true;
    for (var i = 0; i < Boats.occupy; i++)
      if (ocean[pos][i] !== "0") {
        fits = false;
        break;
      }
    console.log(`Checking water: ${fits}`);
    return fits;
  }

  switch (Boats.direction) {
    case "v":
      return fitsInSea(Boats.position1) && waterIsFree(Boats.position1);
    case "h":
      return fitsInSea(Boats.position2) && waterIsFree(Boats.position2);
  }
}

function getAttack() {
  var commands = document.getElementById('text-area').value;
  var valor = document.getElementById("terminal-text").value;
  var regex = /(attackCanon|attackPlane|attackBombardero|showRadar)\((\d+),\s*(\d+)\)/;
  var comando = regex.exec(valor);
  return comando;
}


function shootCanon() {

  var commands = document.getElementById('text-area').value;
  var valor = document.getElementById("terminal-text").value;
  var regex = /(attackCanon|attackPlane|attackBombardero|showRadar)\((\d+),\s*(\d+)\)/;
  var comando = regex.exec(valor);
  soundCanon();
  if (ocean[comando[2]][comando[3]] == "0") {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("fail");
  } else {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("touch");
  }
}

function shootPlane() {
  var commands = document.getElementById('text-area').value;
  var valor = document.getElementById("terminal-text").value;
  var regex = /(attackCanon|attackPlane|attackBombardero|showRadar)\((\d+),\s*(\d+)\)/;
  var comando = regex.exec(valor);

  if (ocean[comando[2]][comando[3]] == "0") {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("fail");
  } else {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("touch");
  }
  var newComando3 = parseInt(comando[3]) + 1;
  if (ocean[comando[2]][newComando3] == "0") {
    $(`#cell-${comando[2]}-${newComando3}`).addClass("fail");
  } else {
    $(`#cell-${comando[2]}-${newComando3}`).addClass("touch");
  }
}

function shootBombarsero() {
  var commands = document.getElementById('text-area').value;
  var valor = document.getElementById("terminal-text").value;
  var regex = /(attackCanon|attackPlane|attackBombardero|showRadar)\((\d+),\s*(\d+)\)/;
  var comando = regex.exec(valor);

  if (ocean[comando[2]][comando[3]] == "0") {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("fail");
  } else {
    $(`#cell-${comando[2]}-${comando[3]}`).addClass("touch");
  }
  var newComando3 = parseInt(comando[3]) + 1;
  if (ocean[comando[2]][newComando3] == "0") {
    $(`#cell-${comando[2]}-${newComando3}`).addClass("fail");
  } else {
    $(`#cell-${comando[2]}-${newComando3}`).addClass("touch");
  }
  var newComando4 = parseInt(comando[3]) + 1;
  var newComando5 = parseInt(comando[2]) + 1;
  if (ocean[newComando5][newComando4] == "0") {
    $(`#cell-${newComando5}-${newComando4}`).addClass("fail");
  } else {
    $(`#cell-${newComando5}-${newComando4}`).addClass("touch");
  }
}





var boat1 = new Boats("barco1", 5);
var boat2 = new Boats("barco2", 4);
var boat3 = new Boats("barco3", 3);
var boat4 = new Boats("barco4", 1);
var boat5 = new Boats("barco5", 1);


putBoat(boat1);
putBoat(boat2);
putBoat(boat3);
putBoat(boat4);
putBoat(boat5);
console.table(ocean);



/*paintOcean(ocean);*/


//putBoat(boat1);
