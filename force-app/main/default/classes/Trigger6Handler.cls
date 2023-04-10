public class Trigger6Handler {
    public static void ModifyNameSendEmail(List<Account> accList, Map<Id, Account> accMap){
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        Set<Id> accId = new Set<Id>();
        for(Account acc : accList){
            if(acc.Name != accMap.get(acc.Id).Name){
                accId.add(acc.Id);
            }
        }
        if(accId.size()>=1){
            List<Contact> contactList = new List<Contact>();
            contactList = [Select Id, Email from Contact where Email != null AND AccountId IN :accId];
            if(contactList.size()>=1){
                List<String> contactEmail = new List<String>();
                for(Contact con : contactList){
                    contactEmail.add(con.Email);
                    System.debug(contactEmail);
                }
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(contactEmail);
                mail.setReplyTo(UserInfo.getUserEmail());
                mail.setSubject('Account Name Changed');
                String body = 'Hi, ';
                body += 'Your Account name has been changed.';
                mail.setHtmlBody(body);
                mails.add(mail);
            }
        }        
        Messaging.sendEmail(mails);
    }
    
}