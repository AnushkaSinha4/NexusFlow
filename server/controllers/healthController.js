import mongoose from 'mongoose';

// Maps Mongoose's numeric connection state to a readable word
const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
};

// GET /api/health
// Does not touch the database, so it only proves Express is alive.
export const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NexusFlow backend is running!',
        project: 'NexusFlow',
    });
};

// GET /api/health/db
// Reports the real, current state of the Mongoose connection.
export const getDbHealth = (req, res) => {
    const state = mongoose.connection.readyState;
    const database = dbStates[state] || 'unknown';

    if (state === 1) {
        return res.status(200).json({
            success: true,
            database,
            message: 'NexusFlow MongoDB connection successful',
        });
    }

    // 503 = "Service Unavailable": the API is up, but the database is not
    res.status(503).json({
        success: false,
        database,
        message: 'NexusFlow MongoDB is not connected',
    });
};