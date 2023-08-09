import { reject } from "lodash";
import { resolveModuleName } from "typescript";
import { NumericFormat } from 'react-number-format';


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
    static numberFormat = (number, suffix, widthPx) => {
        return <NumericFormat
            type="text"
            value={number}
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            suffix={suffix}
            disabled
            style={{ border: 'none', backgroundColor: 'transparent', width: widthPx }} />
    }

}


export default CommonUtils;