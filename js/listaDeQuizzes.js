//VIEW
const app = document.querySelector(".app");
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

//Funcao que renderiza a seçao 'meus quizzes'
function viewMeusQuizzes() {
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

  app.appendChild(meusQuizzesSection);
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

  app.appendChild(todosOsQuizzes);
}

//controller
function clickCardQuizController(event) {
  const clicado = event.currentTarget;
  const quizzId = clicado.dataset.quizzId;
  console.log(typeof(clicado));
  console.log(clicado);
  começarQuizz(quizzId);
}

function btnAddQuizClickController() {
  console.log("btnAddQuizClickController");
}

//model
