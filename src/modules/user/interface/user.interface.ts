import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
  readonly email: string;
}