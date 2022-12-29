import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

import { IUser } from '../../models';
import { JaidModuleNames } from '../../constants';
import { TokenService } from '../tokens/Token.service';

dotenv.config();

/**
 * Injects server dependency UserService.
 */
@Injectable()
export class UserService {

    /**
     * Constructor.
     * @param   { Model<IUser> }   userModel      IUser model DI.
     * @param   { TokenService }   tokenService   TokenService DI.
     * @param   { JwtService }     jwtService     JwtService model DI.
     */
    constructor(
        // Injects the User Mongoose model for use in this service.
        @InjectModel(JaidModuleNames.USERS) private readonly userModel: Model<IUser>,
        // Injects the Token service for class-wide use.
        private tokenService: TokenService,
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

        // First, verify credentials.

        const theseHands = new BadRequestException('Invalid credentials.');

        const user = await this.getUserByEmail(email);
        if (!user) throw theseHands;

        const passwordIsMatch = await bcryptjs.compare(password, user.password);
        if (!passwordIsMatch) throw theseHands;

        // Second, log the user in.

        const id = user.id;
        const expiresIn = '30s';
        const accessToken = await this.jwtService.signAsync({ id }, { expiresIn });
        const refreshToken = await this.jwtService.signAsync({ id });

        await this.tokenService.createToken(id, refreshToken);

        return { accessToken, refreshToken };
    }

    /**
     * GET endpoint for getting a user by ID.
     * @param request 
     * @returns 
     */
    public async getUser (request: Request): Promise<IUser> {
        try {
            const accessToken = request.headers.authorization.replace('Bearer ', '');
            const { id } = await this.jwtService.verifyAsync(accessToken);
            const { firstName, lastName, email } = await this.getUserById(id);
            const user = { id, firstName, lastName, email };
            return user
        } catch {
            throw new UnauthorizedException();
        }
    }

    /**
     * Refreshes the access token given in the request.
     * @param   { Request }    request    Request object; provided automatically by framework.
     * @param   { Response }   response   Response object; provided automatically by framework.
     * @returns 
     */
    public async refresh (
        request: Request,
        response: Response
    ): Promise<{ token: string }> {
        try {
            const expiresIn = '30s';
            const refreshToken = request.cookies['refresh_token'];
            const { id } = await this.jwtService.verifyAsync(refreshToken);
            const token = await this.jwtService.signAsync({ id }, { expiresIn });

            const tokenInDb = await this.tokenService.getTokenByUserId(id);

            if (!tokenInDb) {
                console.log('looked using ', id);
                throw new UnauthorizedException();
            }

            response.status(200);
            return { token };
        } catch {
            throw new UnauthorizedException();
        }
    }

    /**
     * Deauthenticates the user associated with the given access token.
     * @param   { string }    refreshToken    Refresh token associated with the user to log out.
     */
    public async logout (refreshToken: string): Promise<void> {
        await this.tokenService.deleteToken(refreshToken);
    }

    /**
     * Updates the user with the given ID using the data provided in the given object.
     * @param   { string }           id        The ID of the user who's data is to be updated.
     * @param   { Partial<IUser> }   options   The user data that is to be updated.
     * @returns 
     */
    public async update (_id: string, options: Partial<IUser>): Promise<IUser> {
        return this.userModel.findByIdAndUpdate({ _id }, { ...options }).exec();
    }
}
