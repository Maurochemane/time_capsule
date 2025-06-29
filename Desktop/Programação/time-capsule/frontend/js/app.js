document.getElementById('capsule-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:3000/api/capsules', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('response').textContent = 'Cápsula guardada com sucesso!';
      form.reset();
    } else {
      document.getElementById('response').textContent = `Erro: ${data.error || 'Falha ao guardar'}`;
    }
  } catch (err) {
    document.getElementById('response').textContent = 'Erro ao conectar com o servidor.';
    console.error(err);
  }
});
