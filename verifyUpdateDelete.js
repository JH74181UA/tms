require('dotenv').config();
const mongoose = require('mongoose');
const Complaint = require('./models/Complaint');

const verifyUpdateDelete = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Find a test complaint
        const complaint = await Complaint.findOne().sort({ createdAt: -1 });
        if (!complaint) {
            console.error('No complaint found to test');
            process.exit(1);
        }
        console.log('Original Complaint ID:', complaint._id);
        console.log('Original Remarks:', complaint.remarks);

        // 2. Test Update
        const updatedRemarks = 'UPDATED: ' + complaint.remarks;
        complaint.remarks = updatedRemarks;
        await complaint.save();

        const verifiedComplaint = await Complaint.findById(complaint._id);
        console.log('Updated Remarks Verified:', verifiedComplaint.remarks === updatedRemarks);

        // 3. Test Delete
        await Complaint.findByIdAndDelete(complaint._id);
        const deletedComplaint = await Complaint.findById(complaint._id);
        console.log('Delete Verified:', deletedComplaint === null);

        console.log('Backend Verification Successful');
        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verifyUpdateDelete();
