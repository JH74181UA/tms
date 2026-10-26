const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const Role = require('./models/Role');
const Complaint = require('./models/Complaint');
const { createNotification } = require('./controllers/notificationController');

const testRaise = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Get a test user (the one raising the ticket)
        const user = await User.findOne({ email: 'admin@tms.com' });
        if (!user) {
            console.error('Test user (admin@tms.com) not found');
            process.exit(1);
        }

        // 2. Get a SuperAdmin (the one receiving the notification)
        const adminRole = await Role.findOne({ name: 'SuperAdmin' });
        if (!adminRole) {
            console.error('SuperAdmin role not found');
            process.exit(1);
        }
        const admin = await User.findOne({ role: adminRole._id });
        if (!admin) {
            console.error('SuperAdmin user not found');
            process.exit(1);
        }

        // 3. Create a test complaint
        const newComplaint = new Complaint({
            blockName: 'Test Block',
            roomNumber: '101',
            complaintType: 'PC Hardware',
            remarks: 'Automated test ticket',
            raisedBy: user._id,
            department: user.department || null
        });

        await newComplaint.save();
        console.log('Complaint created successfully:', newComplaint._id);

        // 4. Create notification for Admin
        const notification = await createNotification(
            admin._id,
            user._id,
            `TEST: New ticket raised by ${user.username}`,
            'System',
            newComplaint._id,
            '/complaints-list'
        );

        if (notification) {
            console.log('Notification created successfully:', notification._id);
        } else {
            console.warn('Notification creation returned null (check logs)');
        }

        console.log('Test completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
};

testRaise();
