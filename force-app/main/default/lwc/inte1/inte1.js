import { LightningElement, track } from 'lwc';

export default class inte1 extends LightningElement {
    @track showEmailPopup = false;
    @track subject = '';
    @track body = '';
    @track a ;
   
    // @track attachment;
    handleDraftEmail() {
        this.showEmailPopup = true;
        let a_Record_URL = window.location.href; 
         let b = a_Record_URL.split('/').slice(6 ,-1); 
        this.a = b.toString();
        console.log("a" , this.a);

    }

    handleEmailPopupClose() {
        this.showEmailPopup = false;
    }
}
