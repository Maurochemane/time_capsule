const express = require('express');
const router = express.Router();
const fs = require('fs');

// Ler o ficheiro JSON com as contas
const dados = JSON.parse(fs.readFileSync('././data/plano_de_contas_moc.json', 'utf8'));

// Palavras comuns que não ajudam na pesquisa (ex: “uma”, “de”, “e”)
const stopwords = ['em', 'de', 'a', 'o', 'com', 'para', 'e', 'do', 'da', 'uma', 'um', 'diversos', 'diversas'];

// Rota GET para /api/contas?q=viatura
router.get('/', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.json([]);

  // Separar as palavras da pesquisa e remover as irrelevantes
  const palavras = query
    .split(/\s+/)
    .filter(p => !stopwords.includes(p));

  let resultados = [];

  // Procurar nos dados do plano de contas
  dados.contas.forEach(classe => {
    classe.Contas.forEach(conta => {
      const nomeConta = conta.Nome?.toLowerCase() || "";
      const matchConta = palavras.some(p => nomeConta.includes(p));

      // Verifica se a conta principal corresponde
      if (matchConta) {
        resultados.push({
          classe: classe.Classe,
          conta: conta.Conta,
          nome: conta.Nome,
          nome_classe: classe.Nome,
          Subconta:conta.Subcontas
        });
      }

      // Verifica as subcontas (se existirem)
      if (conta.Subcontas) {
        conta.Subcontas.forEach(Subcontas => {
          const nomeSub = Subcontas.Nome?.toLowerCase() || "";
          const matchSub = palavras.some(p => nomeSubcontas.includes(p));

          if (matchSub) {
            resultados.push({
              classe: classe.Classe,
              conta: Subcontas.Conta,
              nome: Subcontas.Nome,
              nome_classe: classe.Nome
            });
          }

          // Sub-subcontas (caso haja)
          if (Subcontas.Subcontas) {
            sub.Subcontas.forEach(Subcontas => {
              const nomeSubcontas = Subcontas.Nome?.toLowerCase() || "";
              const matchSubcontas = palavras.some(p => nomeSubcontas.includes(p));

              if (matchSubcontas) {
                resultados.push({
                  classe: classe.Classe,
                  conta: Subcontas.Conta,
                  nome: Subcontas.Nome,
                  nome_classe: classe.Nome
                });
              }
            });
          }
        });
      }
    });
  });

  res.json(resultados);
});

module.exports = router;
