import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserSchema } from "./User.model";
import { JaidModuleNames } from "src/constants";
import { UserController } from './User.controller';
import { UserService } from './User.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.USERS, schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
