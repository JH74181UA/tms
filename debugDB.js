const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const roles = await Role.find({});
        console.log('Roles found:', roles.map(r => r.name));

        const adminRole = await Role.findOne({ name: 'SuperAdmin' });
        if (!adminRole) {
            console.log('CRITICAL: SuperAdmin role NOT found');
        } else {
            console.log('SuperAdmin role ID:', adminRole._id);
        }

        const adminUser = await User.findOne({ email: 'admin@tms.com' }).populate('role');
        if (!adminUser) {
            console.log('CRITICAL: admin@tms.com user NOT found');
        } else {
            console.log('Admin user found:', adminUser.username);
            console.log('Admin user role name:', adminUser.role?.name);
        }

        process.exit();
    } catch (error) {
        console.error('Debug error:', error);
        process.exit(1);
    }
};

checkDB();
