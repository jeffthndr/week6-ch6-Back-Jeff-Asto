import { Router as createRouter } from 'express';

import createDebug from 'debug';
import { PartnerController } from '../controller/partners.controller.js';
import { PartnerMongoRepository } from '../repository/partner.mongo.repository.js';

const debug = createDebug('W6E:Router:PartnerRouter');

debug('Loaded');
const repo = new PartnerMongoRepository();
const partnerController = new PartnerController(repo);
export const partnerRouter = createRouter();

partnerRouter.get('/', partnerController.getAll.bind(partnerController));
partnerRouter.get('/:id', partnerController.getById.bind(partnerController));
partnerRouter.post('/', partnerController.create.bind(partnerController));
partnerRouter.patch('/:id', partnerController.update.bind(partnerController));
partnerRouter.delete('/:id', partnerController.delete.bind(partnerController));
