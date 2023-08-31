import { User } from './users';

export type PartnerWithId = {
  id: string;
};

export type PartnerNoId = {
  name: string;
  hobbie: string;
  gender: string;
  age: string;
  movies: User;
};

export type Partner = PartnerWithId & PartnerNoId;
