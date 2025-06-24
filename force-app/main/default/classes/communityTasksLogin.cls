// public class communityTasksLogin {
//     public Student__c registration { get; set; }
//     public String selectedRole { get; set; }

//     public communityTasksLogin() {
//         registration = new Student__c();
//     }

//     public List<SelectOption> getRoleOptions() {
//         List<SelectOption> options = new List<SelectOption>();
//         options.add(new SelectOption('Teacher', 'Teacher'));
//         options.add(new SelectOption('Student', 'Student'));
//         return options;
//     }

//     public void updateFields() {
//         // Clear field values based on selected role
//         if (selectedRole == 'Teacher') {
//             registration.Name = null;
//         } else if (selectedRole == 'Student') {
//             registration.Name = null;
//         }
//     }

//     public void register() {
//         // Perform registration logic and save data to database
//         // Example logic: insert registration record
//         insert registration;
//         // Example success message
//         ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM, 'Registration successful!'));
//     }
// }


public class communityTasksLogin {
    public String selectedRole { get; set; }
    public Boolean isRoleSelected { get; set; }
    public String teacherSubject { get; set; }
    public String teacherExperience { get; set; }
    public String studentGrade { get; set; }
    public String studentSchool { get; set; }
    public String name { get; set; }
    public String email { get; set; }
    public String password { get; set; }
    public Boolean redirectToLoginPage { get; set; }
    
    public CommunityTasksLogin() {
        isRoleSelected = false;
        redirectToLoginPage = false;
    }
    
    // Method to handle role change event
    public void handleRoleChange() {
        isRoleSelected = true;
        System.debug(isRoleSelected);
    }
    
    // Method to handle register button click
    public void handleRegister() {
        // Perform registration logic here
        // ...
        
        // Redirect to login page
        redirectToLoginPage = true;
    }
    
    // Method to handle cancel button click
    public void handleCancel() {
        // Perform cancel logic here
        // ...
    }
    
    // Method to get role options for selectRadio
    public List<SelectOption> getRoleOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('Teacher', 'Teacher'));
        options.add(new SelectOption('Student', 'Student'));
        return options;
    }
    
    // Method to check if selected role is Teacher
    public Boolean getIsTeacher() {
        System.debug(selectedRole == 'Teacher');
        return selectedRole == 'Teacher';
        
    }
    
    // Method to check if selected role is Student
    public Boolean getIsStudent() {
        System.debug(selectedRole == 'Student');
        return selectedRole == 'Student';
       
    }
}