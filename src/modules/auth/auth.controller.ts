import {
    Controller,
    Post,
    HttpStatus,
    Body,
    Put,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
//import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { ok } from 'assert';
//import { diskStorage } from 'multer';

import { AuthService } from './auth.service';
import { loginDto, registerDto, updatePasswordDto } from './dto';
//import { fileFilter, editFileName } from './../@common/files/functions.multer';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService,
         
    ) { }

    @Post('login')
    public async login(@Body() login: loginDto) {
        const res = await this.service.login(login);
        if(res.error){status: HttpStatus.UNAUTHORIZED}

        return  { success: 'OK',message:'usuario logeado',res};
        
    }

    @Post('signup')
    public async signUp(@Body() signup: registerDto) {
        const res = await this.service.register(signup);
        return res;
    }

    @Put('update')
    public async forgotPassword(@Body() update: updatePasswordDto) {
        const res = await this.service.forgotPassword(update);
        return res;
    }
}