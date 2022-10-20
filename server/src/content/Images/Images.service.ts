import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dotenv from 'dotenv';
import * as multer from 'multer';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';

import { IHostedImage, IMulterResponse } from 'src/models';
import { JaidModuleNames } from 'src/constants';

dotenv.config();

const s3 = new aws.S3();
const bucket = process.env.AWS_S3_BUCKET_NAME;
const acl = process.env.AWS_ACL;
const key = function (request, file, cb) {
    cb(null, `${Date.now().toString()}`);
}

const upload = multer({ storage: multerS3({ s3, bucket, acl, key }) }).array('upload', 1);

/**
 * Injects server dependency ImagesService
 */
@Injectable()
export class ImagesService {

    /**
     * Constructor
     * @param   { Model<IHostedImage> }   imagesModel   The shape of an AWS-hosted image throughout the app.
     */
    constructor (
        @InjectModel(JaidModuleNames.IMAGES)
        private readonly imagesModel: Model<IHostedImage>
    ) {}

    /**
     * Sends an image to an AWS S3 bucket and responds with a JSON object containing metadata on the upload.
     * @returns 
     */
    async uploadImageToAws (@Req() request, @Res() response): Promise<IMulterResponse> {
        try {
            upload(
                request,
                response,
                function(error: Error) {
                    if (error) return response.status(404).json(`Failed to upload image file: ${ error }`);
                    return response.status(201).json(request.files[0]) as IMulterResponse;
                }
            );
        } catch (e) {
            console.error(e);
            return response.status(500).json(`Failed to upload image file: ${ e }`);
        }
    }

    /**
     * Uploads the metadata of an AWS S3-hosted image to MongoDB Images collection.
     */
    async saveImageMetaData (): Promise<void> {

    }
}
