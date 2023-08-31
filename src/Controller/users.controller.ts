import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { LoginData, User } from '../entities/users.js';
import { Repository } from '../repository/repository.js';
import { HttpError } from '../types/http.error.js';
import { Controller } from './controller.js';
const debug = createDebug('W6E:Controller:UsersController');

export class UsersController extends Controller<User> {
  constructor(protected repo: Repository<User>) {
    super(repo);
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { userName, passwd } = req.body as unknown as LoginData;
    const error = new HttpError(401, 'UnAuthorized', 'Login unauthorized');
    try {
      if (!this.repo.search) return;
      const data = await this.repo.search({ key: 'userName', value: userName });
      if (!data.length) {
        throw error;
      }

      const user = data[0];
      if (user.passwd !== passwd) {
        throw error;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
