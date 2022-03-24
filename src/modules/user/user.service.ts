import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {compareSync} from 'bcrypt';

import {AccountDto} from './dto/account.dto';
import {IUser} from './interface/user.interface'

@Injectable()
export class UserService{
    constructor(@InjectModel('User')
    private readonly userModel: Model<IUser>){}

    public async myAccount(account:AccountDto){
        const user = await this.userModel.find({userName:account.userName.toUpperCase()}).exec();
        
        if(!user){
            return { error:'USER_NOT_FOUND',message:'usuario no encontrado'}
        }else{
            return user;
        }
    }
    public async ValidUserToken(userName: string): Promise<boolean> {
        const result = await this.userModel.findOne({ userName: userName }).exec();
        return result ? true : false;
      }
    
      public async ValidUser(userName: string, password: string): Promise<boolean> {
        const user = await this.userModel.findOne({ userName: userName }).exec();
        return user && (await compareSync(password, user.password))
          ? true
          : false;
      }
}