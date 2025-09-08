import express from 'express';
import dotenv from 'dotenv'
dotenv.config(); //This sets up process.env.PORT
import debug from 'debug';
import {userRouter} from './routes/api/users.js';
import {bugRouter} from './routes/api/bugs.js';

const debugServer = debug('app:Server');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('frontend/dist'));
app.use('/api/user', userRouter);

app.use(express.static('frontend/dist')); 
app.use('/api/bug', bugRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debugServer(`Server is running on port http://localhost:${PORT}`);
});