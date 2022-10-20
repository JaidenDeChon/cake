/**
 * The shape of the data in the response when uploading via multer-s3.
 */
export interface IMulterResponse {
    fieldName: string;
    originalName: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition: string | null;
    contentEncoding: string | null;
    storageClass: string;
    serverSideEncryption: string | null;
    metadata: object | null;
    location: string;
    etag: string;
}
