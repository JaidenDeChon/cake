import { MailerService } from '@nestjs-modules/mailer/dist';
import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { UserService } from '../users/User.service';
import { ResetService } from './reset.service';

/**
 * Controller for reset-related functionality.
 */
@Controller()
export class ResetController {

    /**
     * Constructor.
     * @param   { Model<IUser> }   _resetService    ResetService DI.
     * @param   { TokenService }   _mailerService   MailerService DI.
     * @param   { JwtService }     _userService     UserService DI.
     */
    constructor (
        private readonly _resetService: ResetService,
        private readonly _mailerService: MailerService,
        private readonly _userService: UserService
    ) {}

    /**
     * Inserts a new entry representing a forgotten password reset attempt.
     * @param   { string }   email   The email of the user who has forgotten their password.
     */
    @Post('forgot')
    async forgot(@Body('email') email: string) {

        const token = Math.random().toString(20).substring(2, 12);
        await this._resetService.save(email, token);

        const url = `http://localhost:8080/reset/${token}`;

        await this._mailerService.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="${ url }">here</a> to reset your password.`
        })

        return { message: 'Success, please check your email.' };
    }

    /**
     * Resets a user's password using the given token and twice-confirmed password.
     * @param   { string }   token             The token for the password reset request.
     * @param   { string }   password          The new password to use.
     * @param   { string }   passwordConfirm   The new password to use. 
     */
    @Post('reset')
    async reset (
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') passwordConfirm: string
    ) {

        if (password !== passwordConfirm) throw new BadRequestException('Passwords do not match.');

        const reset = await this._resetService.findOne(token);
        const user = await this._userService.getUserByEmail(reset.email);

        if (!user || !user.id) throw new NotFoundException('User not found');

        await this._userService.update(user.id, { password: await bcryptjs.hash(password, 12) });

        return { message: 'success' };
    }
}
