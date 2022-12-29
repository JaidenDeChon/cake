import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JaidModuleNames } from "../../constants";
import { IToken } from "../../models";

/**
 * Injects server dependency TokenService.
 */
@Injectable()
export class TokenService {

    /**
     * Constructor.
     * @param   { Model<IToken> }   tokenModel   IToken model DI.
     */
    constructor(
        // Injects the Token model for use in this service.
        @InjectModel(JaidModuleNames.TOKENS)
        private readonly tokenModel: Model<IToken>
    ) {}

    /**
     * Creates a new token in the DB.
     * @param   { string }   userId   The ID of the user with whom the new token is associated.
     * @param   { string }   token    Value of the refresh token.
     */
    public async createToken (userId: string, token: string) {
        const createdAt = Date.now();
        const expiredAt = new Date(createdAt + 7); // One week from now.
        const tokenModel = new this.tokenModel({ userId, token, createdAt, expiredAt });
        await tokenModel.save();
    }

    /**
     * Gets a single token via its associated userId.
     * @param   { string }   userId   The userId associated with the desired token.
     * @returns 
     */
    public async getTokenByUserId (userId: string): Promise<IToken> {
        return this.tokenModel.findOne({ userId }).exec();
    }

    /**
     * Deletes a single token using its associated `token` value.
     * @param   { string }   refreshToken   The refresh token value of the token to delete.
     */
    public async deleteToken (refreshToken: string): Promise<void> {
        await this.tokenModel.deleteOne({ token: refreshToken });
    }
}
