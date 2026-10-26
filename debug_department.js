const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';

async function testCreateDepartment() {
    try {
        console.log('Logging in...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'admin@tms.com',
            password: 'admin'
        });
        const token = loginRes.data.token;
        console.log('Logged in successfully');

        console.log('Creating department...');
        const depRes = await axios.post(`${BASE_URL}/master/departments`, {
            name: 'Master Computer Application',
            shortName: 'MCA'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Department created:', depRes.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testCreateDepartment();
