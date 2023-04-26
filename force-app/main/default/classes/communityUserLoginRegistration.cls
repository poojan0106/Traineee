public without sharing class communityUserLoginRegistration {
        @AuraEnabled
        public static void createContact( String Role, String Subject, String Experience,String teacherName,String studentSchool,  String Name, String Email, String password) {
            System.debug(Role);
            System.debug(Subject);
            System.debug(Experience);
            System.debug(teacherName);
            System.debug(studentSchool);
            System.debug(Name);
            System.debug(Email);
            System.debug(password);

            Contact newContact = new Contact();

            newContact.LastName = Name;
            newContact.Email = Email;
            newContact.Subject__c = Subject;
            newContact.Experience__c = Experience;
            newContact.Role__c = teacherName;
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
        public static String updateContact(String Name, String Email ,String oldName , String oldEmail) {
        
            System.debug(oldName);
            System.debug(oldEmail);
            
            if(Name == ''){
                Name = oldName;
            }

            if(Email == ''){
                Email = oldEmail;
            }
    
            System.debug(Name);
            System.debug(Email);
            Contact conts = [SELECT Id ,Name ,Email FROM contact WHERE LastName =:oldName AND Email =:oldEmail LIMIT 1];
            conts.LastName = Name;
            conts.Email = Email;
            System.debug(conts);
            update Conts;
            return 'contact updated sucessfully ';
        }
        @AuraEnabled
        public static String updateUser(String Name, String Email ,String oldName , String oldEmail) {
            System.debug(oldName);
            System.debug(oldEmail);

            if(Name == ''){
                Name = oldName;
            }
            if(Email == ''){
                Email = oldEmail;
            }

            System.debug(Name);
            System.debug(Email);

            User u = [SELECT Id ,LastName ,Email FROM user where username = :oldName ];
        
            u.Email = Email;
            u.Username = Name;
            u.LastName = Name; 
            update u;
            return 'user updated sucessfully ';
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
        @AuraEnabled(cacheable=true)
        public static List<Contact> getTeacherNames() {
            return [SELECT Name FROM Contact WHERE Role__c = 'Teacher'];
        }
        @AuraEnabled(cacheable=true)
        public static List<Contact> fetchCont(String teacherName){
            System.debug(teacherName);
        return [SELECT Id, Name ,Email ,Role__c,teacherName__r.Name FROM Contact WHERE teacherName__r.Name =:teacherName AND teacherName__r.Name != NULL ORDER BY Name DESC ];
        }
        @AuraEnabled(cacheable=true)
        public static List<Contact> fetchTeach(String teacherName){
            System.debug(teacherName);
        return [SELECT Id, Name ,Email ,Role__c FROM Contact WHERE Name =:teacherName AND Name != NULL ORDER BY Name DESC ];
        }
        @AuraEnabled
        public static String feedbackRec( String Rating , String  Comments , String StdntName , String StdntId, String TcherName) {
            System.debug(Rating);
            System.debug(Comments);
            System.debug(StdntName);
            System.debug(StdntId);
            System.debug(TcherName);
            
            Feedback__c s = new Feedback__c();
            s.Name = StdntName;
            s.Student_Id__c = StdntId;
            s.Emoji_rating__c = Rating; 
            s.Comments__c = Comments; 
            s.teacherName__c = TcherName; 
            insert s;
            return 'feedback created sucessfully ';
        }
}