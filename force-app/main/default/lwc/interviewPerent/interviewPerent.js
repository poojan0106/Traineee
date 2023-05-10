import { LightningElement, api, track ,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchCont from '@salesforce/apex/InterviewAccountCreation.fetchCont';
const cCol = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' , type: 'email' },
];

export default class InterviewPerent extends LightningElement {

    @track LastName = '';
    @track contactCount = '';
    @track isCreated = false ;
    @track conData = [];
    conCol = cCol;
    LaastName;
    coontactCount;
    AccId;
 
  fetchId(event) {
    this.AccId = event.detail;
    console.log('in perent' ,this.AccId);
  }

    handleLastName(event) {
        this.LastName = event.target.value;
        this.LaastName = this.LastName;
        console.log("name" , this.LaastName);
    }

    handleContactCount(event) {
        this.contactCount = event.target.value;
        if (this.contactCount > 100 || this.contactCount < 0) {
            this.showToast('Error', 'Please make sure that entered value is greaterthan or equal to 0 Or lessthen or equal to 100', 'error');
        }
        this.coontactCount = this.contactCount;
        console.log("count" , this.coontactCount);
    }


    @wire(fetchCont ,{AccId :'$AccId'})
    wiredfetchCont({ error, data }) {
        if(data) {
            let tempRcs = [];
            
            console.log( 'Fetched Contact Data - ' + JSON.stringify( data ) );
            data.forEach( ( record ) => {
                let tempR = Object.assign( {}, record );  
                if ( tempR.ContactId) {
                    tempR.Name = tempR.Contact.Name;
                    tempR.Email = tempR.Contact.Email;
                }
                tempRcs.push( tempR ); 
            });
            this.conData = tempRcs;
            console.log("hello world conData==" ,JSON.stringify(this.conData));
            this.error = undefined;
        } else if ( error ) {
            console.log('error in Fetch Cont',{error});
            this.error = error;
            this.conData = undefined;
        }
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}