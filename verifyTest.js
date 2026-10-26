require('dotenv').config();
const mongoose = require('mongoose');
const Complaint = require('./models/Complaint');
const Notification = require('./models/Notification');

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const lastComplaint = await Complaint.findOne().sort({ createdAt: -1 });
        console.log('Last Complaint:', lastComplaint ? {
            id: lastComplaint._id,
            type: lastComplaint.complaintType,
            remarks: lastComplaint.remarks,
            createdAt: lastComplaint.createdAt
        } : 'None found');

        const lastNotification = await Notification.findOne().sort({ createdAt: -1 });
        console.log('Last Notification:', lastNotification ? {
            id: lastNotification._id,
            message: lastNotification.message,
            relatedId: lastNotification.relatedId,
            createdAt: lastNotification.createdAt
        } : 'None found');

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verifyData();
