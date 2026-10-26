const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
require('./models/Role');
const User = require('./models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@tms.com' }).populate('role');
    if (!user) {
      console.log('User admin@tms.com NOT found');
    } else {
      console.log('User found:', {
        email: user.email,
        username: user.username,
        role: user.role?.name
      });
      const isMatch = await bcrypt.compare('admin', user.password);
      console.log('bcrypt.compare("admin", password):', isMatch);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();

