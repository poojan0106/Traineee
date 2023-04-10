import { LightningElement, track,api } from 'lwc';
import fetchFiles from '@salesforce/apex/Fileuploadcttrl.fetchFiles';
export default class Fileuplod extends LightningElement {
    @api recordId;
    @track lstAllFiles;
    @track error;
    // columns = [];
    pageSize = 5 ;
    totalPages; 
    totalRecords;
    pageNumber = 1;
    recordsToDisplay = [];
    get acceptedFormats() {
        return ['.jpeg','.png','.jpg'];
    }

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        if(this.totalRecords == 0 ){
            return this.pageNumber ==1;
        }
        return this.pageNumber == this.totalPages;
    }
 
    handleUploadFinished(event) {
        this.connectedCallback();
    }
 
    connectedCallback() {
        fetchFiles({recordId:this.recordId})
        .then(result=>{
            this.lstAllFiles = result; 
            this.error = undefined;
            this.totalRecords = result.length;              
            this.paginationHelper();
        }).catch(error=>{
            this.lstAllFiles = undefined; 
            this.error = error;
            this.paginationHelper();
        })
    }
    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    paginationHelper() {
        this.recordsToDisplay = [];
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
       
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.lstAllFiles[i]);
        }
    }
}