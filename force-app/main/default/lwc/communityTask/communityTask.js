import { LightningElement, api, track , wire } from 'lwc';
import createContact from '@salesforce/apex/communityUserLoginRegistration.createContact';
import authenticateUser from '@salesforce/apex/communityUserLoginRegistration.authenticateUser';
import forgotPasswordUser from '@salesforce/apex/communityUserLoginRegistration.forgotPasswordUser';
import getTeacherNames from '@salesforce/apex/communityUserLoginRegistration.getTeacherNames';

export default class communityTask extends LightningElement {
    @track isRoleSelected = false;
    @track isTeacher = false;
    @track isStudent = false;
    @track Role = '';
    @track teacherSubject = '';
    @track teacherExperience = '';
    @track tName = '';
    @track studentSchool = '';
    @track name = '';
    @track email = '';
    @track password = '';
    @track loginName = '';
    @track userName = '';
    @track loginPassword = '';
    @track redirectToLoginPage = false;
    @track activeTabValue = 'login';
    @track showForgotPassword = false; 
    @track isSubmitDisabled = false;
    tcherNames = [];

    roleOptions = [
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' }
    ];

    // Handler for Role selection change
    handleRoleChange(event) {
        this.Role = event.detail.value;
        this.isRoleSelected = true;
        if (this.Role === 'teacher') {
            this.isTeacher = true;
            this.isStudent = false;
        } else if (this.Role === 'student') {
            this.isTeacher = false;
            this.isStudent = true;
        }
    }
    @wire(getTeacherNames)
    wiredContacts({ error, data }) {
        if (data) {
            console.log("data" , JSON.stringify(data));
            this.tcherNames = data.map(contact => ({ label: contact.Name, value: contact.Name }));
        } else if (error) {

            console.error("err" , JSON>stringify (error));
        }
    }

    handleTeacherChange(event) {
        this.tName = event.target.value;
        // Do something with the selected teacher ID
        console.log("name" , this.tName);
    }
    // Handlers for input field changes
    handleTeacherSubjectChange(event) {
        this.teacherSubject = event.target.value;
    }

    handleTeacherExperienceChange(event) {
        this.teacherExperience = event.target.value;
    }

    handleStudentSchoolChange(event) {
        this.studentSchool = event.target.value;
    }

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }
    handleLoginEmailChange(event) {
        this.loginName = event.target.value;
    }
    handleUserEmailChange(event) {
        this.userName = event.target.value;
    }
    handleLoginPasswordChange(event) {
        this.loginPassword = event.target.value;
    }

    handleResetPasswordEmailChange(event) {
        this.resetPasswordEmail = event.target.value;
    }


    // Handler for Register button click
    handleRegister(event) {
        this.activeTabValue = 'login';
        this.redirectToLoginPage = true;
        this.createContact();
        alert("registration sucessfull please go to login page and login with you user name and password which you enterd here. And don't press register button again.");
    }

    // Call Apex method to create contact
    createContact() {
        createContact({ Role: this.Role,Subject: this.teacherSubject,Experience: this.teacherExperience,Name: this.name,Email: this.email, password: this.password, teacherName: this.tName ,studentSchool: this.studentSchool })
            .then(result => {
                console.log("executed", result);
                this.activeTabValue = 'login';
                this.redirectToLoginPage = true;
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Handler for Cancel button click
    handleCancel() {
        // Reset form and variables
        this.isRoleSelected = false;
        this.isTeacher = false;
        this.isStudent = false;
        this.Role = '';
        this.teacherSubject = '';
        this.teacherExperience = '';
        this.tName = '';
        this.studentSchool = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.loginName = '';
        this.loginPassword = '';
        this.redirectToLoginPage = false;
    }

    handleLogin() {
        console.log("I Am Redirected To Login Page....");
        // Perform login logic here
        // You can access the input field values using this.loginEmail and this.loginPassword
        
        // Example: You can call an Apex method to authenticate the user
        authenticateUser({ userName: this.loginName, password: this.loginPassword })
        .then(result => {
            if (result) {
                window.location.href = result;
            } 
        }).catch(error => {
            console.error(error);
        });
    }

    // Handler for Tab change
    handleTabChange(event) {
        this.activeTabValue = event.target.value;
    }

    handleForgotPasswordClick() {
        this.showForgotPassword = true;
    }
    handleForgotPasswordSubmit(){   
        this.isSubmitDisabled = true;
        if(this.userName.length != 0){
        forgotPasswordUser({ userName: this.userName})
        .then(result => {
            // Set the URL received from Apex to the property
            alert(result);
        })
        .catch(error => {
            // Handle any errors from Apex call
        alert(error);
        });
    }else{
        alert('user name field must not be blank');
        this.isSubmitDisabled = false;
    }
    }

}


