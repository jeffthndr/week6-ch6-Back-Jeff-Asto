import createDebug from 'debug';
import { Partner } from '../entities/partners.js';
import { Repository } from '../repository/repository.js';

import { NextFunction, Request, Response } from 'express';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
import { Controller } from './controller.js';

const debug = createDebug('W6CH6:Controller:PartnerController');

export class PartnerController extends Controller<Partner> {
  constructor(protected repo: Repository<Partner>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepo = new UsersMongoRepository();
      const user = await userRepo.getById(userId);
      req.body.author = user.id;
      const finalNote = await this.repo.create(req.body);
      user.movies.push(finalNote);
      userRepo.update(user.id, user);
      res.status(201);
      res.json(finalNote);
    } catch (error) {
      next(error);
    }
  }
}
