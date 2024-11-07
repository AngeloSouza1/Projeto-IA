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
          id: {
            isVisible: { list: true, edit: false, filter: true, show: true },
          },
          email: {
            isVisible: { list: true, edit: true, filter: true, show: true },
          },
          password: {
            type: 'string',
            isVisible: { list: false, edit: true, filter: false, show: false },
          },
          password_digest: {  // Atualize para 'password_digest' para corresponder ao banco de dados
            isVisible: false,
          },
          role: {
            type: 'string',
            availableValues: [
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
              { value: 'tmp', label: 'TMP' },
            ],
            default: 'user',
          },
          createdAt: {
            isVisible: { list: true, edit: false, filter: true, show: true },
            label: 'Created At',
          },
          updatedAt: {
            isVisible: { list: true, edit: false, filter: true, show: true },
            label: 'Updated At',
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (!request.payload.role) {
                request.payload.role = 'user';
              }
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password_digest: await bcrypt.hash(request.payload.password, 10),  // Atualize para 'password_digest'
                };
                delete request.payload.password;
              } else {
                throw new Error("Password is required");
              }
              return request;
            },
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
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      // Atualize para comparar com 'user.password_digest'
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
