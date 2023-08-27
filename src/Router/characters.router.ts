import { Router as createRouter } from 'express';
import { CharacterController } from '../Controller/characters.controlers.js';

export const characterRouter = createRouter();

const characterController = new CharacterController();

characterRouter.get('/', characterController.getAll.bind(characterController));

characterRouter.get(
  '/:id',
  characterController.getById.bind(characterController)
);

characterRouter.post('/', characterController.create.bind(characterController));
