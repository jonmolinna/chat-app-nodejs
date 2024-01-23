import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 9000;
export const MONGO_URL = process.env.MONGO_URL;
export const SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN;

export const PUSHER_APP_ID = process.env.PUSHER_APP_ID;
export const PUSHER_KEY = process.env.PUSHER_KEY;
export const PUSHER_SECRET = process.env.PUSHER_SECRET;