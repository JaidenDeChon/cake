import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

import { IUser } from '../models';
import { JaidModuleNames } from '../constants';

/**
 * Injects server dependency UserService.
 */
@Injectable()
export class UserService {

    /**
     * Constructor.
     * @param   { Model<IUser> }   userModel   IUser model DI.
     */
    constructor(
        // Injects the User Mongoose model for use in this service.
        @InjectModel(JaidModuleNames.USERS)
        private readonly userModel: Model<IUser>
    ) {}

    /**
     * Inserts a user into the database.
     * @param   { IUser }   user   The user object to insert into the database.
     * @returns 
     */
    async insertUserToDatabase (user: IUser): Promise<IUser> {
        const newUser = new this.userModel(user);
        try {
            await newUser.save();
            return newUser;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    /**
     * Gets a single user by their ID.
     * @param   { string }   id   The ID of the user to get.
     */
    async getUser (id: string): Promise<IUser> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Could not find user.');
        return user;
    }

    async login (email: string, password: string) {
        const user: IUser = await this.userModel.findOne({ email }).exec();
        if (!user) throw new BadRequestException('Invalid credentials.');

        const matchingPassword = await bcryptjs.compare(password, user.password);
        if (!matchingPassword) throw new BadRequestException('Invalid credentials.');

        return user;
    }
}
