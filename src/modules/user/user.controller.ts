import { Controller, Post, Body, HttpStatus, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { AccountDto } from './dto/account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post('myAccount')
  public async myAccount(@Body() account: AccountDto) {
    const res = await this.service.myAccount(account);
    if (res) {
      return {
        succes: 'ok',
        payload: 'res'
      }
    } else {
      return{
        ...res,
        message: HttpStatus.NO_CONTENT
      }
    }

  }
}