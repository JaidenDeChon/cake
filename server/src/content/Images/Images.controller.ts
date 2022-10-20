import { Controller, Post, Req, Res } from '@nestjs/common';

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
    async uploadImage (@Req() request, @Res() response): Promise<void> {
        const result = await this._imagesService.uploadImageToAws(request, response);
    }
}
