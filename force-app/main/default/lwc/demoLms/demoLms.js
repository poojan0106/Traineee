import { LightningElement,api, wire, track } from 'lwc';
import LwcTask3Channel from '@salesforce/messageChannel/LwcTask3Channel__c';
import {publish, MessageContext} from 'lightning/messageService'
import fetchAcc from '@salesforce/apex/lmsTask3.fetchAcc';
let i=0;
export default class demoLms extends LightningElement {
    
    @wire(MessageContext)
    messageContext;
    message;

    @api recordId;
    @track error; 
    @track items = [];
    @track value = '';
    
    @wire(fetchAcc) 
    wiredAccounts({error,data}){
        if (data) {
            for(i=0; i<data.length; i++) {
                console.log('Acc=' + data[i].Id);
                this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
            }   
        console.log(data);
        this.error = undefined;
    } else if (error) {
        this.error = error;
        this.Accounts = undefined;
       }
    }

    get statusOptions() {
        console.log(this.items);
        return this.items;
    }

    handleChange(event){
        this.message = event.detail.value;
        console.log("selected" , this.message);
    }
 
    handleClick() {
        let message = {message: this.message};
        publish(this.messageContext, LwcTask3Channel, message);
    }
}