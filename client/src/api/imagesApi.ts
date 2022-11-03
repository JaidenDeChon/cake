import axios from 'axios';

import type { IHostedImage } from '@models/';
import type { Ref } from 'vue';

/**
     * Uploads the given image file.
     * @param   { FormData }   formData   A FormData object containing the file to be uploaded.
     * @returns an object with metadata representing the upload.
     */
export async function uploadImage (formData: FormData, progress?: Ref<number>): Promise<IHostedImage> {
    const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
            if (progress !== undefined) progress.value = progressEvent.loaded;
        }
    };
    const result = await axios.post('api/images/upload-image', formData, config);
    return result.data;
}
