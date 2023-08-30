import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { CharacterController } from '../controller/characters.controller.js';
import { CharactersFsRepository } from '../repository/character.fs.repository.js';
const debug = createDebug('W6CH6:Router:charactersRouter');

debug('Loaded');
const repo = new CharactersFsRepository();
const characterController = new CharacterController(repo);
export const characterRouter = createRouter();

characterRouter.get('/', characterController.getAll.bind(characterController));
characterRouter.get(
  '/:id',
  characterController.getById.bind(characterController)
);
characterRouter.post('/', characterController.create.bind(characterController));
characterRouter.patch(
  '/:id',
  characterController.update.bind(characterController)
);
characterRouter.delete(
  '/:id',
  characterController.delete.bind(characterController)
);
