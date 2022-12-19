import { Body, Controller, Post, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { IUser } from '../models';
import { ControllerNames } from '../constants';
import { UserService } from './User.service';

/**
 * Controller for User-related functionality.
 */
@Controller(ControllerNames.USERS.toString())
export class UserController {

    /**
     * Constructor.
     * @param   { UserService }   _userService   UserService DI.
     */
    constructor (
        // Injects the user service for class-wide use.
        private readonly _userService: UserService
    ) {}

    /**
     * Inserts a user into the database.
     * @param   { IUser }   newUser   The user object to insert into the database.
     * @returns 
     */
    @Post('create-user')
    async createUser (@Body() newUser: IUser): Promise<IUser> {
        return this._userService.insertUserToDatabase(newUser);
    }

    /**
     * Gets a single user by their ID.
     * @param   { string }   id   The ID of the user to get.
     */
    @Get('get-user-by-id/:id')
    async getUser (@Param('id') id: string): Promise<IUser> {
        const user = await this._userService.getUserById(id);
        return user;
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() response: Response
    ) {
        const { accessToken, refreshToken } = await this._userService.login(email, password);
        response.cookie(
            'refresh_token',
            refreshToken,
            {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // One week.
            }
        );
        return { token: accessToken };
    }
}
