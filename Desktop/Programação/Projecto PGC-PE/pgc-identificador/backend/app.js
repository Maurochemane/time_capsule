/*const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Carregar o ficheiro JSON com as contas
const dados = JSON.parse(fs.readFileSync(path.join(__dirname, 'dados.json'), 'utf8'));

// Servir os ficheiros da pasta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Página principal (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API para pesquisar contas
/*app.get('/api/pesquisar', (req, res) => {
  const termo = req.query.termo?.toLowerCase();
  if (!termo) {
    return res.json({ encontrado: false, resultado: null });

  }
    app.get('/api/pesquisar', (req, res) => {
      console.log('Requisição recebida:', req.query);  // Log para verificar os parâmetros
    
      const termo = req.query.termo;
      if (!termo) {
        return res.json({ encontrado: false, resultado: null });
      }
    
      const termoLowerCase = termo.toLowerCase();
      // O resto do código continua como antes
    });
    

  let resultado = null;

  for (const classe of dados) {
    for (const conta of classe.contas) {
      const contaMatch =
        conta.numero === termo ||
        conta.designacao.toLowerCase().includes(termo);

      if (contaMatch) {
        resultado = {
          classe: `${classe.classe} - ${classe.designacao}`,
          conta: `${conta.numero} - ${conta.designacao}`,
        };
      }

      if (conta.subcontas) {
        for (const sub of conta.subcontas) {
          const subMatch =
            sub.numero === termo ||
            sub.designacao.toLowerCase().includes(termo);

          if (subMatch) {
            resultado = {
              classe: `${classe.classe} - ${classe.designacao}`,
              conta: `${conta.numero} - ${conta.designacao}`,
              subconta: `${sub.numero} - ${sub.designacao}`,
            };
          }

          // Sub-subcontas
          if (sub.subcontas) {
            for (const subsub of sub.subcontas) {
              const subsubMatch =
                subsub.numero === termo ||
                subsub.designacao.toLowerCase().includes(termo);

              if (subsubMatch) {
                resultado = {
                  classe: `${classe.classe} - ${classe.designacao}`,
                  conta: `${conta.numero} - ${conta.designacao}`,
                  subconta: `${sub.numero} - ${sub.designacao}`,
                  subsubconta: `${subsub.numero} - ${subsub.designacao}`,
                };
              }
            }
          }
        }
      }
    }
  }

  res.json({ encontrado: !!resultado, resultado });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});*/

/*const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Carregar o ficheiro JSON com as contas
const dados = JSON.parse(fs.readFileSync(path.join(__dirname, 'dados.json'), 'utf8'));

// Servir os ficheiros da pasta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Função recursiva para pesquisar contas
function procurarConta(lista, termo, contexto = {}) {
  for (const item of lista) {
    const numero = item.Conta?.toLowerCase?.() || '';
    const nome = item.Nome?.toLowerCase?.() || '';

    const termoLower = termo.toLowerCase();
    if (numero === termoLower || nome.includes(termoLower)) {
      return {
        ...contexto,
        conta: `${item.Conta} - ${item.Nome}`
      };
    }

    if (item.Subcontas) {
      const novaContexto = { ...contexto };
      if (!novaContexto.conta && item.Conta && item.Nome) {
        novaContexto.conta = `${item.Conta} - ${item.Nome}`;
      } else if (!novaContexto.subconta && item.Conta && item.Nome) {
        novaContexto.subconta = `${item.Conta} - ${item.Nome}`;
      } else if (!novaContexto.subsubconta && item.Conta && item.Nome) {
        novaContexto.subsubconta = `${item.Conta} - ${item.Nome}`;
      }

      const resultado = procurarConta(item.Subcontas, termo, novaContexto);
      if (resultado) return resultado;
    }
  }

  return null;
}

// Endpoint de pesquisa
app.get('/api/pesquisar', (req, res) => {
  const termo = req.query.termo;
  if (!termo) {
    return res.json({ encontrado: false, resultado: null });
  }

  let resultado = null;

  for (const sec of dados) {
    const classe = sec.Classe || sec.contas?.[0]?.Classe;
    const nomeClasse = sec.Nome || sec.contas?.[0]?.Nome;
    const contexto = { classe: `${classe} - ${nomeClasse}` };

    const contas = sec.Contas || sec.contas; // garantir compatibilidade
    const resultadoParcial = procurarConta(contas, termo, contexto);
    if (resultadoParcial) {
      resultado = resultadoParcial;
      break;
    }
  }

  res.json({ encontrado: !!resultado, resultado });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});*/

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Carregar o ficheiro JSON com as contas
const dados = JSON.parse(fs.readFileSync(path.join(__dirname, 'dados.json'), 'utf8'));

// Servir os ficheiros da pasta 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Página principal (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// API para pesquisar contas
app.get('/api/pesquisar', (req, res) => {
  const termo = req.query.termo;
  if (!termo) {
    return res.json({ encontrado: false, resultado: null });
  }

  let resultado = null;

  // Função de busca
  function procurar(lista, contexto = {}) {
    const termoLower = termo.toLowerCase();  // Convertendo o termo para minúsculo para comparação

    // Verifica se lista é um array antes de iterar
    if (!Array.isArray(lista)) return null;

    for (const item of lista) {
      const numero = String(item.Conta || '').toLowerCase();  // Conta em minúsculo
      const nome = String(item.Nome || '').toLowerCase();  // Nome da conta em minúsculo

      // Verifica se o termo corresponde ao número ou nome
      if (numero === termoLower || nome === termoLower) {
        return {
          ...contexto,
          conta: `${item.Conta} - ${item.Nome}`
        };
      }

      // Se houver subcontas, faz a busca nelas
      if (item.Subcontas) {
        const novoContexto = { ...contexto };

        // Organiza o contexto com conta, subconta e subsubconta
        if (!novoContexto.conta && item.Conta && item.Nome) {
          novoContexto.conta = `${item.Conta} - ${item.Nome}`;
        } else if (!novoContexto.subconta && item.Conta && item.Nome) {
          novoContexto.subconta = `${item.Conta} - ${item.Nome}`;
        } else if (!novoContexto.subsubconta && item.Conta && item.Nome) {
          novoContexto.subsubconta = `${item.Conta} - ${item.Nome}`;
        }

        // Chama a função recursivamente para subcontas
        const resultadoInterno = procurar(item.Subcontas, novoContexto);
        if (resultadoInterno) return resultadoInterno;
      }
    }

    return null;
  }

  // Pesquisa nas classes
  for (const classe of dados) {
    const resultadoClasse = procurar(classe.Contas, {
      classe: `${classe.Classe} - ${classe.Nome}`
    });

    if (resultadoClasse) {
      resultado = resultadoClasse;
      break;
    }
  }

  // Retorna o resultado da pesquisa
  res.json({ encontrado: !!resultado, resultado });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});
 