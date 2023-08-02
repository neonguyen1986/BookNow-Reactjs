class CommonUtils {
    static convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Error converting Blob to Base64'))
            reader.readAsDataURL(blob);
        });
    };
}

export default CommonUtils;