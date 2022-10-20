import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HostedImageSchema } from './Images.model';
import { JaidModuleNames } from '../../constants';
import { ImagesController } from './Images.controller';
import { ImagesService } from './Images.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.IMAGES, schema: HostedImageSchema }])
    ],
    controllers: [ImagesController],
    providers: [ImagesService]
})
export class ImagesModule {}
