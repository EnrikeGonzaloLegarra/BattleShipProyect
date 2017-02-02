//Pintamos las cuadriculas donde pondremos los barcos
/*function paintOcean(ocean) {

    for (var i = 0; i < ocean.length; i++) {
        for (var j = 0; j < ocean.length; j++) {
            $("#ocean").append("<div id=touch name=" + ocean[i][j] + "></div>");
        }
    }
}*/
function movePlane() {
  $("#plane").animate({
    marginLeft: "900px",
    opacity: 0.009
  }, 4500);
  var cazaSound = new Audio("sounds/cazaDisparos.mp3");
  cazaSound.play();
}


function moveBombardero() {
  $("#bombardero").animate({
    marginLeft: "900px",
    opacity: 0.009
  }, 7500);
  var cazaSound = new Audio("sounds/caza3.mp3");
  cazaSound.play();
}

function moveRadar() {
  $("#radar").animate({
    marginLeft: "900px",
    opacity: 0.09
  }, 7500);
  var cazaSound = new Audio("sounds/SoundRadar.mp3");
  cazaSound.play();
}
//VIDEO backgrounn-video
function soundCanon() {
  var cazaSound = new Audio("sounds/artilleria.mp3");
  cazaSound.play();
}
$(document).ready(function() {

});
