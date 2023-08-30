import { Partner } from '../entities/partners.js';
import { HttpError } from '../types/http.error.js';
import { PartnerModel } from './partner.mongo.model.js';

import createDebug from 'debug';
import { Repository } from './repository.js';
const debug = createDebug('W6CH6:Repo:PartnerMongoRepo');

export class PartnerMongoRepository implements Repository<Partner> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Partner[]> {
    const data = await PartnerModel.find().exec();
    return data;
  }

  async getById(id: string): Promise<Partner> {
    const data = await PartnerModel.findById(id).exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying getById',
      });
    return data;
  }

  async create(newData: Omit<Partner, 'id'>): Promise<Partner> {
    const data = await PartnerModel.create(newData);
    return data;
  }

  async update(id: string, newData: Partial<Partner>): Promise<Partner> {
    const data = await PartnerModel.findByIdAndUpdate(id, newData, {
      new: true,
    }).exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying update',
      });
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await PartnerModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying delete',
      });
  }
}
