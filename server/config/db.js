import mongoose from 'mongoose';

const connectDB = async() => {
    const uri = process.env.MONGO_URI;

    // Fail early with a clear message if .env is missing or misspelled
    if (!uri) {
        throw new Error('MONGO_URI is not defined in the .env file');
    }

    // Log what happens to the connection after the first successful connect
    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });
    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
    });

    // Give up after 5 seconds instead of Mongoose's default 30 seconds
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

    console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
};

export default connectDB;