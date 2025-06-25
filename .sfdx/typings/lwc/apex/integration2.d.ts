declare module "@salesforce/apex/integration2.UploadFile" {
  export default function UploadFile(param: {fileName: any, fileType: any, docid: any, recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/integration2.getFileIdFromDrive" {
  export default function getFileIdFromDrive(param: {folderId: any}): Promise<any>;
}
declare module "@salesforce/apex/integration2.DeleteFile" {
  export default function DeleteFile(param: {fileId: any}): Promise<any>;
}
