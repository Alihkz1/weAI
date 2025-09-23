import { ERROR_MESSAGE } from "@/enums/error-messages.enum";
import { useFileStore } from "../../stores/files";

export async function processFile(file) {
    const { sameFileExists } = useFileStore()
    let errorMessage;
    let newUploadedImage;

    if (!file.type.startsWith('image/')) {
        errorMessage = ERROR_MESSAGE.COULD_NOT_READ_IMAGE;
        return { errorMessage }
    }
    const maxSizeKB = 5 * 1024;
    const sizeKB = Math.round(file.size / 1024);

    if (sizeKB > maxSizeKB) {
        errorMessage = ERROR_MESSAGE.IMAGE_SIZE_INVALID;
        return { errorMessage }
    }

    if (sameFileExists(file.name)) {
        errorMessage = ERROR_MESSAGE.IMAGE_ALREADY_EXISTS;
        return { errorMessage }
    }

    const bitmap = await createImageBitmap(file);
    const width = bitmap.width;
    const height = bitmap.height;
    const ratio = `${width}:${height}`;

    newUploadedImage = {
        name: file.name,
        size: sizeKB,
        width,
        height,
        ratio,
        url: URL.createObjectURL(file),
    };
    return { newUploadedImage }
}
