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
    
    //     @AuraEnabled
    // public static void sendCalendarInvite(List<String> emailAddresses, String icsContent) {
    //     if (emailAddresses == null || emailAddresses.isEmpty()) {
    //         throw new AuraHandledException('Email address list is empty.');
    //     }

    //     Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
    //     attachment.setFileName('SalesforceWebinar.ics');
    //     attachment.setBody(Blob.valueOf(icsContent));
    //     attachment.setContentType('text/calendar');

    //     for (String email : emailAddresses) {
    //         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    //         mail.setToAddresses(new List<String>{ email });
    //         mail.setSubject('You\'re invited: Salesforce Webinar');
    //         mail.setPlainTextBody('Join our webinar!\n\nGoogle Meet: https://meet.google.com/zyk-xoty-xsz\n\nSee attached calendar invite.');
    //         mail.setFileAttachments(new Messaging.EmailFileAttachment[]{ attachment });
    //         Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
    //     }
    // }



    // @AuraEnabled
    // public static void sendCalendarInvite(List<String> emailAddresses, String icsContent) {
    //     if (emailAddresses == null || emailAddresses.isEmpty()) {
    //         throw new AuraHandledException('Email address list is empty.');
    //     }

    //     Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
    //     attachment.setFileName('SalesforceWebinar.ics');
    //     attachment.setBody(Blob.valueOf(icsContent));
    //     attachment.setContentType('text/calendar; charset=UTF-8; method=REQUEST');

    //     for (String email : emailAddresses) {
    //         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    //         mail.setToAddresses(new List<String>{ email });
    //         mail.setSubject('You\'re invited: Salesforce Webinar');
    //         mail.setPlainTextBody('Join our webinar!\nGoogle Meet: https://meet.google.com/zyk-xoty-xsz\n\nOpen the attached invite to RSVP.');
    //         mail.setFileAttachments(new Messaging.EmailFileAttachment[]{ attachment });
    //         Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
    //     }
    // }

    //     @AuraEnabled
    // public static void sendInvite(List<String> emailAddresses, String icsContent, String googleLink) {
    //     if (emailAddresses == null || emailAddresses.isEmpty()) {
    //         throw new AuraHandledException('No emails provided.');
    //     }

    //     Messaging.EmailFileAttachment icsAttachment = new Messaging.EmailFileAttachment();
    //     icsAttachment.setFileName('event-invite.ics');
    //     icsAttachment.setBody(Blob.valueOf(icsContent));
    //     icsAttachment.setContentType('text/calendar; charset=UTF-8; method=REQUEST');

    //     for (String email : emailAddresses) {
    //         Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    //         mail.setToAddresses(new List<String>{ email });
    //         mail.setSubject('You are invited: Salesforce Webinar');
    //         mail.setPlainTextBody(
    //             'Join us for a Salesforce webinar!\n\n' +
    //             '📅 Date: July 1, 2025\n' +
    //             '🕒 Time: 3:00 PM - 4:00 PM UTC\n' +
    //             '🔗 Google Meet: https://meet.google.com/zyk-xoty-xsz\n\n' +
    //             '📌 Add to Calendar:\n' +
    //             '- Open the attached invite\n' +
    //             '- Or click to add: ' + googleLink
    //         );
    //         mail.setFileAttachments(new Messaging.EmailFileAttachment[]{ icsAttachment });
    //         Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
    //     }
    // }

 @AuraEnabled
public static void sendInvite(List<String> emailAddresses, String icsContent, String googleLink) {
    if (emailAddresses == null || emailAddresses.isEmpty()) {
        throw new AuraHandledException('No emails provided.');
    }

    Messaging.EmailFileAttachment icsAttachment = new Messaging.EmailFileAttachment();
    icsAttachment.setFileName('event-invite.ics');
    icsAttachment.setBody(Blob.valueOf(icsContent));
    icsAttachment.setContentType('text/calendar; charset=UTF-8; method=REQUEST');

    for (String email : emailAddresses) {
        String lowerEmail = email.toLowerCase();
        String calendarLink;

        // Select the right calendar URL based on domain
        if (lowerEmail.endsWith('@gmail.com')) {
            calendarLink = googleLink;
        } else if (lowerEmail.endsWith('@yahoo.com')) {
            calendarLink =
                'https://calendar.yahoo.com/?v=60&title=Salesforce+Webinar' +
                '&st=20250701T150000Z&et=20250701T160000Z' +
                '&desc=Join+us+via+Google+Meet+for+a+live+demo' +
                '&in_loc=https://meet.google.com/zyk-xoty-xsz';
        } else if (
            lowerEmail.endsWith('@outlook.com') || 
            lowerEmail.endsWith('@hotmail.com') || 
            lowerEmail.endsWith('@live.com')
        ) {
            calendarLink =
                'https://outlook.live.com/calendar/0/deeplink/compose?' +
                'subject=Salesforce+Webinar' +
                '&startdt=2025-07-01T15:00:00Z' +
                '&enddt=2025-07-01T16:00:00Z' +
                '&body=Join+us+via+Google+Meet+for+a+live+demo' +
                '&location=https://meet.google.com/zyk-xoty-xsz';
        } else {
            calendarLink = googleLink; // Default fallback
        }

        // Email HTML with a single generic calendar icon (use emoji or hosted icon)
        String htmlBody =
            '<p>You are invited to our Salesforce webinar:</p>' +
            '<ul>' +
            '<li><strong>Date:</strong> July 1, 2025</li>' +
            '<li><strong>Time:</strong> 3:00 PM - 4:00 PM UTC</li>' +
            '<li><strong>Google Meet:</strong> <a href="https://meet.google.com/zyk-xoty-xsz">Join Meeting</a></li>' +
            '</ul>' +
            '<p><strong>Add to your calendar:</strong><br>' +
            '<a href="' + calendarLink + '" target="_blank">' +
            '🗓️ Add to Calendar</a>' +
            '</p>';

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new List<String>{ email });
        mail.setSubject('You are invited: Salesforce Webinar');
        mail.setHtmlBody(htmlBody);
        mail.setFileAttachments(new Messaging.EmailFileAttachment[]{ icsAttachment });

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

@AuraEnabled(cacheable=true)
public static List<AccountContact__c> getAccountsForContact(Id contactId) {
    return [
        SELECT Id, Status__c, Account__r.Name
        FROM AccountContact__c
        WHERE Contact__c = :contactId
    ];
}

@AuraEnabled
public static void updateSingleJunctionStatus(Id junctionId) {
    AccountContact__c record = [
        SELECT Id, Status__c FROM AccountContact__c WHERE Id = :junctionId
    ];
    record.Status__c = 'Complete All';
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