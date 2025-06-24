declare module "@salesforce/apex/EncryptDecryptController.processEncryption" {
  export default function processEncryption(param: {recId: any}): Promise<any>;
}
declare module "@salesforce/apex/EncryptDecryptController.processDecryption" {
  export default function processDecryption(param: {encryptedData: any}): Promise<any>;
}
