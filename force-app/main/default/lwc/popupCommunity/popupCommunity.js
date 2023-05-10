import { LightningElement, track } from 'lwc';
import popupimg from '@salesforce/resourceUrl/popupimg';
export default class PopupCommunity extends LightningElement {

    @track showModal = false;
    image = popupimg;
    connectedCallback(){
    if (window.location.pathname === '/communitytask/s/') {
        var alerted = sessionStorage.getItem('alerted') || '';
        if (alerted != 'yes') {
            setTimeout(() => { 
                this.showModal = true;
             }, 1000);
           
         sessionStorage.setItem('alerted','yes');
        }
        }
    }

    closeModal() {
        // Setting boolean variable to false, this will hide the Modal
        this.showModal = false;
    }

    dispatchEvent(){
        dispatchEvent(
            new CustomEvent("BeginCheckout", {
            detail: {
              event: "begin_checkout",
              ItemDetails: result,
            },
          })
        );
    }
        
    
}
