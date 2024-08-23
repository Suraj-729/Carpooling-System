const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToMongo = require('./db/mongoConnection');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

connectToMongo().then(db => {
    // Import routes and pass db instance
    const registerRoutes = require('./routes/register')(db);
    const loginRoutes = require('./routes/login')(db);

    // Use routes
    app.use('/api/register', registerRoutes);
    app.use('/api/login', loginRoutes);

    // Start server
    app.listen(port, () => {
        console.log('> Server is up and running on port:', port);
    });
}).catch(error => {
    console.error('Failed to start server due to MongoDB connection error:', error);
});
