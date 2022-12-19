import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';

import { IUser } from '../models';
import { JaidModuleNames } from '../constants';

dotenv.config();

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
        private readonly userModel: Model<IUser>,
        // Injects the JWT service for class-wide use.
        private jwtService: JwtService
    ) {}

    /**
     * Inserts a user into the database.
     * @param   { IUser }   userData   The user object to insert into the database.
     * @returns
     */
    public async insertUserToDatabase (userData: IUser): Promise<IUser> {
        const userDataCopy = { ...userData };
        const salt = await bcryptjs.genSalt(Number(process.env.JWT_SECRET));
        userDataCopy.password = await bcryptjs.hash(userDataCopy.password, salt);
        try {
            await new this.userModel(userDataCopy).save();
            delete userDataCopy.password;
            return userDataCopy;
        } catch (e) {
            throw new InternalServerErrorException('User could not be saved. Please try again.');
        }
    }

    /**
     * Gets a single user by their ID.
     * @param   { string }   id   The ID of the user to get.
     */
    public async getUserById (id: string): Promise<IUser> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Could not find user.');
        return user;
    }

    /**
     * Gets a single user by their email address.
     * @param   { string }   email   The email of the user to get.
     */
    public async getUserByEmail (email: string): Promise<IUser> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) throw new BadRequestException('Could not find user.');
        return user;
    }

    /**
     * Logs a user into the system.
     * @param   { string }   email 
     * @param   { string }   password 
     * @returns 
     */
    public async login (email: string, password: string) {

        const theseHands = new BadRequestException('Invalid credentials.');

        const user = await this.getUserByEmail(email);
        if (!user) throw theseHands;

        const passwordIsMatch = await bcryptjs.compare(password, user.password);
        if (!passwordIsMatch) throw theseHands;

        // If email and password were good, log the user in
        const id = user.id;
        const expiresIn = '30s';
        const accessToken = this.jwtService.signAsync({ id }, { expiresIn });
        const refreshToken = this.jwtService.signAsync({ id });

        return { accessToken, refreshToken };
    }
}
