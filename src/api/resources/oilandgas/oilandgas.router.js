import express from 'express';
import oilandgasController from './oilandgas.controller';

export const oilandgasRouter = express.Router();
oilandgasRouter.route('/:id').get(oilandgasController.findOne);
oilandgasRouter.route('/').get(oilandgasController.findAll);
