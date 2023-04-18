import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import resetPassword from '@salesforce/apex/communityUserLoginRegistration.resetPassword';
export default class communityTaskResetPassword extends LightningElement {
    @track oldPassword = '';
    @track newPassword = '';
    @track confirmNewPassword = '';

    handleOldPasswordChange(event) {
        this.oldPassword = event.target.value;
    }

    handleNewPasswordChange(event) {
        this.newPassword = event.target.value;
    }

    handleConfirmNewPasswordChange(event) {
        this.confirmNewPassword = event.target.value;
    }

    handleChangePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
            this.showToast('Error', 'New password and confirm new password do not match', 'error');
            return;
        }
        console.log("old" , this.oldPassword);
        console.log("new" , this.newPassword);
        console.log("vef" , this.confirmNewPassword);
        resetPassword({ currentPassword: this.oldPassword, newPassword: this.newPassword, verifyNewPassword: this.confirmNewPassword })
            .then(() => {
                this.showToast('Success', 'Password changed successfully', 'success');
                // Reset input fields
                this.oldPassword = '';
                this.newPassword = '';
                this.confirmNewPassword = '';
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    get isFormValid() {
        return (
            this.oldPassword.length == 0 ||
            this.newPassword.length == 0 ||
            this.confirmNewPassword.length == 0 ||
            this.newPassword.length != this.confirmNewPassword.length
        );
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

