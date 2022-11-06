let perguntaMaximizada;
let numPerguntas;

//VIEW
function criarPerguntas(numeroPerguntas) {
  numPerguntas = numeroPerguntas;

  const criarQuizz = document.querySelector("div");
  criarQuizz.classList.add("criar-quizz");

  criarQuizz.innerHTML = /*HTML*/ `
    <h2 class="criar-quizz__titulo">Crie suas perguntas</h2>
    <form class="criar-quizz__form">
      ${(() => {
        let perguntas = "";
        for (let i = 1; i <= numPerguntas; i++) {
          console.log(perguntas);
          perguntas += /*HTML*/ `
            <section class="pergunta-${i} wrapper ${
            i !== 1 ? "wrapper--minimizada" : ""
          }">
              <section class="pergunta">
                <h3>Pergunta ${i}</h3>
                <img
                  src="./imagens/editar-icone.svg"
                  alt="editar"
                  class="btn-editar-pergunta"
                  onclick="btnEditarPerguntaClickController(this)"
                />
                <input
                  id="pergunta-${i}"
                  type="text"
                  class="quizz-input"
                  placeholder="Texto da pergunta"
                />
                <input
                  id="pergunta-${i}-cor"
                  type="text"
                  class="quizz-input"
                  placeholder="Cor de fundo da pergunta"
                />
              </section>
      
              <section class="respostas-corretas">
                <h3>Resposta correta</h3>
                <input
                  id="pergunta-${i}-resposta-correta"
                  type="text"
                  class="quizz-input"
                  placeholder="Resposta correta"
                />
                <input
                  id="pergunta-${i}-resposta-correta-imagem"
                  type="text"
                  class="quizz-input"
                  placeholder="URL da imagem"
                />
              </section>
      
              <section class="respostas-incorretas">
                <h3>Resposta incorreta</h3>
                <div>
                  <input
                    id="pergunta-${i}-resposta-incorreta-1"
                    type="text"
                    class="quizz-input"
                    placeholder="Resposta incorreta 1"
                  />
                  <input
                    id="pergunta-${i}-resposta-incorreta-imagem-1"
                    type="text"
                    class="quizz-input"
                    placeholder="URL da imagem 1"
                  />
                </div>
      
                <div>
                  <input
                    id="pergunta-${i}-resposta-incorreta-2"
                    type="text"
                    class="quizz-input"
                    placeholder="Resposta incorreta 2"
                  />
                  <input
                    id="pergunta-${i}-resposta-incorreta-imagem-2"
                    type="text"
                    class="quizz-input"
                    placeholder="URL da imagem 2"
                  />
                </div>
      
                <div>
                  <input
                    id="pergunta-${i}-resposta-incorreta-3"
                    type="text"
                    class="quizz-input"
                    placeholder="Resposta incorreta 3"
                  />
                  <input
                    id="pergunta-${i}-resposta-incorreta-imagem-3"
                    type="text"
                    class="quizz-input"
                    placeholder="URL da imagem 3"
                  />
                </div>
              </section>
            </section>
          `;
        }
        return "" + perguntas;
      })()}

      <button type="submit" class="btnProsseguir" onclick="btnProsseguirNiveisClickController(event)">
        Prosseguir pra criar níveis
      </button>
    </form>
  `;

  perguntaMaximizada = document.querySelector("section.pergunta-1");
}

//CONTROLLERS
function validarPerguntas() {
  for (let i = 1; i <= numPerguntas; i++) {
    const pergunta = document.getElementById(`pergunta-${i}`).value;
    const tamanhoPergunta = pergunta.length;

    if (tamanhoPergunta < 20) return false;
  }

  return true;
}

function validarCores() {
  for (let i = 1; i <= numPerguntas; i++) {
    const cor = document.getElementById(`pergunta-${i}-cor`).value;
    const formato = /^#[\d\D]{6}/gm;

    if (!cor.match(formato)) return false;
  }

  return true;
}

function validarRespostasCorretas() {
  for (let i = 1; i <= numPerguntas; i++) {
    const respostaCorreta = document.getElementById(
      `pergunta-${i}-resposta-correta`
    ).value;
    const ehVazia = !Boolean(respostaCorreta);

    if (ehVazia) return false;
  }

  return true;
}

function validarImagensRespostasCorretas() {
  for (let i = 1; i <= numPerguntas; i++) {
    const imagem = document.getElementById(
      `pergunta-${i}-resposta-correta-imagem`
    ).value;
    const formatoURL = /^(https?:\/\/)/gim;

    const ehUrl = Boolean(imagem.match(formatoURL));

    if (!ehUrl) return false;
  }

  return true;
}

