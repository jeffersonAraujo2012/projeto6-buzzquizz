//VIEW
const app = document.querySelector(".app");
const listaDeQuizzes = document.createElement("div");
listaDeQuizzes.classList.add("lista-de-quizzes");
homePage();

function homePage() {
  app.innerHTML = "";

  //Solicita ao servidor as informações dos quizzes
  const promiseQuizzes = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promiseQuizzes.then((res) => {
    viewMeusQuizzes();
    viewCardQuiz(res.data);
  });
  promiseQuizzes.catch(() =>
    console.log("Algo de errado ocorreu na requisição dos quizzes")
  );
}

//Funcao que renderiza a seçao 'meus quizzes'
function viewMeusQuizzes() {
  let quizzes = localStorage.getItem("meus-quizzes");

  if (quizzes === null) {
    const meusQuizzesSection = document.createElement("section");
    meusQuizzesSection.classList.add("meus-quizzes");

    meusQuizzesSection.innerHTML = /*HTML*/ `
      <p>Você não criou nenhum quizz ainda :(</p>
    `;
    const btnAddQuiz = document.createElement("button");
    btnAddQuiz.classList.add("meus-quizzes__btn-add-quiz");
    btnAddQuiz.innerHTML = "Criar Quizz";

    btnAddQuiz.onclick = () => btnAddQuizClickController();

    meusQuizzesSection.appendChild(btnAddQuiz);
    listaDeQuizzes.appendChild(meusQuizzesSection);
    app.appendChild(listaDeQuizzes);
  } else {
    quizzes = JSON.parse(quizzes);
    const meusQuizzes = document.createElement("section"); //captura a area dos quizzes
    meusQuizzes.classList.add("meus-quizzes--preenchidos"); //adiciona a classe
    meusQuizzes.innerHTML = /*HTML*/ `
      <div class="titulo-secao">
        <h2>Seus Quizzes</h2>
        <button class="btn-add-quizz" onclick="btnAddQuizClickController()">
          <img src="./imagens/mais.svg" alt="adicionar quiz" />
        </button>
      </div>
    `;

    //Para cada quiz no vetor quizzes gera o render
    quizzes.forEach((quizId) => {
      let promise = axios.get(
        `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizId}`
      );
      promise.then((res) => {
        const cardQuiz = document.createElement("div");
        cardQuiz.dataset.quizzId = quizId;
        cardQuiz.classList.add("card-quiz");
        cardQuiz.innerHTML = /*HTML*/ `
          <h3 class="card-quiz__title">${res.data.title}</h3>
        `;
        cardQuiz.style.backgroundImage = `url(${res.data.image})`;

        cardQuiz.onclick = () => clickCardQuizController(event);
        meusQuizzes.appendChild(cardQuiz);
      });
    });
    listaDeQuizzes.appendChild(meusQuizzes);
    app.appendChild(listaDeQuizzes);
  }
}

//Função que renderiza os cards dos quizzes e seçao 'todos os quizzes'
function viewCardQuiz(quizzes) {
  const todosOsQuizzes = document.createElement("section"); //captura a area dos quizzes
  todosOsQuizzes.classList.add("todos-os-quizzes"); //adiciona a classe
  todosOsQuizzes.innerHTML = /*HTML*/ `
    <h2 class="titulo-secao">Todos os Quizzes</h2>
  `;
  console.log(quizzes)
  //Para cada quiz no vetor quizzes gera o render
  quizzes.forEach((quiz) => {
    const cardQuiz = document.createElement("div");
    cardQuiz.dataset.quizzId = quiz.id;
    cardQuiz.classList.add("card-quiz");
    cardQuiz.innerHTML = /*HTML*/ `
      <h3 class="card-quiz__title">${quiz.title}</h3>
    `;
    cardQuiz.style.backgroundImage = `url(${quiz.image})`;

    cardQuiz.onclick = () => clickCardQuizController(event);
    todosOsQuizzes.appendChild(cardQuiz);
  });

  listaDeQuizzes.appendChild(todosOsQuizzes);
}

//controller
let quizzId;
function clickCardQuizController(event) {
  const clicado = event.currentTarget;
  quizzId = clicado.dataset.quizzId;
  // console.log(typeof(clicado));
  // console.log(clicado);
  começarQuizz(quizzId);
}

function btnAddQuizClickController() {
  infoBasica();
  console.log("btnAddQuizClickController");
}

//model
