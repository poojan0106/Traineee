// registrationForm.js
import { LightningElement, track } from 'lwc';

export default class RegistrationForm extends LightningElement {
    @track isRoleSelected = false;
    @track isTeacher = false;
    @track isStudent = false;
    @track selectedRole = '';
    @track teacherSubject = '';
    @track teacherExperience = '';
    @track studentGrade = '';
    @track studentSchool = '';
    @track name = '';
    @track email = '';
    @track password = '';
    @track redirectToLoginPage = false;
      
    roleOptions = [
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' }
    ];

    handleRoleChange(event) {
        this.selectedRole = event.detail.value;
        if (this.selectedRole === 'teacher') {
            this.isTeacher = true;
            this.isStudent = false;
        } else if (this.selectedRole === 'student') {
            this.isTeacher = false;
            this.isStudent = true;
        }
        this.isRoleSelected = true;
    }

    handleTeacherSubjectChange(event) {
        this.teacherSubject = event.target.value;
    }

    handleTeacherExperienceChange(event) {
        this.teacherExperience = event.target.value;
    }

    handleStudentGradeChange(event) {
        this.studentGrade = event.target.value;
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

    handleRegister() {
        // Add your registration logic here

        console.log('Registration form submitted');
        this.redirectToLoginPage = true;
    }

    handleCancel() {
        // Reset form or perform any other desired action
        this.isRoleSelected = false;
        this.isTeacher = false;
        this.isStudent = false;
        this.selectedRole = '';
        this.teacherSubject = '';
        this.teacherExperience = '';
        this.studentGrade = '';
        this.studentSchool = '';
        this.name = '';
        this.email = '';
        this.password = '';
    }
}
