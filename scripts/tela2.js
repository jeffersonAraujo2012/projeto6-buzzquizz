let resposta, resposta2, resposta3, resposta4;
let quizz;
let arr = [];

// começarQuizz();
function começarQuizz(quizzId) {
    app.innerHTML = '';
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    );
    promessa.then((res) => responderQuizz(res.data, quizzId));

}

function responderQuizz(quizzes, quizzId) {

    quizz = quizzes.filter((quizz) => quizz.id == quizzId)[0];

    console.log(quizzes);
    const app = document.querySelector(".app");
    app.innerHTML = /*HTML*/`<div class="container-tela2">
    <div class="cabeçalho-tela2">
      <p class="titulo-quizz">${quizz.title}</p>
    </div>`;
    const cabeçalhoTela2 = document.querySelector(".cabeçalho-tela2");
    cabeçalhoTela2.style.backgroundImage = /*HTML*/`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizz.image})`;

    const containerTela2 = document.querySelector(".container-tela2");
    for (let i = 0; i < quizz.questions.length; i++) {
        containerTela2.innerHTML += /*HTML*/
            `<div class="container-quizz container${i}" id="primeiro">
        <div class="container-pergunta pergunta${i}">
            <div class="pergunta">${quizz.questions[i].title}</div>
        </div>`
        const corPergunta = document.querySelector(".pergunta" + i);
        corPergunta.style.backgroundColor = `${quizz.questions[i].color}`;
        arr = [];
        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            if (quizz.questions[i].answers[j].isCorrectAnswer === true) {
                arr.push(/*HTML*/
                    `<div onclick="receberResposta(this)" class="resposta opção${j} correctOne">
                    <img src=${quizz.questions[i].answers[j].image}>
                    <p class="titulo-img">${quizz.questions[i].answers[j].text}</p>
                </div>
                </div>`);
            } else {
                arr.push(/*HTML*/
                    `<div onclick="receberResposta(this)" class="resposta opção${j} wrongOne">
                    <img src=${quizz.questions[i].answers[j].image}>
                    <p class="titulo-img">${quizz.questions[i].answers[j].text}</p>
                </div>
                </div>`);
            }
        }

        arr.sort(comparador);

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            const containerPergunta = document.querySelector(".container" + i);
            containerPergunta.innerHTML += arr[j];
        }
    }
}

let i = 0;
function receberResposta(selected) {

    //if (resposta !== undefined) return;
    console.log(selected);
    resposta = selected;

    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
        //console.log(quizz.questions[i].answers[j].isCorrectAnswer)
        if (quizz.questions[i].answers[j].isCorrectAnswer === true) {
            const certa = document.querySelector(`.container${i} .opção${j}`);
            certa.classList.add("resposta-correta");
            certa.removeAttribute('onclick');
            //console.log("entrou")
        } else {
            const errada = document.querySelector(`.container${i} .opção${j}`);
            errada.classList.add("resposta-errada");
            errada.removeAttribute('onclick');
            //console.log("entrouElse")
        }
        let caixaBranca = document.querySelector(`.container${i} .opção${j}`);
        if (!resposta.isEqualNode(caixaBranca)) {
            caixaBranca.innerHTML += /*HTML*/`<div class="caixa-branca"></div>`;
        }
    }
    i++;
    setTimeout(rolarProximoQuizz, 2000);
    function rolarProximoQuizz() {
        const proximoQuizz = document.querySelector(`.container${i}`);
        proximoQuizz.scrollIntoView({block: "center", behavior: "smooth"});
    }
}




//embaralhar as respostas de cada pergunta
function comparador() {
    return Math.random() - 0.5;
}