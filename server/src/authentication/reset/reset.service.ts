import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IReset } from 'src/models';
import { JaidModuleNames } from 'src/constants';

@Injectable()
export class ResetService {

    /**
     * Constructor
     * @param   { Model<IReset> }   resetModel   IReset model DI.
     */
    constructor (
        // Injects the Reset mongoose model for use in this service.
        @InjectModel(JaidModuleNames.RESET) private readonly resetModel: Model<IReset>
    ) {}

    public async save (email: string, token: string): Promise<void> {
        const resetModel = new this.resetModel({ email, token });
        await resetModel.save();
    }

    public async findOne (token: string): Promise<IReset> {
        return this.resetModel.findOne({ token });
    }

    public async deleteById (_id: string): Promise<void> {
        await this.resetModel.deleteOne({ _id });
    }
}
