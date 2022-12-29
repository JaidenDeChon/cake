import { IToken } from './IToken';

/**
 * The shape of a User throughout the app.
 */
export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    token?: IToken;
}
