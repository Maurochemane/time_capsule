// Função para realizar a pesquisa ao servidor

function pesquisar() {
  const termo = document.getElementById("pesquisa").value;

  fetch(`/api/pesquisar?termo=${encodeURIComponent(termo)}`)
    .then((res) => res.json())
    .then((data) => {
      const sub = document.getElementById("subconta");
      const cont = document.getElementById("conta");
      const clas = document.getElementById("classe");

      if (data.encontrado) {
        cont.innerHTML = `
        ${data.resultado.classe}<br>`;
        clas.innerHTML = `
         ${data.resultado.conta}<br>`;
        sub.innerHTML = `
             ${data.resultado.subconta || "?"}>`;
      } else {
        cont.textContent = "Conta não encontrada.";
        div.textContent = "Conta não encontrada.";
        clas.textContent = "Conta não encontrada.";
      }
    });
}

// Função para procurar uma conta (em estrutura local, caso necessário)
function procurarConta(lista, termo, contexto = {}) {
  const termoLower = termo.toLowerCase();

  for (const item of lista) {
    const numero = String(item.Conta || "").toLowerCase();
    const nome = String(item.Nome || "").toLowerCase();
    const classe = string(item.classe || "").toLowerCase();

    const encontrou = numero === termoLower || nome.includes(termoLower);
    if (encontrou) {
      return {
        ...contexto,
        conta: `${item.Conta}  ${item.Nome}  ${item.classe}`,
      };
    }

    // Verificar se há subcontas
    if (item.Subcontas) {
      const novoContexto = {...contexto};

      if (!novoContexto.conta && item.Conta && item.Nome && item.classe) {
        novoContexto.conta = `${item.Conta} - ${item.Nome} - ${item.classe}`;
      } else if (
        !novoContexto.subconta &&
        item.Conta &&
        item.Nome - item.classe
      ) {
        novoContexto.subconta = `${item.Conta} - ${item.Nome} - ${item.classe}`;
      } else if (
        !novoContexto.subsubconta &&
        item.Conta &&
        item.Nome &&
        item.classe
      ) {
        novoContexto.subsubconta = `${item.Conta} - ${item.Nome} - ${item.classe}`;
      }

      const resultado = procurarConta(item.Subcontas, termo, novoContexto);
      if (resultado) return resultado;
    }
  }

  return null;
}

/*
function pesquisar() {
  const termo = document.getElementById("pesquisa").value.trim();

  if (!termo) {
    document.getElementById("resultado").textContent = "Insira um termo de pesquisa.";
    return;
  }

  fetch(`/api/pesquisar?termo=${encodeURIComponent(termo)}`)
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("resultado");

      if (data.encontrado) {
        let html = `<strong>Classe:</strong> ${data.resultado.classe}<br>`;

        if (data.resultado.conta) {
          html += `<strong>Conta:</strong> ${data.resultado.conta}<br>`;
        }

        if (data.resultado.subconta) {
          html += `<strong>Subconta:</strong> ${data.resultado.subconta}<br>`;
        }

        if (data.resultado.subsubconta) {
          html += `<strong>Sub-subconta:</strong> ${data.resultado.subsubconta}<br>`;
        }

        div.innerHTML = html;
      } else {
        div.textContent = "Conta não encontrada.";
      }
    })
    .catch(error => {
      console.error("Erro ao pesquisar:", error);
      document.getElementById("resultado").textContent = "Erro ao realizar a pesquisa.";
    });
}
*/
