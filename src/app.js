import express from 'express';
import { adminJs, adminRouter } from './config/admin.js';
import sequelize from './config/database.js';

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Rota do AdminJS
app.use(adminJs.options.rootPath, adminRouter);

// Sincronização com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export default app;
