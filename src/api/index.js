import express from 'express';
import { oilandgasRouter } from './resources/oilandgas';

export const restRouter = express.Router();
restRouter.use('/oilandgas', oilandgasRouter);
