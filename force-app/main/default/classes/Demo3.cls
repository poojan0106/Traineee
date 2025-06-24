public class Demo3 {

    //  @AuraEnabled
    // public static void sendCalendarInvite(String emailAddress, String icsContent) {
    //     Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
    //     attachment.setFileName('SalesforceWebinar.ics');
    //     attachment.setBody(Blob.valueOf(icsContent));
    //     attachment.setContentType('text/calendar');

    //     Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    //     mail.setToAddresses(new String[] { emailAddress });
    //     mail.setSubject('Salesforce Webinar - Calendar Invite');
    //     mail.setPlainTextBody('Please find your calendar invite attached.\n\nJoin via Google Meet: https://meet.google.com/zyk-xoty-xsz');
    //     mail.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment });

    //     Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    // }
    
        @AuraEnabled
    public static void sendCalendarInvite(List<String> emailAddresses, String icsContent) {
        if (emailAddresses == null || emailAddresses.isEmpty()) {
            throw new AuraHandledException('Email address list is empty.');
        }

        Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
        attachment.setFileName('SalesforceWebinar.ics');
        attachment.setBody(Blob.valueOf(icsContent));
        attachment.setContentType('text/calendar');

        for (String email : emailAddresses) {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new List<String>{ email });
            mail.setSubject('You\'re invited: Salesforce Webinar');
            mail.setPlainTextBody('Join our webinar!\n\nGoogle Meet: https://meet.google.com/zyk-xoty-xsz\n\nSee attached calendar invite.');
            mail.setFileAttachments(new Messaging.EmailFileAttachment[]{ attachment });
            Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
        }
    }
    @AuraEnabled
    public static List<Account> fetchAcc1 (){
        return [SELECT Id, Name, Phone,Type FROM Account ORDER BY Name DESC];
    }  

    @AuraEnabled
    public static void updateRecordName(Id recordId) {
        Lead record = [SELECT LastName FROM Lead WHERE Id = :recordId LIMIT 1];
        record.LastName = record.LastName + 'scanned';
        update record;
    }

    @AuraEnabled
    public static List<Contact> fetchCon1 (String recordId){
        return [SELECT Id, Name, Phone ,Email,AccountId FROM Contact WHERE AccountId=:recordId];
    }
    @AuraEnabled
    public static List<Account> findByName1(String searchKey1) {
        String name = '%' + searchKey1 + '%';
        return [SELECT id, name, phone,Type FROM Account WHERE name LIKE :name];
	}
     
    @AuraEnabled
    public static List<Account> fetchAcc2 (){
        return [SELECT Id, Name, Phone,Type FROM Account ORDER BY Name DESC];
    }    
    @AuraEnabled
    public static List<Contact> fetchCon2 (String recordId){
        return [SELECT Id, Name, Phone ,Email,AccountId FROM Contact WHERE AccountId=:recordId];
    }
    @AuraEnabled
    public static List<Account> findByName2(String searchKey2) {
        String name = '%' + searchKey2 + '%';
        return [SELECT id, name, phone,Type FROM Account WHERE name LIKE :name];
	}
    @AuraEnabled
public static void updateRecord(String conId, String accId) {
   system.debug(conId);
    // update the database with the new data
    if (String.isNotBlank(conId)) {
        Contact contactToUpdate = [SELECT Id, AccountId FROM Contact WHERE Id = :conId];
        if (contactToUpdate != null) {
            contactToUpdate.AccountId = accId;
            
         }
    update contactToUpdate;
    System.debug(contactToUpdate);
        }
   }
}