let resposta;
let resposta2;
function receberResposta(selected){

    if (resposta !== undefined) return;

    resposta = selected;

    const certa = document.querySelector("#primeiro .correta");
    certa.classList.add("resposta-correta");

    const errada = document.querySelectorAll("#primeiro .errada");
    for(let i = 0; i < errada.length; i++){
        errada[i].classList.add("resposta-errada");
    }

    selected.classList.remove("resposta");
    const caixaBranca = document.querySelectorAll("#primeiro .resposta");
    for(let i = 0; i < caixaBranca.length; i++){
        caixaBranca[i].innerHTML += /*HTML*/`<div class="caixa-branca"></div>`;
    }
    setTimeout(rolarProximoQuizz, 2000);
}
function receberResposta2(selected){

    if (resposta2 !== undefined) return;

    resposta2 = selected;

    const certa = document.querySelector("#segundo .correta");
    certa.classList.add("resposta-correta");

    const errada = document.querySelectorAll("#segundo .errada");
    for(let i = 0; i < errada.length; i++){
        errada[i].classList.add("resposta-errada");
    }

    selected.classList.remove("resposta");
    const caixaBranca = document.querySelectorAll("#segundo .resposta");
    for(let i = 0; i < caixaBranca.length; i++){
        caixaBranca[i].innerHTML += /*HTML*/`<div class="caixa-branca"></div>`;
    }
    setTimeout(rolarProximoQuizz, 2000);
}

function rolarProximoQuizz(){
    const proximoQuizz = document.querySelector('#segundo');
    proximoQuizz.scrollIntoView();
}