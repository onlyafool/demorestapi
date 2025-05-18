import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import eventRouter from './routes/events.js';
import db from './database.js'; 


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/events', eventRouter);

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    // Initialize database
    try {
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
}
});