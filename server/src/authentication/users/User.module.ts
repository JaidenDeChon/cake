import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';

import { UserSchema } from "./User.model";
import { JaidModuleNames } from "src/constants";
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { TokenService } from '../tokens/Token.service';
import { TokenSchema } from "../tokens/Token.model";

dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: JaidModuleNames.USERS, schema: UserSchema },
            { name: JaidModuleNames.TOKENS, schema: TokenSchema }
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' }
        })
    ],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [UserService]
})
export class UserModule {}
