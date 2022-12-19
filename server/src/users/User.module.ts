import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

import { UserSchema } from "./User.model";
import { JaidModuleNames } from "src/constants";
import { UserController } from './User.controller';
import { UserService } from './User.service';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JaidModuleNames.USERS, schema: UserSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
