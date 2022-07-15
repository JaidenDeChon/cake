import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HeroSchema } from "./Hero.model";
import { JaidModuleNames } from "../../constants";
import { HeroController } from "./Hero.controller";
import { HeroService } from "./Hero.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.HERO, schema: HeroSchema }])
    ],
    controllers: [HeroController],
    providers: [HeroService]
})
export class HeroModule {}

