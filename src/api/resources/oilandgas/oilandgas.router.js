import express from 'express';
import oilandgasController from './oilandgas.controller';

export const oilandgasRouter = express.Router();
oilandgasRouter.route('/news').get(oilandgasController.findOne);
oilandgasRouter.route('/').get(oilandgasController.findAll);
