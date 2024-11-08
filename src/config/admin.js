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

import campaignLabels from './campaignLabels.js';
import userLabels from './userLabels.js';
import leadLabels from './leadLabels.js';

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
        loginBg: '#ffffff',
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
          email: { label: userLabels.email.label, description: userLabels.email.description },
          password: { label: userLabels.password.label, description: userLabels.password.description },
          role: { label: userLabels.role.label, description: userLabels.role.description },
          createdAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: userLabels.createdAt.label, description: userLabels.createdAt.description },
          updatedAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: userLabels.updatedAt.label, description: userLabels.updatedAt.description },
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
          email: { label: leadLabels.email.label, description: leadLabels.email.description },
          phone: { label: leadLabels.phone.label, description: leadLabels.phone.description },
          source: { label: leadLabels.source.label, description: leadLabels.source.description },
          status: { label: leadLabels.status.label, description: leadLabels.status.description },
          createdAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: leadLabels.createdAt.label, description: leadLabels.createdAt.description },
          updatedAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: leadLabels.updatedAt.label, description: leadLabels.updatedAt.description },
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
          createdAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: campaignLabels.createdAt.label, description: campaignLabels.createdAt.description },
          updatedAt: { isVisible: { list: false, edit: false, filter: false, show: true }, label: campaignLabels.updatedAt.label, description: campaignLabels.updatedAt.description },
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
        properties: {
              // Oculte os campos duplicados
              created_at: { label: 'Created At', isVisible: { list: true, edit: false, filter: false, show: true } },
              updated_at: { label: 'Updated At', isVisible: { list: true, edit: false, filter: false, show: true } },
              //lead_id: { isVisible: { list: false, edit: false, filter: false, show: false } }, // Ocultar se não for necessário
              //campaign_id: { isVisible: { list: false, edit: false, filter: false, show: false } }, // Ocultar se não for necessário
              //email: { label: 'Email', isVisible: { list: true, edit: false, filter: false, show: true } },
              //status: { label: 'Status', isVisible: { list: true, edit: true, filter: false, show: true } },
              //leadName: { label: 'Lead Name', isVisible: { list: true, edit: true, filter: false, show: true } },
        },
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
