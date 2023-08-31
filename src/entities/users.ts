import { WithId } from '../types/id';
import { Partner } from './partners';

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  surname: string;
  role: 'admin' | 'pro' | 'user';
  movies: Partner[];
};

export type User = WithId & UserNoId;
