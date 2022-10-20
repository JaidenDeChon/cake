/**
 * Represents the data associated with an AWS-hosted image.
 */
export interface IHostedImage {
    // The MongoDB ID of the file.
    id: string;
    // The URL of the file.
    url: string;
    // The name of the file that was uploaded.
    fileName: string;
    // The type of file that was uploaded.
    fileType: string;
    // The size of the file that was uploaded (in bytes).
    fileSize: number;
}
