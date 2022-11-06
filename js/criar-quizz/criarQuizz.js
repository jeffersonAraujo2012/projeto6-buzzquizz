function criarQuizz() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    novoQuiz
  );
  promise.then((res) => {
    let meusQuizzes = localStorage.getItem("meus-quizzes");
    if (meusQuizzes) {
      meusQuizzes = JSON.parse(meusQuizzes);
      meusQuizzes.push(res.data.id);
      meusQuizzes = JSON.stringify(meusQuizzes);
    } else {
      meusQuizzes = [res.data.id];
      meusQuizzes = JSON.stringify(meusQuizzes);
    }
    localStorage.setItem("meus-quizzes", meusQuizzes);
    viewSucesso(res.data);
  });
  promise.catch((err) => console.log(err));
}

function viewSucesso(quizzCriado) {
  app.innerHTML = "";
  const criarQuizzSucesso = document.createElement("div");
  criarQuizzSucesso.classList.add("criar-quizz", "criar-quizz--sucesso");

  criarQuizzSucesso.innerHTML = /*HTML*/ `
    <div class="criar-quizz criar-quizz--sucesso">
      <h2 class="criar-quizz__titulo">Seu quizz está pronto!</h2>
      <div class="card-quiz card-quiz--sucesso"
        style="background-image: url('${quizzCriado.image}');"
        data-quizzId="${quizzCriado.id}"
      >
        <h3 class="card-quiz__title">${quizzCriado.title}</h3>
      </div>
      <button type="submit"
        class="btnProsseguir btnProsseguir--sucesso"
        onclick="btnAcessaQuizClickController(${quizzCriado.id})"
      >
        Acessar Quizz
      </button>
      <button class="btnVoltar" onclick="homePage()">
        Voltar para home
      </button>
    </div>
  `;

  app.appendChild(criarQuizzSucesso);
}

//CONTROLLERS
function btnAcessaQuizClickController(quizzId) {
  começarQuizz(quizzId);
}
