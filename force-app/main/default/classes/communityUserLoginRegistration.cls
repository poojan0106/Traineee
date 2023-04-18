public class communityUserLoginRegistration {
    @AuraEnabled
    public static void createContact( String Role, String Subject, String Experience,String studentGrade,String studentSchool,  String Name, String Email, String password) {
        System.debug(Role);
        System.debug(Subject);
        System.debug(Experience);
        System.debug(studentGrade);
        System.debug(studentSchool);
        System.debug(Name);
        System.debug(Email);
        System.debug(password);
        Contact newContact = new Contact();
        newContact.LastName = Name;
        newContact.Email = Email;
        newContact.Subject__c = Subject;
        newContact.Experience__c = Experience;
        newContact.Grade__c = studentGrade;
        newContact.school_name__c = studentSchool;
        newContact.Role__c	 = Role;
        newContact.Password__c = password;
        newContact.AccountId = '0012w00001I4MJNAA3';
        System.debug(newContact);
        insert newContact;

        List<Contact>  ids= [select Id from Contact where Name = :name AND Password__c = :password];
        String contactId = '';
        for (Contact contact : ids) {
            contactId = contact.Id;
        }
        System.debug(contactId);

       
        String alias = '';

        if (Name.length() > 7) { 
            alias = Name.substring(0, 7); 
        } else {
            alias = Name; 
        }

        System.debug('Alias: ' + alias);
        User newUser = new User();
        newUser.Username = Name;
        newUser.Email = Email;
        newUser.ContactId = contactId; // Link the Contact with the User
        newUser.LastName = Name;
        newUser.Alias = alias;
        newUser.CommunityNickname = Name;
        newUser.LocaleSidKey = 'en_US';
        newUser.TimeZoneSidKey = 'Asia/Kolkata';
        newUser.ProfileId = '00e2w000004iGy6'; // Set the Profile Id of the desired Community User profile
        newUser.EmailEncodingKey = 'UTF-8';
        newUser.LanguageLocaleKey = 'en_US';
        newUser.IsActive = true;
        insert newUser;
    }

    @AuraEnabled
    public static String authenticateUser( String userName,String password) {
        System.debug(userName);
        System.debug(password);
        ApexPages.PageReference pageRef = Site.login(userName, password, null);
        System.debug(pageRef);
   return pageRef.getUrl();
    }

        @AuraEnabled
        public static String forgotPasswordUser(String userName) {
            System.debug(userName);
            Boolean isEmailSent = false;
            try {
                isEmailSent = Site.forgotPassword(userName);
            } catch (Exception ex) {
                System.debug('Error: ' + ex.getMessage());
                return 'Failed to password reset. Please try again later.';
            }
            if (isEmailSent) {
                return 'Password reset email has been sent to your email address.';
            } else {
                return 'Failed to send password reset email. Please check your username and try again.';
            }
        }

       
        // @AuraEnabled
        // public static void resetPassword(String oldPassword, String newPassword) {
        //     try {
        //         User currentUser = [SELECT Id, Username FROM User WHERE Id = :UserInfo.getUserId()];
        //         System.setPassword(currentUser.Id, oldPassword, newPassword);
        //     } catch (Exception ex) {
        //         throw new AuraHandledException('Failed to update password: ' + ex.getMessage());
        //     }
        // }
        @AuraEnabled
        public static String resetPassword(String currentPassword, String newPassword , String verifyNewPassword ) {
            String n = newPassword;
            System.debug(n);
            String vnp = verifyNewPassword;
            System.debug(vnp);
            String c = currentPassword;
            System.debug(c);
            PageReference pageR = Site.changePassword(n, vnp, c);
            return 'hello' ;
        }   
        
}