import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IHostedImage } from '../../models';
import { JaidModuleNames } from '../../constants';
import S3 from 'aws-sdk/clients/s3';

/**
 * Injects server dependency ImagesService.
 * TODO:
 *     - Guard against file types that aren't images
 *     - Maybe rename this module from `images`-related stuff to just `uploaded-files`-related stuff?
 *     - Configure AWS to be more secure by not using public ACL
 *     - Configure AWS to be more secure by sending images to a temporary collection where new uploads are
 *       scanned by antivirus software, and files passing will go on to their permanent destination.
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
    ) {
        dotenv.config();

        this._bucketName = process.env.AWS_S3_BUCKET_NAME;

        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const credentials = new aws.Credentials({ accessKeyId, secretAccessKey });
        this._s3 = new aws.S3({ credentials });

    }

    private _s3: S3;
    private _bucketName: string;

    /**
     * Uploads the given file to AWS S3 for hosting, and then saves the metadata of that hosting to the
     * 'Images' MongoDB collection.
     * @param   { Express.Multer.File }   file   The file to be uploaded.
     * @returns an IHostedImage object representing the upload within the MongoDB collection.
     */
    async upload (file: Express.Multer.File): Promise<IHostedImage> {
        const amazonAwsUploadResult = await this.uploadImage(file);
        const mongoDbUploadResult = await this.uploadMetaData(file, amazonAwsUploadResult);
        return mongoDbUploadResult;
    }

    /**
     * Sends an image to an AWS S3 bucket and responds with a JSON object containing metadata on the upload.
     * @param   { Express.Multer.File }   file   The file that was uploaded.
     * @returns an object representing the AWS upload.
     */
    private async uploadImage (file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
        const Body = file.buffer;
        const Key = `${ randomUUID() }-${ file.originalname }`;
        const ContentType = file.mimetype;
        const Bucket = this._bucketName;

        const uploadResult = await this._s3
            .upload({ Bucket, Body, Key, ContentType, ACL: 'public-read' })
            .promise();

        return uploadResult;
    }

    /**
     * Uploads the metadata of an AWS S3-hosted image to MongoDB Images collection.
     * @param   { Express.Multer.File }   file        The file that was uploaded.
     * @param   { any }                   awsObject   The object representing the AWS upload.
     * @returns an IHostedImage object representing the upload within the MongoDB collection.
     */
    private async uploadMetaData (file: Express.Multer.File, awsObject: any): Promise<IHostedImage> {
        const awsKey = awsObject.Key ?? awsObject.key;
        const url = awsObject.Location;
        const fileName = file.originalname;
        const fileType = file.mimetype;
        const fileSize = file.size;

        const metadata = new this.imagesModel({ awsKey, url, fileName, fileType, fileSize });

        const result = metadata.save();
        return result;
    }
}
