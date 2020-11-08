/* PEGA ALTURA DA TELA ATUAL E RETORNA ELA */
function getAlturaTela() {
  let heigth = screen.height;
  return heigth;
}

/* PEGA LARGURAs DA TELA ATUAL E RETORNA ELA */
function getLarguraTela(){
  let width = screen.width;
  return width;
}


if(getAlturaTela()>=700 && getLarguraTela()>=770){

  /* alert(`ALTURA = ${getAlturaTela()} \nLARGURA = ${getLarguraTela()}`) */
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector("#header-pataNaJanta").style.top = "0";
    } else {
      document.querySelector("#header-pataNaJanta").style.top = "-116px";
    }
    prevScrollpos = currentScrollPos;
  }
}

window.addEventListener("orientationchange", function(event) {

  /* alert(`ALTURA = ${getAlturaTela()} \nLARGURA = ${getLarguraTela()}`); */

  if(getAlturaTela()>=700 && getLarguraTela()>=770){
      
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.querySelector("#header-pataNaJanta").style.top = "0";
      } else {
        document.querySelector("#header-pataNaJanta").style.top = "-116px";
      }
      prevScrollpos = currentScrollPos;
    }
  }
});


