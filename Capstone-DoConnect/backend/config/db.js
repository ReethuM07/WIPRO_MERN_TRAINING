const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const uri =
            process.env.NODE_ENV === 'test'
                ? process.env.MONGODB_URI_TEST
                : process.env.MONGODB_URI;

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
