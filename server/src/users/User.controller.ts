import { Body, Controller, Post, Get, Param } from '@nestjs/common';

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
    async createUser (@Body() newUser: IUser): Promise<{ id: string }> {
        const id = await this._userService.insertUserToDatabase(newUser);
        return { id };
    }

    /**
     * Gets a single user by their ID.
     * @param   { string }   id   The ID of the user to get.
     */
    @Get('get-user/:id')
    async getUser (@Param('id') id: string): Promise<IUser> {
        const user = await this._userService.getUser(id);
        return user;
    }
}
