import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class communnityTaskHomePage extends NavigationMixin(LightningElement) {
    handleMenuItemSelect(event) {
        const value = event.detail.value;
        switch (value) {
            case 'home':
                this.navigateToHome();
                break;
            case 'myprofile':
                // Do nothing, the submenu will handle the navigation
                break;
            case 'defaultPage':
                this.navigateToDefault();
                break;
            default:
                break;
        }
    }

    navigateToHome() {
        try {
            console.log('i am nevigate to home');
            // Replace "home" with the URL of your Home page
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/home'
                }
            });
        } catch (error) {
            console.log('error', error);
        }

    }

    navigateToMyProfile() {
        console.log('i am nevigatee to profile');
        // Replace "myprofile" with the URL of your My Profile page
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/myprofile'
            }
        });
    }

    navigateToDefault() {
        // Replace "resetpassword" with the URL of your Reset Password page
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/'
            }
        });
    }

    navigateToHelp() {
        console.log('i am nevigatee to help');
        // Replace "myprofile" with the URL of your My Profile page
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/communityHelp'
            }
        });
    }

    navigateToContactUs() {
        console.log('i am nevigatee to Contact Us');
        // Replace "myprofile" with the URL of your My Profile page
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/ContactUs'
            }
        });
    }
}
