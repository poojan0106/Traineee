import { LightningElement, track, api } from 'lwc';
import fetchFiles from '@salesforce/apex/Fileuploadcttrl.fetchFiles';
import fetchFile from '@salesforce/apex/Fileuploadcttrl.fetchFile';
import UploadFile from '@salesforce/apex/integration2.UploadFile';
import getFileIdFromDrive from '@salesforce/apex/integration2.getFileIdFromDrive';
import DeleteFile from '@salesforce/apex/integration2.DeleteFile';

export default class integrationTask2 extends LightningElement {
    @api lstAllFiles;
    @api recordId;
    @track error;
    @api fileName;
    @api fileType;
    @track lsAllFiles;
    @track files = [];
    @track dltfile;
    @track folderId;
    get acceptedFormats() {
        return ['.jpeg' , '.png', '.jpg' , '.pdf'];
    }
        handleUploadFinished(event) {
        this.connectedCallback();
        let a_Record_URL = window.location.href;
        this.recordId = a_Record_URL.split('/').slice(6, -1).toString();
        console.log("a", this.recordId);
        fetchFiles({ recordId: this.recordId })
            .then(result => {

                // Find the latest file by created date
                const latestFile = result.reduce((acc, curr) => {
                    if (!acc || new Date(curr.ContentDocument.CreatedDate) > new Date(acc.ContentDocument.CreatedDate)) {

                        return curr;
                    }
                    return acc;
                }, null);
                console.log("latestFile", JSON.stringify(latestFile));
                this.lstAllFiles = latestFile.ContentDocument.Id;
                console.log("files", JSON.stringify(this.lstAllFiles));
                this.fileName = latestFile.ContentDocument.Title;
                console.log("names file", JSON.stringify(this.fileName));
                this.fileType = latestFile.ContentDocument.FileType;
                console.log("file type", this.fileType);
               
                this.error = undefined;
                alert("File uploaded successfully...");
                return this.UploadFile();
            })
            .catch(error => {
                this.lstAllFiles = undefined;
                this.error = error;
            });
    }
    connectedCallback() {
        fetchFile({ recordId: this.recordId })
            .then(result => {
                this.lsAllFiles = result;
                this.error = undefined;
                this.totalRecords = result.length;
                
            }).catch(error => {
                this.lsAllFiles = undefined;
                this.error = error;
            });
    } 
        UploadFile(event) {
        const recordInput = { docid: this.lstAllFiles, fileName: this.fileName, fileType: this.fileType ,recordId:this.recordId };
        console.log("recinput", JSON.stringify(recordInput));
        return UploadFile(recordInput)
            .then(result => {
                // console.log("File uploaded successfully to Google Drive. File ID: " + result.fileId + ", File Name: " + result.fileName);
                console.log("executesss" , result.foldersId);
                this.folderId = result;
                console.log("executed" , result);
                this.getFileIdFromDrive();
                // If response is ok
            }).catch(error => {
                // If there is an error on response
            });
    }
    getFileIdFromDrive() {
        const recordInput = { folderId: this.folderId  };
        // Call the Apex function
        getFileIdFromDrive(recordInput)
            .then(result => {
                console.log("execute");
                console.log('File list:', result);
                this.files = result;
                console.log("files" , JSON.stringify(this.files));

            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    }
    handleDeleteFile(event) {
        // Retrieve the fileId from the data-id attribute on the button
        const fid = event.currentTarget.dataset.id;
        this.dltfile = fid.toString(); // Convert fileId to string and store in a class variable
        console.log("del", this.dltfile);
        
        // Call the DeleteFile() method with the fileId
        const recordInput = { fileId: this.dltfile  };
        DeleteFile(recordInput) // Corrected method name
            .then(result => {
                // Handle successful deletion
               console.log("File deleted successfully!");
                // Refresh the file list or update UI as needed
            const updatedFileList = this.files.filter(file => file.fileId !== this.dltfile);
            this.files = updatedFileList; 
            })
            .catch(error => {
                // Handle error
                console.log("Failed to delete file.");
            });
    }
}