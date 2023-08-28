import cors from 'cors';
import createDebug from 'debug';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { characterRouter } from './Router/characters.router.js';

const debug = createDebug('W6CH6:App');

export const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  debug('Hola mundo de Express');
  res.write('<h1>Hola Mundo de Express</h1>');
  res.end();
});

app.use('/characters', characterRouter);
