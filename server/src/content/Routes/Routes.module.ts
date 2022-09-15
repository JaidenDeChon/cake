import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JaidRouteSchema } from './Routes.model';
import { JaidModuleNames } from '../../constants';
import { RoutesController } from './Routes.controller';
import { RoutesService } from './Routes.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.ROUTES, schema: JaidRouteSchema }])
    ],
    controllers: [RoutesController],
    providers: [RoutesService]
})
export class RoutesModule {}
