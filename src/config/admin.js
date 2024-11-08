// src/config/admin.js
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import bcrypt from 'bcrypt';
import sequelize from './database.js';
import User from '../models/User.js';
import Leads from '../models/Lead.js';
import Campaigns from '../models/Campaign.js';
import CampaignLead from '../models/CampaignLead.js';
import campaignLabels from './campaignLabels.js';  // Importa as descrições

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  branding: {
    companyName: 'ProLeadNet',
    logo: '',
    softwareBrothers: false,
    theme: {
      colors: {
        primary100: '#000000',
        primary80: '#333333',
        primary60: '#666666',
        primary40: '#999999',
        primary20: '#cccccc',
        grey100: '#212121',
        grey80: '#424242',
        grey60: '#616161',
        grey40: '#757575',
        grey20: '#9e9e9e',
        white: '#ffffff',
        bg: '#ffffff',
        loginBg: '#ffffff'
      },
      inputs: {
        backgroundColor: '#ffffff',
      },
    },
  },
  resources: [
    {
      resource: User,
      options: {
        properties: {
          nome: { isVisible: false },
          password: { type: 'string', isVisible: { list: false, edit: true, filter: false, show: false } },
          password_digest: { isVisible: false },
        },
        actions: {
          new: {},
          edit: {},
        },
      },
    },
    {
      resource: Leads,
      options: {
        properties: {
          nome: { isVisible: false }
        },
        actions: {
          new: {},
          edit: {},
        },
      },
    },
    {
      resource: Campaigns,
      options: {
        properties: {
          id: { isVisible: false },
          name: { label: campaignLabels.name.label, description: campaignLabels.name.description },
          start_date: { label: campaignLabels.start_date.label, description: campaignLabels.start_date.description },
          end_date: { label: campaignLabels.end_date.label, description: campaignLabels.end_date.description },
          status: { label: campaignLabels.status.label, description: campaignLabels.status.description },
          budget: { label: campaignLabels.budget.label, description: campaignLabels.budget.description },
        },
        actions: {
          new: {},
          edit: {},
        },
      },
    },
    {
      resource: CampaignLead,
      options: {
        properties: {},
        actions: {
          new: {},
          edit: {},
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
