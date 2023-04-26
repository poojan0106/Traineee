import { LightningElement, api,track } from 'lwc';
import sendEmail from '@salesforce/apex/sendEmails.sendEmail';
export default class integrationTask1 extends LightningElement {
    
    @api subject = '';
    @api body = '';
    @api recordId;
    // @api attachment;
    acceptedFormats = '.pdf,.png,.jpg,.jpeg';
    @api name;
    @api cvId;
    handleUpload(event) {
        // this.attachment = event.target.files[0];
        const uploadedFiles = event.detail.files;
        if (uploadedFiles.length > 0) {
            this.cvId = uploadedFiles[0].documentId.toString() ;
            console.log('ContentVersion Id: ' + this.cvId);
        }
    }
    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
    }

    handleCancel() {
        this.handleClose();
    }

    sendEmail() {
        const recordInput = {Body: this.body, conId: this.recordId, Subject: this.subject , contentId: this.cvId }  //You can send parameters   
        // console.log("rid" , this.recordId);
        // console.log("bdy" , this.body);
        // console.log("sub" , this.subject);
        sendEmail(recordInput)
        .then( () => {
            //If response is ok
        }).catch( error => {
            //If there is an error on response
        })
        this.handleClose();
    }

}