// src/app.js
import express from 'express';
import { adminJs, adminRouter } from './config/admin.js';
import sequelize from './config/database.js';
import path from 'path'; 
import { renderDashboard } from './controllers/dashboardController.js'; // Importar o controlador do dashboard

const app = express();

// Configura a pasta 'public' como estática para servir arquivos estáticos
app.use(express.static(path.join(path.resolve(), 'public')));

// Middleware para parsing JSON
app.use(express.json());

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs'); // Define o mecanismo de visualização como EJS
app.set('views', path.join(path.resolve(), 'src', 'views')); // Define o diretório das views

// Rota do AdminJS
app.use(adminJs.options.rootPath, adminRouter);

// Rota para o dashboard
app.get('/dashboard', renderDashboard); // Adiciona a rota para renderizar o dashboard

// Sincronização com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Database synchronized'); // Log de sucesso
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error); // Log de erro
  });

export default app; // Exporta a aplicação Express
