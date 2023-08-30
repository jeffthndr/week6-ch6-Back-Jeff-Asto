// Mongoose -> Object Documents Model

import { Schema, model } from 'mongoose';
import { Partner } from '../entities/partners.js';

const partnerSchema = new Schema<Partner>({
  name: {
    type: String,
    required: true,
  },
  hobbie: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

export const PartnerModel = model('Partner', partnerSchema, 'partners');
