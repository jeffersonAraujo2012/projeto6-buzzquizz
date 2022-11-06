const novoQuiz = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [
    {
      title: "Título da pergunta 1",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 2",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 3",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Título do nível 1",
      image: "https://http.cat/411.jpg",
      text: "Descrição do nível 1",
      minValue: 0,
    },
    {
      title: "Título do nível 2",
      image: "https://http.cat/412.jpg",
      text: "Descrição do nível 2",
      minValue: 50,
    },
  ],
};

let numDeNiveis;

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

     <button type="submit" class="btnProsseguir" onclick='nextPage(event)'>
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
    throw "O titulo da pergunta precisa ter entre 20 e 65 caracteres";
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
    throw "O campo de imagem precisa ser preenchido com uma URL";
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
    throw "O numero de perguntas deve ser no mínimo 3";
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
    throw "O numero de níveis deve ser no mínimo 2";
  }
}

function nextPage(e) {
  e.preventDefault();

  try {
    if (
      validarTitulo() &&
      validarURL() &&
      validarNumPerguntas() &&
      validarNumNiveis()
    ) {
      const titulo = document.querySelector(".quizz-titulo").value;
      const imagem = document.querySelector(".quizz-imagem").value;
      const numDePerguntas = Number(
        document.querySelector(".quizz-num-perguntas").value
      );
      numDeNiveis = Number(document.querySelector(".quizz-num-niveis").value);

      novoQuiz.title = titulo;
      novoQuiz.image = imagem;
      criarPerguntas(numDePerguntas);
    }
  } catch (e) {
    alert(e);
  }
}
