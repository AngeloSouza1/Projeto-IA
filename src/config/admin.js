// src/config/admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import bcrypt from 'bcrypt';
import sequelize from './database.js';
import User from '../models/User.js';

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          id: { isVisible: { list: true, edit: false, filter: true, show: true } },
          email: { isVisible: { list: true, edit: true, filter: true, show: true } },
          name: { isVisible: { list: true, edit: true, filter: true, show: true } },
          password: {
            type: 'string',
            isVisible: { list: false, edit: true, filter: false, show: false },
          },
          password_digest: {
            isVisible: false,
          },
          role: {
            type: 'string',
            availableValues: [
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
              { value: 'tmp', label: 'TMP' },
            ],
            default: 'admin',
          },
          createdAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
          updatedAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
        },
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin', // Apenas 'admin' pode criar
            before: async (request) => {
              if (!request.payload.role) {
                request.payload.role = 'admin';
              }
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password_digest: await bcrypt.hash(request.payload.password, 10),
                };
                delete request.payload.password;
              } else {
                throw new Error("Password is required");
              }
              return request;
            },
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin', // Apenas 'admin' pode editar
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin', // Apenas 'admin' pode deletar
          },
        },
      },
    },
  ],
});

const sessionOptions = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY,
  cookie: { secure: process.env.NODE_ENV === 'production' },
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password_digest)) {
        return user;
      }
      return null;
    },
    cookiePassword: process.env.SECRET_KEY,
  },
  null,
  sessionOptions
);

export { adminJs, adminRouter };
