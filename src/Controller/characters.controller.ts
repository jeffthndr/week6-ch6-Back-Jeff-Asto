/* eslint-disable no-unused-vars */
import debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Character } from '../entities/character';
import { Repository } from '../repository/repository';
import { ControllerStructure } from './controller.interface';

export class CharacterController implements ControllerStructure {
  constructor(private repo: Repository<Character>) {
    debug('Instantiated');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.repo.getAll;
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.repo.getById(id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const finalTask = await this.repo.create(req.body);
      res.status(201);
      res.json(finalTask);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const finalTask = await this.repo.update(id, req.body);
      res.json(finalTask);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.repo.delete(id);
      res.status(204);
      res.json({});
    } catch (error) {
      next(error);
    }
  }
}
