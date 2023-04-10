import { api, LightningElement, track, wire } from 'lwc';
import LwcTask3Channel from '@salesforce/messageChannel/LwcTask3Channel__c';
import { subscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchCon from '@salesforce/apex/lmsTask3.fetchCon';
import fetchOpp from '@salesforce/apex/lmsTask3.fetchOpp';

 let accountId ;
let i=0;
let j=0;
export default class demoLwc2 extends LightningElement {
    @api message;
    
    @api publisherMessage;
    subscription = null;
    @track error;  
    @track items = [];
    @track item = []; 
    @track value = '';
    @track values = '';
 
    @wire(MessageContext)
    messageContext;
 
    connectedCallback() {
        this.handleSubscribe();
    }
    
   
    handleSubscribe() {
        if (this.subscription) {
            return;
        }
        
        this.subscription = subscribe(this.messageContext, LwcTask3Channel, (message) => {
            console.log(message.message);
            this.publisherMessage = message.message;
            console.log("msg==>" , this.publisherMessage);
            accountId = this.publisherMessage;
        console.log("accId==>" , accountId);
        console.log("pubmsg==>",this.publisherMessage);
            this.ShowToast('Success', message.message, 'success', 'dismissable');
        });
    }
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
    @wire(fetchCon, { accountId: '$publisherMessage'})
    wiredconList({ error, data }) {
        if (data) {
            for(i=0; i<data.length; i++) {
                console.log('con=' + data[i].Id);
                this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
            }                
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
   
   
    get statusOptions() {
        console.log(this.items);
        return this.items;
    }



    @wire(fetchOpp, { accountId: '$publisherMessage'})
    wiredoppList({ error, data }) {
        if (data) {
            for(j=0; j<data.length; j++) {
                console.log('opp=' + data[j].Id);
                this.item = [...this.item ,{value: data[j].Id , label: data[j].Name}];                                   
            }                
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.Opportunity = undefined;
        }
    }
   
    
    get statusOption() {
        console.log(this.item);
        return this.item;
    }

     
}
