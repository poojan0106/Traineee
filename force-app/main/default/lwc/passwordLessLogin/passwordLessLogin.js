import { LightningElement, track } from 'lwc';
import loginWithEmail from '@salesforce/apex/OTPLoginController.loginWithEmail';

export default class PasswordLessLogin extends LightningElement {

    @track email = '';
    @track errorMessage = '';

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleLogin() {
        this.errorMessage = '';
        if (!this.email) {
            this.errorMessage = 'Please enter your email.';
            return;
        }

        loginWithEmail({ email: this.email })
            .then((url) => {
                if (url) {
                    window.location.href = url;
                } else {
                    this.errorMessage = 'Unable to generate login link.';
                }
            })
            .catch((error) => {
                this.errorMessage = error.body ? error.body.message : error.message;
            });
    }
}