import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/router.js';
import { MONGO_URL, PORT } from './config.js';

// App Config
const app = express();
const port = PORT;

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
// mongodb://localhost:27017/chat_app
// const mongo_url = "mongodb+srv://admin:zZA4na30WcgScmAS@cluster0.jpfgwiq.mongodb.net/";
const mongo_url = "mongodb://localhost:27017/chat_app";
mongoose.connect(mongo_url)
    .catch(error => console.log('DB not Connected'))

mongoose.connection.once('open', () => {
    console.log('DB Connection')
});

// Rutas
app.get('/', (req, res) => res.status(200).json({ msg: 'I message Backend' }));
app.use('/api', router);

// Listen
app.listen(port, () => console.log('Listening on port', port));