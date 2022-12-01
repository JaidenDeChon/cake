import { ref, computed } from 'vue';

import { uploadImage as uploadImageApi } from '@/api/imagesApi';
import { ErrorMessages } from '@/constants/errorMessages';
import type { IHostedImage } from '@models/';

/**
 * Provides reusable functionality for image uploading.
 */
export function useImageUploadingService () {

    // Local variable - The size of the image to upload.
    const _imageUploadSize = ref(0);

    // Local variable - The progress of the image upload.
    const _imageUploadProgress = ref(0);

    /**
     * Uploads the image present in the given HTMLInputElement event (if there is one present).
     * @param     { Event }   event   The event from the image-selection input.
     * @returns   { IHostedImage }   An IHostedImage object representing the completed image upload.
     */
    async function uploadImage (event: Event): Promise<IHostedImage> {
        const target = event.target as HTMLInputElement;
        if (!target.files || !target.files[0]) throw ErrorMessages.NO_FILES_SELECTED;

        const file = target.files[0];
        if (!/^image\//.test(file.type)) alert('You may only upload images.');

        _imageUploadSize.value = file.size;

        const formData = new FormData();
        formData.append('file', file);

        return uploadImageApi(formData);
    }

    // Computed property for providing the size of the image.
    const imageUploadSize = computed(() => _imageUploadSize.value);

    // Computed property for providing the upload progress percentage of the image.
    const imageUploadProgress = computed(() =>
        Math.round(_imageUploadProgress.value / _imageUploadSize.value * 100)
    );

    return { uploadImage, imageUploadProgress, imageUploadSize };
}
