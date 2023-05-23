import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import resetPassword from '@salesforce/apex/communityUserLoginRegistration.resetPassword';
import updateContact from '@salesforce/apex/communityUserLoginRegistration.updateContact';
import updateUser from '@salesforce/apex/communityUserLoginRegistration.updateUser';
import fetchCont from '@salesforce/apex/communityUserLoginRegistration.fetchCont';
import fetchCon from '@salesforce/apex/communityUserLoginRegistration.fetchCon';
import fetchTeach from '@salesforce/apex/communityUserLoginRegistration.fetchTeach';
import feedbackRec from '@salesforce/apex/communityUserLoginRegistration.feedbackRec';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import FIRST_NAME_FIELD from '@salesforce/schema/User.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/User.LastName';
import Username_FIELD from '@salesforce/schema/User.Username';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import { NavigationMixin } from 'lightning/navigation';
import Id from '@salesforce/schema/Contact.Id';

const studntCol = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email id', fieldName: 'Email', type: 'email' },
    { label: 'Role', fieldName: 'Role__c' },
];

const fields = [FIRST_NAME_FIELD, LAST_NAME_FIELD, EMAIL_FIELD, Username_FIELD];
export default class communityTaskResetPassword extends NavigationMixin(LightningElement) {
    @track oldPassword = '';
    @track newPassword = '';
    @track confirmNewPassword = '';
    @track isdisable = true;
    @track iscancle = true;
    @track isRoleTeacher = false;
    @track isRoleStudent = false;
    firstName;
    lastName;
    @track userName;
    email;
    studentCol = studntCol;
    // subjectCol = subCol;
    @track studentData = [];
    // @track subjecttData = [];
    @track Email = '';
    @track Name = '';
    @api selectedRows = [];
    @track isSelectedRows = false;
    @track isFeedbackSend = false;
    @api Rating;
    @api Comments = '';
    @track Comment = '';
    @track isShowModal = false;
    @api semester;
    @track isSem6;
    @track isSem7;
    @track isSem8;

    // SelectionValues = [
    //     { label: 'Emoji5', value: '' },
    //     { label: 'B', value: 'Emoji1' }
    // ];


    handleEdit() {
        this.isdisable = false;
        this.iscancle = false;
    }
    handleCancle() {
        this.isdisable = true;
        this.iscancle = true;
    }
    handleUpdate() {
        this.isdisable = true;
        this.updateContact();
        alert("User information updated...");
    }
    handleClickEmoji(event) {
        this.Rating = event.target.value;
        console.log('rating is =:', this.Rating);
    }
    handleComments(event) {

        this.Comment = event.target.value;
        console.log("comments for student :=", this.Comment);
        this.Comments = this.Comment;
        this.Comment = '';
    }
    handleFeedback(event) {
        this.isFeedbackSend = true;
        this.Comment = '';
        this.hideModalBox();
        this.feedbackRec();
        const recordInpt = {};
        console.log("log", JSON.stringify(recordInpt));

    }
    feedbackRec() {
        feedbackRec({ Rating: this.Rating, Comments: this.Comments, StdntName: this.selectedRows[0].Name, StdntId: this.selectedRows[0].Id, TcherName: this.selectedRows[0].teacherName__r.Name })
            .then(result => {
                console.log("Result", result);
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            });
    }
    updateContact() {
        updateContact({ Name: this.Name, Email: this.Email, oldName: this.userName, oldEmail: this.email })
            .then(result => {
                console.log("contact updated", result);
                this.updateUser();
            })
            .catch(error => {
                console.log("hello contact");
                console.log(JSON.stringify(error));
            });
    }
    updateUser() {
        updateUser({ Name: this.Name, Email: this.Email, oldName: this.userName, oldEmail: this.email })
            .then(result => {
                console.log("user updated", result);
            })
            .catch(error => {
                console.log("hello user");
                console.log(JSON.stringify(error));
            });
    }


    handleName(event) {
        this.Name = event.target.value;
        console.log("name", this.Name);
    }
    handleEmail(event) {
        this.Email = event.target.value;
        console.log("email", this.Email);
    }
    handleOldPasswordChange(event) {
        this.oldPassword = event.target.value;
    }

