/**
 * The shape of a Token thoughout the app.
 */
export interface IToken {
    id: number;
    userId: string;
    token: string;
    createdAt: Date;
    expiredAt: Date;
}
