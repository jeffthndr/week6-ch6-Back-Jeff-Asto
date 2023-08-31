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
  movies: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

partnerSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const PartnerModel = model('Partner', partnerSchema, 'partners');
