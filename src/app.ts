import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';
import { characterRouter } from './router/characters.router.js';
import { partnerRouter } from './router/partners.router.js';

const debug = createDebug('W6CH6:App');

export const app = express();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/characters', characterRouter);
app.use('/partners', partnerRouter);
app.use(errorMiddleware);
