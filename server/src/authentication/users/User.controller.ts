import { Body, Controller, Post, Get, Param, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import { IUser } from '../../models';
import { ControllerNames } from '../../constants';
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

    /**
     * Logs a user in using the given email and password.
     * @param   { string }     email      The email of the user to log in.
     * @param   { string }     password   The password of the user to log in. 
     * @param   { Response }   response   Response object; provided automatically by framework.
     */
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<{ token: string }> {
        const { accessToken, refreshToken } = await this._userService.login(email, password);

        response.status(200);
        response.cookie(
            'refresh_token',
            refreshToken,
            {
                httpOnly: true,
                maxAge: 604_800_000 // One week.
            }
        );
        return { token: accessToken };
    }

    /**
     * Gets a user using the given Request information.
     * @param   { Request }   request   The get-user request.
     */
    @Get('user')
    async user (@Req() request: Request): Promise<IUser> {
        return this._userService.getUser(request);
    }

    /**
     * Refreshes the access token given in the request.
     * @param   { Request }    request    Request object; provided automatically by framework.
     * @param   { Response }   response   Response object; provided automatically by framework.
     * @returns 
     */
    @Post('refresh')
    async refresh (
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ): Promise<{ token: string }> {
        return await this._userService.refresh(request, response);
    }

    /**
     * Deauthenticates the user associated with the access token given in the request.
     * @param   { Request }    request    Request object; provided automatically by framework.
     * @param   { Response }   response   Response object; provided automatically by framework.
     * @returns 
     */
    @Post('logout')
    async logout (
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ): Promise<{ message: string }> {
        const refreshToken = request.cookies['refresh_token'];
        await this._userService.logout(refreshToken);
        response.clearCookie('refresh_token');
        return { message: 'success' };
    }
}
