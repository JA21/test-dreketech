import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './modules/@common/common.module';
import { MongooseConfigService } from './modules/@common/mongoose/moongose.service';

import {UserModule} from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
@Module({
  imports: [CommonModule,
  MongooseModule.forRootAsync({
    useClass:MongooseConfigService
  }),AuthModule,UserModule,ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
