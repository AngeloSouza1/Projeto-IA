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
import Dashboard from '../components/Dashboard'; // Importe o componente do Dashboard

AdminJS.registerAdapter(AdminJSSequelize);

// Instanciando o AdminJS
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
        loginBg: '#ffffff',
      },
      inputs: {
        backgroundColor: '#ffffff',
      },
    },
  },
  dashboard: {
    component: Dashboard, // Adiciona o componente Dashboard aqui
  },
  resources: [
    {
      resource: User,
      options: {
        properties: {
          email: { label: 'Email' },
          password: { label: 'Password' },
          role: { label: 'Role' },
        },
      },
    },
    {
      resource: Leads,
      options: {
        properties: {
          email: { label: 'Email' },
          phone: { label: 'Phone' },
          source: { label: 'Source' },
          status: { label: 'Status' },
        },
      },
    },
    {
      resource: Campaigns,
      options: {
        properties: {
          name: { label: 'Name' },
          start_date: { label: 'Start Date' },
          end_date: { label: 'End Date' },
          status: { label: 'Status' },
          budget: { label: 'Budget' },
        },
      },
    },
    {
      resource: CampaignLead,
      options: {
        properties: {
          lead_id: { label: 'Lead ID' },
          campaign_id: { label: 'Campaign ID' },
          created_at: { label: 'Created At' },
          updated_at: { label: 'Updated At' },
        },
      },
    },
  ],
});

// Setup de autenticação
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
  }
);

export { adminJs, adminRouter };
