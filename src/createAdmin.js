import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import sequelize from './config/database.js';

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminExists = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (adminExists) {
      console.log('Admin user already exists.');
      return;
    }

    const passwordDigest = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      email: process.env.ADMIN_EMAIL,
      passwordDigest,
      role: 'admin'
    });
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();
