import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PayloadToken } from './models/token.model';
import { UserService } from './../user/user.service';
import { registerDto, loginDto, updatePasswordDto } from './dto';
import { IUser } from './interface/user.interface'
import { ok } from "assert";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User')
    private readonly userModel: Model<IUser>,
    private readonly jwt: JwtService,
    private readonly userService:UserService,
    
    ) { }


    public async login(account: loginDto) {
        const find: any = await this.userModel.findOne({ userName: account.userName.toUpperCase()}).exec();
       
        if (!find) {
            return { error: 'No_Exist_User', message: 'No existe el usuario' }
        } else {
            const payload: PayloadToken = await { sub: find._id }
            
            if(find && (await compareSync(account.password, find.password))){
                console.log("entro")
                return{
                    succes:ok,
                    token:this.jwt.sign(payload)
                }
            }else{

            }
               return { error: 'NO_EQUALS_PASSWORD', message: 'las constraseñas no coinciden' }
        }
    }

    public async register(account: registerDto) {
        const find: any = await this.userModel.findOne({ userName: account.userName.toUpperCase() }).exec();

        if (find) {
            return {
                error: 'EXISTING_USER',
                message: 'este ususario ya existe'
            }
        }

        try {
            const user = new this.userModel({
                _id:new Types.ObjectId,
                userName: account.userName.toUpperCase(),
                password: await hashSync(account.password, 10),
                email: account.email
            });
            await user.save();

        } catch (exp) {
            return {
                error: 'USER_CREATED_FAIL',
                message: 'el usuario no se ha podido crear'
            }
        }
    }

    public async forgotPassword(account: updatePasswordDto) {
        const find: any = await this.userModel.findOne({ userName: account.userName.toUpperCase() }).exec();

        if (!find) {
            return {
                error: 'USER_NOT_FOUND',
                message: 'usuario no encontrado'
            }
        }

        const isCompare=await compareSync(account.password, find.password);
        if(isCompare){
            const user = await this.userModel.updateOne({
            password:await hashSync(account.password, 10)
            }).exec();
            if(!user){
                return{ error:'USER_NO_UPDATE',message:'no se logro actualizar el usuario'}
            }else{
                return user
            }
        }else{
            return { error: 'NO_EQUALS_PASSWORD', message: 'las constraseñas no coinciden' };
        }
        
    }

    public async ValidUserToken(token: any): Promise<boolean> {
        if (!token) return false;
        return await this.userService.ValidUserToken(token);
      }
    
      public async ValidUser(userName: string, password: string) {
        return this.userService.ValidUser(userName, password);
      }
}