function validarRespostasIncorretas() {
  const formatoURL = /^(https?:\/\/)/gim;
  let respostasIncorretasPreenchidas = 0;
  let numFalhas = 0;
  let respostasParcialmentePreenchidas = 0;
  let urlsErradas = 0;
  for (let pergunta = 1; pergunta <= numPerguntas; pergunta++) {
    const respostasIncorretas = document.querySelectorAll(
      `.pergunta-${pergunta}>.respostas-incorretas>div`
    );
    Array.from(respostasIncorretas).forEach((respostaIncorreta, indice) => {
      const resposta = document.getElementById(
        `pergunta-${pergunta}-resposta-incorreta-${indice + 1}`
      ).value;
      const imagem = document.getElementById(
        `pergunta-${pergunta}-resposta-incorreta-imagem-${indice + 1}`
      ).value;
      console.log(imagem);

      const ehImagemPreenchida = Boolean(imagem);
      const ehTextoRespostaPreenchido = Boolean(resposta);
      const ehURL = Boolean(imagem.match(formatoURL));
      const ehRespostaPreenchida = Boolean(resposta) && Boolean(imagem);

      if (ehRespostaPreenchida) respostasIncorretasPreenchidas++;
      if (ehRespostaPreenchida && !ehURL) urlsErradas++;

      if (ehTextoRespostaPreenchido && !ehImagemPreenchida)
        respostasParcialmentePreenchidas++;
      if (!ehTextoRespostaPreenchido && ehImagemPreenchida)
        respostasParcialmentePreenchidas++;

      console.log("resposta preenchida" + ehRespostaPreenchida);
      if (!ehRespostaPreenchida) numFalhas++;
    });
    if (numFalhas === 3) return false;
    if (respostasParcialmentePreenchidas > 0) return false;
    if (urlsErradas > 0) return false;
    numFalhas = 0;
    respostasParcialmentePreenchidas = 0;
    urlsErradas = 0;
  }

  if (respostasIncorretasPreenchidas === 0) return false;

  return true;
}

function btnEditarPerguntaClickController(btn) {
  const sessao = btn.parentElement.parentElement;
  sessao.classList.remove("wrapper--minimizada");
  perguntaMaximizada.classList.add("wrapper--minimizada");
  perguntaMaximizada = sessao;
  sessao.scrollIntoView(true, { behavior: "smooth" });
  window.scroll({ top: 70, left: 0, behavior: "smooth" });
}

function btnProsseguirNiveisClickController(event) {
  event.preventDefault();
  if (
    validarPerguntas() &&
    validarCores() &&
    validarRespostasCorretas() &&
    validarImagensRespostasCorretas() &&
    validarRespostasIncorretas()
  ) {
    const perguntas = [];
    for (let pergunta = 1; pergunta <= numPerguntas; pergunta++) {
      const titulo = document.getElementById(`pergunta-${pergunta}`).value;
      const cor = document.getElementById(`pergunta-${pergunta}-cor`).value;
      const respostaCorreta = document.getElementById(
        `pergunta-${pergunta}-resposta-correta`
      ).value;
      const imagem = document.getElementById(
        `pergunta-${pergunta}-resposta-correta-imagem`
      ).value;
      const respostasIncorretas = document.querySelectorAll(
        `.pergunta-${pergunta}>.respostas-incorretas>div`
      );

      perguntas.push({
        title: titulo,
        color: cor,
        answers: [
          {
            text: respostaCorreta,
            image: imagem,
            isCorrectAnswer: true,
          },
        ],
      });

      Array.from(respostasIncorretas).forEach((respostaIncorreta, indice) => {
        const textoRespostaIncorreta = document.getElementById(
          `pergunta-${pergunta}-resposta-incorreta-${indice + 1}`
        ).value;
        const imagemRespostaIncorreta = document.getElementById(
          `pergunta-${pergunta}-resposta-incorreta-imagem-${indice + 1}`
        ).value;

        if (textoRespostaIncorreta && imagemRespostaIncorreta) {
          perguntas[pergunta - 1].answers.push({
            text: textoRespostaIncorreta,
            image: imagemRespostaIncorreta,
            isCorrectAnswer: false,
          });
        }
      });
    }
    novoQuiz.questions = perguntas;
    criarNiveis();
  } else {
    console.log(validarPerguntas());
    console.log(validarCores());
    console.log(validarRespostasCorretas());
    console.log(validarImagensRespostasCorretas());
    console.log(validarRespostasIncorretas());
    alert("Preencha o formulário corretamente");
  }
}
