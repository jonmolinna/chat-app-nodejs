import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/router.js';
import { MONGO_URL, PORT, PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET } from './config.js';
import Pusher from 'pusher';

// App Config
const app = express();
const port = PORT;

const pusher = new Pusher({
    appId: PUSHER_APP_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: "us2",
    useTLS: true
});

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
// const mongo_url = "mongodb://localhost:27017/chat_app";

const mongo_url = MONGO_URL;
mongoose.connect(mongo_url)
    .catch(error => console.log('DB not Connected'))

mongoose.connection.once('open', () => {
    console.log('DB Connection');

    const changeStream = mongoose.connection.collection('messages').watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('messages', 'newMessage', {
                'change': change
            });
        }
        else {
            console.log('Error triggering pusher');
        }
    });
});

// Rutas
app.get('/', (req, res) => res.status(200).json({ msg: 'I message Backend' }));
app.use('/api', router);

// Listen
app.listen(port, () => console.log('Listening on port', port));