    handleNewPasswordChange(event) {
        this.newPassword = event.target.value;
    }

    handleConfirmNewPasswordChange(event) {
        this.confirmNewPassword = event.target.value;
    }



    showModalBox() {
        this.isShowModal = true;
    }

    hideModalBox() {
        this.isShowModal = false;
        this.isFeedbackSend = false;
    }



    handleChangePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
            this.showToast('Error', 'New password and confirm new password do not match', 'error');
            return;
        }
        console.log("old", this.oldPassword);
        console.log("new", this.newPassword);
        console.log("vef", this.confirmNewPassword);
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
    @wire(getRecord, { recordId: USER_ID, fields })
    wireuser({ error, data }) {
        if (data) {
            this.firstName = data.fields.FirstName.value;
            this.lastName = data.fields.LastName.value;
            this.email = data.fields.Email.value;
            this.userName = data.fields.Username.value;
            console.log("user name", this.userName);
        } else if (error) {
            console.log(error);
        }
    }

    @wire(fetchCont, { teacherName: '$userName' })
    wiredfetchCont({ error, data }) {
        if (data) {
            let tempRcs = [];

            console.log('Fetched Contact Data - ' + JSON.stringify(data));
            data.forEach((record) => {
                let tempR = Object.assign({}, record);
                if (tempR.ContactId) {
                    tempR.Name = tempR.Contact.Name;
                    tempR.Email = tempR.Contact.Email;
                    tempR.Role__c = tempR.Contact.Role__c;

                }
                tempRcs.push(tempR);
            });
            this.studentData = tempRcs;
            console.log("hello world studentData==", JSON.stringify(this.studentData));
            this.error = undefined;
        } else if (error) {
            console.log('error in Fetch Cont', { error });
            this.error = error;
            this.studentData = undefined;
        }
    }

    @wire(fetchCon, { Name: '$userName' })
    wirefetchCon({ error, data }) {
        if (data) {
            this.semester = data[0].Sem__c;
            console.log("sem-->", this.semester);

            if (this.semester == '6') {
                this.isSem6 = true;
                this.isSem7 = false;
                this.isSem8 = false;
            } else if (this.semester == '7') {
                this.isSem6 = false;
                this.isSem7 = true;
                this.isSem8 = false;
            } else if (this.semester == '8') {
                this.isSem6 = false;
                this.isSem7 = false;
                this.isSem8 = true;
            } else {
                this.isSem6 = false;
                this.isSem7 = false;
                this.isSem8 = false;
            }
        } else if (error) {
            console.log(error);
        }
    }

    @wire(fetchTeach, { teacherName: '$userName' })
    wiredfetchTeach({ error, data }) {
        if (data) {
            let tempRc = [];

            console.log('Fetched Data - ' + JSON.stringify(data));
            data.forEach((record) => {
                let temp = Object.assign({}, record);
                if (temp.ContactId) {
                    temp.Name = temp.Contact.Name;
                    temp.Email = temp.Contact.Email;
                    temp.Role__c = temp.Contact.Role__c;

                }
                tempRc.push(temp);
            });
            this.teacherData = tempRc;
            console.log("Role__C Data==", JSON.stringify(this.teacherData[0].Role__c));
            if (this.teacherData[0].Role__c == 'Teacher') {
                this.isRoleTeacher = true;
                this.isRoleStudent = false;
            } else {
                this.isRoleTeacher = false;
                this.isRoleStudent = true;
            }
            this.error = undefined;
        } else if (error) {
            console.log('error in Fetch Cont', { error });
            this.error = error;
            this.teacherData = undefined;
        }
    }

    handleSelect(event) {
        let selectRows = event.detail.selectedRows;
        console.log("selected", JSON.stringify(selectRows));
        this.selectedRows = selectRows;
        console.log("selec", JSON.stringify(this.selectedRows));
        this.isSelectedRows = true;
    }
    NavigateToLogin() {
        console.log("logout calling");
        this[NavigationMixin.Navigate]({
            type: 'comm__loginPage',
            attributes: {
                actionName: 'logout'
            }
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