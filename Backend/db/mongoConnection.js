const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/carpoolingsystem';
let client;
let db;

const connectToMongo = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            db = client.db('carpoolingsystem');
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    return db;
};

module.exports = connectToMongo;
