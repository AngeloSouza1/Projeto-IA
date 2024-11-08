import app from './app.js';

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    return;
  }
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
