

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Role = require('./models/Role');
const User = require('./models/User');

const roles = [
  'SuperAdmin',
  'User',
  'Networking Staff',
  'Plumber',
  'Electrician',
  'Software Developer',
  'Technician'
];

async function seedInitialData() {
  const existingRoles = await Role.find({ name: { $in: roles } });
  const existingRoleNames = existingRoles.map((role) => role.name);

  const rolesToCreate = roles.filter((role) => !existingRoleNames.includes(role));
  if (rolesToCreate.length > 0) {
    await Role.insertMany(rolesToCreate.map((name) => ({ name })));
    console.log('Created roles:', rolesToCreate.join(', '));
  } else {
    console.log('All roles already exist.');
  }

  const superAdminRole = await Role.findOne({ name: 'SuperAdmin' });
  if (!superAdminRole) {
    throw new Error('SuperAdmin role not found after seeding roles.');
  }

  const adminEmail = 'admin@tms.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  const adminUser = await User.findOne({ email: adminEmail });

  if (adminUser) {
    console.log(`Admin user already exists: ${adminEmail}`);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: 'Super Admin',
      phoneNumber: '0000000000',
      email: adminEmail,
      password: hashedPassword,
      role: superAdminRole._id
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  }
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      await seedInitialData();
      console.log('Seed complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error.message);
      process.exit(1);
    });
} else {
  module.exports = seedInitialData;
}
