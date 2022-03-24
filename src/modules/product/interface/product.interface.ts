import { Document } from 'mongoose';


export interface IProduct extends Document {
  readonly _id: string;
  readonly name: string;
  readonly brand: string;
  readonly amount: Number;
  readonly price: Number;
  readonly description:string;
}