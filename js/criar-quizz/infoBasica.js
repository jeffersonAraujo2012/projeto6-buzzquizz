const infoBasica = () => {
  app.innerHTML = "";
  viewInfoBasic();
};

//VIEW
function viewInfoBasic() {
  const criarQuiz = document.createElement("div");
  criarQuiz.classList.add("criar-quizz");
  criarQuiz.innerHTML = /*HTML*/ `
   <h2 class="criar-quizz__titulo">Comece pelo começo</h2>
   <form class="criar-quizz__form">
     <div class="wrapper">
       <input
         type="text"
         class="quizz-input quizz-titulo"
         placeholder="Título do seu quizz"
       />
       <input
         type="text"
         class="quizz-input quizz-imagem"
         placeholder="URL da imagem do seu quizz"
       />
       <input
         type="number"
         class="quizz-input quizz-num-perguntas"
         placeholder="Quantidade de perguntas do quizz"
         validationMessage="Por favor, entre com um numero"
       />
       <input
         type="number"
         class="quizz-input quizz-num-niveis"
         placeholder="Quantidade de níveis do quizz"
         validationMessage="Por favor, entre com um numero"
       />
     </div>

     <button type="submit" class="btnProsseguirPerguntas" onclick='nextPage(event)'>
       Prosseguir pra criar perguntas
     </button>
   </form>
 `;

  app.appendChild(criarQuiz);
}

//CONTROLLERS
function validarTitulo() {
  const MINIMO_DE_CARACTERES = 20;
  const MAXIMO_DE_CARACTERES = 65;

  const inputTitulo = document.querySelector(".quizz-titulo");
  const inputTituloValue = inputTitulo.value;

  if (
    inputTituloValue.length >= MINIMO_DE_CARACTERES &&
    inputTituloValue.length <= MAXIMO_DE_CARACTERES
  ) {
    return true;
  } else {
    return false;
  }
}

function validarURL() {
  const quizzImagem = document.querySelector(".quizz-imagem");
  const quizzImagemValue = quizzImagem.value;

  const formatoURL = /^(https?:\/\/)/gim;
  const ehURL = Boolean(quizzImagemValue.match(formatoURL));

  if (ehURL) {
    return true;
  } else {
    return false;
  }
}

function validarNumPerguntas() {
  const quizzNumPerguntas = document.querySelector(".quizz-num-perguntas");
  const quizzNumPerguntasValue = Number(quizzNumPerguntas.value);

  if (isNaN(quizzNumPerguntasValue)) {
    throw "O valor passado para o numero de perguntas não é um numero";
  }

  if (quizzNumPerguntasValue >= 3) {
    return true;
  } else {
    return false;
  }
}

function validarNumNiveis() {
  const quizzNumNiveis = document.querySelector(".quizz-num-niveis");
  const quizzNumNiveisValue = Number(quizzNumNiveis.value);

  if (isNaN(quizzNumNiveisValue)) {
    throw "O valor passado para o numero de Niveis não é um numero";
  }

  if (quizzNumNiveisValue >= 2) {
    return true;
  } else {
    return false;
  }
}

function nextPage(e) {
  e.preventDefault();
  if (
    validarTitulo() &&
    validarURL() &&
    validarNumPerguntas() &&
    validarNumNiveis()
  ) {
    console.log("PRÓXIMA PÁGINA CHAMADA");
  } else {
    alert("Preencha corretamente os campos");
    console.log(validarTitulo());
    console.log(validarURL());
    console.log(validarNumPerguntas());
    console.log(validarNumNiveis());
  }
}