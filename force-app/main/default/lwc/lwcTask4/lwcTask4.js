import { LightningElement,api,wire, track} from 'lwc';
import fetchAcc from '@salesforce/apex/lwcWizard.fetchAcc';
import fetchCon from '@salesforce/apex/lwcWizard.fetchCon';
import fetchLead from '@salesforce/apex/lwcWizard.fetchLead';
import sendEmailToController from '@salesforce/apex/lwcWizard.sendEmailToController';
import Id from '@salesforce/schema/Account.Id';

const aCol = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email id', fieldName: 'Email_id__c' , type: 'email' },
    { label: 'Type', fieldName: 'Type' },
];
const cCol = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email id', fieldName: 'Email_id__c' , type: 'email' },
    { label: 'Releted to Account', fieldName: 'AccountId' },
];
const lCol = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email id', fieldName: 'Email_id__c' , type: 'email' },
    { label: 'Rating', fieldName: 'Rating' },
];
export default class lwcTask4 extends LightningElement {

@track currentStep = '1';
@track Account = false;
@track Contact = false;
@track Lead = false;
@track AccountId;
// @track preSelectedRows = [];
accCol = aCol;
conCol = cCol;
leadCol = lCol;
error;
value;
@track p = [];
@track Subject;
@track Body;
    get options() {
     return [
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Lead', value: 'Lead' },
     ];
    }
    handleOnSelect(event) {
        this.value = event.detail.value;
        
        if (this.value == 'Account'){
            this.Account = true;
            
        }else{
            this.Account = false;
            // console.log("boolean==" , this.Account);
        }
       
        if (this.value == 'Contact'){
            this.Contact = true;
        }else{
            this.Contact = false;
        }
        
        if (this.value == 'Lead'){
            this.Lead = true;
        }else{
            this.Lead = false;
        }
    }
    
    @wire(fetchAcc)
    wiredAccounts({ error, data }) {
        if(data) {
            let tempRecs = [];
            console.log( 'Fetched Account Data - ' + JSON.stringify( data ) );
            data.forEach( ( record ) => {

                let tempRec = Object.assign( {}, record );  

                if ( tempRec.AccountId ) {
                    tempRec.Name = tempRec.Account.Name;
                    tempRec.Email_id__c = tempRec.Account.Email_id__c;
                    tempRec.Type = tempRec.Account.Type;
                }
                
                tempRecs.push( tempRec );
                
            });
            this.accData = tempRecs;
            console.log("hello world accData==" ,this.accData);
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.accData = undefined;

        }

    }
    @wire(fetchLead)
    wiredLeads({ error, data }) {
        if(data) {
            
            let tempRcs = [];
            console.log( 'Fetched Leads Data - ' + JSON.stringify( data ) );
            data.forEach( ( record ) => {

                let tempR = Object.assign( {}, record );  

                if ( tempR.LeadId) {

                    tempR.Name = tempR.Lead.Name;
                    tempR.Email_id__c = tempR.Lead.Email_id__c;
                    tempR.Rating = tempR.Lead.Rating;

                }
                
                tempRcs.push( tempR );
                
            });
            this.leadData = tempRcs;
            console.log("hello world leadData==" ,this.leadData);
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.leadData = undefined;

        }

    }
    @wire(fetchCon)
    wiredContacts({ error, data }) {
        if(data) {

            let tempRes = [];
            console.log( 'Fetched Contact Data - ' + JSON.stringify( data ) );
            data.forEach( ( record ) => {

                let tempRe = Object.assign( {}, record );  

                if ( tempRe.ContactId) {

                    tempRe.Name = tempRe.Contact.Name;
                    tempRe.Email_id__c = tempRe.Contact.Email_id__c;
                    tempRe.AccountId = tempRe.Contact.AccountId;

                }
                
                tempRes.push( tempRe );
                
            });
            this.conData = tempRes;
            console.log("hello world conData==" ,this.conData);
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.conData = undefined;

        }

    }
    hendle(event) {
        
         let selectedRows = event.detail.selectedRows; 
        //   this.preSelectedRows = selectedRows.accId;
        //  console.log("preselected" , JSON.stringify(this.preSelectedRows ));
         let s = [];
         for(let i = 0;i<selectedRows.length ;i++){
         s[i] = selectedRows[i].Email_id__c;
        // console.log("selected\\\==" , s[i]); 
        this.p[i] = s[i];
        console.log("sssa" , JSON.stringify(this.p ));
    }
    
    }   
    sendEmailToController(){
        const recordInput = {Body: this.Body, s: this.p, Subject: this.Subject}  //You can send parameters
        sendEmailToController(recordInput)
        .then( () => {
            //If response is ok
        }).catch( error => {
            //If there is an error on response
        })

    }
    mail(event){
         this.Subject = event.detail.value;
        console.log("Subject: " ,this.Subject);
    }
    mail1(event){
        this.Body = event.detail.value;
        console.log("body:" ,this.Body);
    }

    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
 
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isStepTwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }
 
    get isEnableNext() {
        return this.currentStep != "3";
    }
 
    get isEnablePrev() {
        return this.currentStep != "1";
    }
 
    get isEnableFinish() {
        return this.currentStep === "3";
    }
 
    handleNext(){
        if(this.currentStep == "1"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "3";
        }
    }
 
    handlePrev(){
        if(this.currentStep == "3"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "1";
        }
    }
 
    handleFinish(){
 
    }
}