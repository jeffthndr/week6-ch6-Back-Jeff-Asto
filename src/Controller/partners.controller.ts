import createDebug from 'debug';
import { Partner } from '../entities/partners.js';
import { Repository } from '../repository/repository.js';
import { Controller } from './controller.js';

const debug = createDebug('W6CH6:Controller:PartnerController');

export class PartnerController extends Controller<Partner> {
  constructor(protected repo: Repository<Partner>) {
    super(repo);
    debug('Instantiated');
  }
}
