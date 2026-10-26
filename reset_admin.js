const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

async function reset() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const newPassword = process.argv[2] || process.env.ADMIN_PASSWORD;
        if (!newPassword) {
            console.error('Please provide a new password as an argument or set ADMIN_PASSWORD in .env');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await User.updateOne(
            { email: 'admin@tms.com' },
            { password: hashedPassword }
        );

        if (result.matchedCount === 0) {
            console.error('Admin user not found. Make sure admin@tms.com exists.');
            process.exit(1);
        }

        console.log(`Admin password reset to "${newPassword}"`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
reset();
