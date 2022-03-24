import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserSchema} from '../../schemas/user.schema';
import { UserService } from '../user/user.service';
@Module({
    imports:[MongooseModule.forFeature([
        {name:'User',schema:UserSchema},
    ]),
    JwtModule.register({
      privateKey: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 21600,
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService],
  exports:[AuthService,UserService]
})
export class AuthModule {}