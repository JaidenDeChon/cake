import { Controller, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { IHostedImage } from '../../models';
import { ControllerNames } from '../../constants';
import { ImagesService } from './Images.service';

/**
 * Controller for images.
 */
@Controller(ControllerNames.IMAGES.toString())
export class ImagesController {

    /**
     * Constructor.
     * @param   { ImagesService }   _imagesService   The Images service to use for interacting with the
     * database.
     */
    constructor (private readonly _imagesService: ImagesService) {}

    @Post('upload-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage (@UploadedFile() file: Express.Multer.File): Promise<IHostedImage> {
        const result = await this._imagesService.upload(file);
        return result;
    }
}
