let nivelMaximizado;

//VIEW
function criarNiveis() {
  app.innerHTML = "";
  const criarNivel = document.createElement("div");
  criarNivel.classList.add("criar-quizz");

  criarNivel.innerHTML = /*HTML*/ `
    <div class="criar-quizz">
      <h2 class="criar-quizz__titulo">Agora, decida os níveis</h2>
      <form class="criar-quizz__form">
        ${(() => {
          let niveis = "";
          for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
            niveis += /*HTML*/ `
              <section class="nivel-${nivel} wrapper ${
              nivel !== 1 ? "wrapper--minimizada" : ""
            }">
                <section class="nivel">
                  <h3>Nível ${nivel}</h3>
                  <img
                    src="./imagens/editar-icone.svg"
                    alt="editar"
                    class="btn-editar-pergunta"
                    onclick="btnEditarNivelClickController(this)"
                  />
                  <input
                    id="nivel-${nivel}"
                    type="text"
                    class="quizz-input"
                    placeholder="Título do nível"
                  />
                  <input
                    id="nivel-${nivel}-acerto-minino"
                    type="text"
                    class="quizz-input"
                    placeholder="% de acerto mínima"
                  />
                  <input
                    id="nivel-${nivel}-imagem"
                    type="text"
                    class="quizz-input"
                    placeholder="URL da imagem do nível"
                  />
                  <input
                    id="nivel-${nivel}-descricao"
                    type="text"
                    class="quizz-input"
                    placeholder="Descrição do nível"
                  />
                </section>
              </section>
            `;
          }
          return niveis;
        })()}

        <button type="submit" class="btnProsseguir" onclick="btnProsseguirClickController(event)">
          Finalizar Quizz
        </button>
      </form>
    </div>
  `;
  app.appendChild(criarNivel);
  nivelMaximizado = document.querySelector(".nivel-1");
}

//CONTROLLERS
function validarTitulos() {
  for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
    const titulo = document.getElementById(`nivel-${nivel}`).value;
    const tamanhoTitulo = titulo.length;
    if (tamanhoTitulo < 10) return false;
  }

  return true;
}

function validarPorcentagens() {
  let existPorcentagemZero = false;
  for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
    //console.log(`nivel-${nivel}-acerto-minino`);
    const porcentagem = document.getElementById(
      `nivel-${nivel}-acerto-minino`
    ).value;
    const porcentagemEmNumero = Number(porcentagem);

    if (
      porcentagemEmNumero < 0 ||
      porcentagemEmNumero > 100 ||
      isNaN(porcentagemEmNumero)
    ) {
      return false;
    }

    if (porcentagemEmNumero === 0 && porcentagem !== "") {
      existPorcentagemZero = true;
    }
  }

  if (!existPorcentagemZero) return false;
  return true;
}

function validarImagens() {
  for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
    const imagem = document.getElementById(`nivel-${nivel}-imagem`).value;
    const formatoURL = /^(https?:\/\/)/gim;

    const ehUrl = Boolean(imagem.match(formatoURL));

    if (!ehUrl) return false;
  }

  return true;
}

function validarDescricoes() {
  for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
    const descricao = document.getElementById(`nivel-${nivel}-descricao`).value;
    const tamanhoDescricao = descricao.length;
    if (tamanhoDescricao < 30) return false;
  }

  return true;
}

function btnEditarNivelClickController(btn) {
  const sessao = btn.parentElement.parentElement;
  sessao.classList.remove("wrapper--minimizada");
  nivelMaximizado.classList.add("wrapper--minimizada");
  nivelMaximizado = sessao;
  sessao.scrollIntoView(true, { behavior: "smooth" });
  window.scroll({ top: 70, left: 0, behavior: "smooth" });
}

function btnProsseguirClickController(event) {
  event.preventDefault();
  if (
    validarTitulos() &&
    validarPorcentagens() &&
    validarImagens() &&
    validarDescricoes()
  ) {
    let niveis = [];

    for (let nivel = 1; nivel <= numDeNiveis; nivel++) {
      const titulo = document.getElementById(`nivel-${nivel}`).value;
      const porcentagem = document.getElementById(
        `nivel-${nivel}-acerto-minino`
      ).value;
      const imagem = document.getElementById(`nivel-${nivel}-imagem`).value;
      const descricao = document.getElementById(
        `nivel-${nivel}-descricao`
      ).value;

      niveis.push({
        title: titulo,
        image: imagem,
        text: descricao,
        minValue: porcentagem,
      });
    }

    novoQuiz.levels = niveis;
    criarQuizz();
    console.log("Prosseguindo...");
  } else {
    console.log(validarTitulos());
    console.log(validarPorcentagens());
    console.log(validarImagens());
    console.log(validarDescricoes());
    alert("Preencha o formulário corretamente.");
  }
}
