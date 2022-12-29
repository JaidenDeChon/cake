import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JaidModuleNames } from 'src/constants';
import { ResetController } from './reset.controller';
import { ResetSchema } from './reset.model';
import { ResetService } from './reset.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from '../users/User.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JaidModuleNames.RESET, schema: ResetSchema }]),
    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0',
        port: 1025
      },
      defaults: {
        from: 'from@example.com'
      }
    }),
    UserModule
  ],
  controllers: [ResetController],
  providers: [ResetService]
})
export class ResetModule {}
