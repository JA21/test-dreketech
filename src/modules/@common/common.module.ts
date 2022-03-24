import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { MongooseConfigService } from './mongoose/moongose.service';

import app from './env/env.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 21600,
      },
    }),
  ],
  providers: [
    JwtModule,
    MongooseConfigService,
  ],
  exports: [ MongooseConfigService,JwtModule],
})
export class CommonModule { }