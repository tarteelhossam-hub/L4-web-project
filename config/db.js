const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/project');
        console.log('Database connected successfully...');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database connection closed safely.');
    } catch (err) {
        console.error('DB Disconnection Error:', err);
    }
};


module.exports = { connectDB, disconnectDB };