const form = document.querySelector('#interest-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const endpoint = window.MEDCLINAMEN_ENDPOINT;
  if (!endpoint) {
    status.className = 'error';
    status.textContent = 'A integração da lista de interesse ainda não foi configurada.';
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Enviando…';
  try {
    await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, submittedAt: new Date().toISOString(), source: 'medclinamen-landing' }) });
    form.reset();
    status.className = 'success';
    status.textContent = 'Recebemos seu contato. Obrigado por construir isso com a gente.';
  } catch {
    status.className = 'error';
    status.textContent = 'Não foi possível enviar agora. Tente novamente em alguns instantes.';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Entrar na lista <span>↘</span>';
  }
});
