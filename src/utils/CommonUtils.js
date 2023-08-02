import { reject } from "lodash";
import { resolveModuleName } from "typescript";

class CommonUtils {
    static convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Error converting Blob to Base64'))
            reader.readAsDataURL(blob);
        });
    };

    static convertBase64ToBinary(base64Image) {
        if (!base64Image) {
            throw new Error('No image provided');
        }

        const binaryData = Buffer.from(base64Image, 'base64');
        // console.log('>>>check image:', binaryData)
        return binaryData;
    }
}

export default CommonUtils;