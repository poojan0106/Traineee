import { LightningElement, api } from 'lwc';
import createInteviewAccount from '@salesforce/apex/InterviewAccountCreation.createInteviewAccount';
import fetchAcc from '@salesforce/apex/InterviewAccountCreation.fetchAcc';
export default class InterviewChild extends LightningElement {
    @api lastName;
    @api contactCount;
    // @api isCreated = false;
     AccId;
    
    handleCreate(event) {
        this.createInteviewAccount();
        console.log('a' , this.lastName);
        console.log('b' , this.contactCount);
        console.log('i am called');
        

    // // Creates the event with the data.
    
    
    }

    createInteviewAccount(){
        createInteviewAccount({ LstName: this.lastName, CntactCount: this.contactCount })
        .then(() => {
        this.fetchAcc();

        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
       
    }
    fetchAcc(){
        fetchAcc()
        .then(result => {
            // Set the URL received from Apex to the property
            console.log('result' ,JSON.stringify(result));
            this.AccId = result[0].Id;
            console.log('id' ,this.AccId);
            this.customEventss();
        })
        .catch(error => {
            // Handle any errors from Apex call
        alert(error);
        });
    }

    customEventss(){
        console.log('input' , this.AccId);
        this.dispatchEvent( new CustomEvent( 'pass', {
            detail: this.AccId
        } ) );
    }

}