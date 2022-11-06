let quizz;
let arr = [];
let qtdRespondida = 0;
let qtdAcertos = 0;
let percentualAcertos = 0;
let resultadoTitle = '';
let resultadoImage = '';
let resultadoText = '';

// começarQuizz();
function começarQuizz(quizzId) {
    app.innerHTML = '';
    const promessa = axios.get(
        `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`
    );
    promessa.then((res) => responderQuizz(res.data));
}

function responderQuizz(quizzRecebido) {
    quizz = quizzRecebido;
    const app = document.querySelector(".app");
    app.innerHTML = /*HTML*/`
    <div class="cabeçalho-tela2">
    <p class="titulo-quizz">${quizz.title}</p></div>
    <div class="container-tela2">
    `;
    const cabeçalhoTela2 = document.querySelector(".cabeçalho-tela2");
    cabeçalhoTela2.style.backgroundImage = /*HTML*/`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizz.image})`;

    const containerTela2 = document.querySelector(".container-tela2");
    for (let i = 0; i < quizz.questions.length; i++) {
        containerTela2.innerHTML += /*HTML*/
            `<div class="container-quizz container${i}" data-pergunta=${i}>
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


function receberResposta(selected) {
    const perguntaPertencente = selected.parentElement.dataset.pergunta;

    for (let j = 0; j < quizz.questions[perguntaPertencente].answers.length; j++) {
        if (quizz.questions[perguntaPertencente].answers[j].isCorrectAnswer === true) {
            const certa = document.querySelector(`.container${perguntaPertencente} .opção${j}`);
            certa.classList.add("resposta-correta");
            certa.removeAttribute('onclick');
        } else {
            const errada = document.querySelector(`.container${perguntaPertencente} .opção${j}`);
            errada.classList.add("resposta-errada");
            errada.removeAttribute('onclick');
        }
        let caixaBranca = document.querySelector(`.container${perguntaPertencente} .opção${j}`);
        if (!selected.isEqualNode(caixaBranca)) {
            caixaBranca.innerHTML += /*HTML*/`<div class="caixa-branca"></div>`;
        }
    }
    if (selected.classList.contains("correctOne")) {
        qtdAcertos++;
    }

    setTimeout(rolarProximoQuizz, 2000);
    function rolarProximoQuizz() {
        const proximoQuizz = document.querySelector(`.container${Number(perguntaPertencente) + 1}`);
        proximoQuizz.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    qtdRespondida++;
    if (qtdRespondida === quizz.questions.length) {
        percentualAcertos = Math.floor((qtdAcertos / qtdRespondida) * 100);
        pegandoResultado();
    }
}

function pegandoResultado() {
    for (let i = quizz.levels.length - 1; i >= 0; i--) {
        if (percentualAcertos >= quizz.levels[i].minValue) {
            level = i;
            break;
        }
    }
    resultadoTitle = quizz.levels[level].title;
    resultadoImage = quizz.levels[level].image;
    resultadoText = quizz.levels[level].text;
    mostrarResultado();
}

function mostrarResultado() {
    const containerTela2 = document.querySelector(".container-tela2");
    containerTela2.innerHTML += /*HTML*/ `<div class="container-quizz container${qtdRespondida}">
    <div class="container-titulo-resultado">
      <div class="pergunta">${percentualAcertos}% de acerto: Você é ${resultadoTitle}</div>
    </div>
    <div class="container-level">
      <img src=${resultadoImage}>
      <p>${resultadoText}</p>
    </div>
  </div>
  <div class="botoes">
    <button onclick="reiniciarQuizz()" class="button-restart">Reiniciar Quizz</button>
    <button onclick="voltarHome()" class="button-home">Voltar para home</button>
  </div>`
}

// -------REINICIAR QUIZZ-------
function reiniciarQuizz() {
    console.log(quizzId);
    const inicio = document.querySelector(".app");
    inicio.scrollIntoView({ block: "start", behavior: "smooth" });

    arr = [];
    qtdRespondida = 0;
    qtdAcertos = 0;
    percentualAcertos = 0;
    resultadoTitle = '';
    resultadoImage = '';
    resultadoText = '';
    começarQuizz(quizzId);
}

function voltarHome() {
    app.innerHTML = "";
    arr = [];
    qtdRespondida = 0;
    qtdAcertos = 0;
    percentualAcertos = 0;
    resultadoTitle = '';
    resultadoImage = '';
    resultadoText = '';

    const promiseQuizzess = axios.get(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    );
    promiseQuizzess.then((res) => {
        viewMeusQuizzes();
        viewCardQuiz(res.data);
    });
    promiseQuizzess.catch(() =>
        console.log("Algo de errado ocorreu na requisição dos quizzes")
    );
}

//embaralhar as respostas de cada pergunta
function comparador() {
    return Math.random() - 0.5;
}