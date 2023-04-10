public class TriggerGreatHandler2 {
    public static void GreatSolution(Map<Id, Contact> newContactsMap, Map<Id, Contact> oldContactsMap ) {
        Set<Id> accountIds = new Set<Id>();
        for(Contact c : newContactsMap.values()) {
            accountIds.add(c.AccountId);
        }
        for(Contact c : oldContactsMap.values()) {
            accountIds.add(c.AccountId);
            
        }
        Map<Id, Account> accountMap = new Map<Id, Account>([
            SELECT Id, Max_ammount__c FROM Account WHERE Id IN :accountIds]);
        List<Contact> contactsToUpsert = new List<Contact>();
        List<Contact> contactToUpsert = new List<Contact>();
      
        for(Contact c : newContactsMap.values()) {
            if(accountMap.containsKey(c.AccountId)) {
                 Account acc = accountMap.get(c.AccountId);
                              
                if(acc.Max_ammount__c < c.Ammount__c)  {
                      Integer numberOfContacts = (Integer) Math.ceil(c.Ammount__c / acc.Max_ammount__c);
                     
                      for(Integer i = 0; i < numberOfContacts; i++) {
                        Contact newContact = new Contact(AccountId = c.AccountId,LastName=c.LastName, Ammount__c = acc.Max_ammount__c);
                        contactsToUpsert.add(newContact);
                   
                          
                      }
                    if(acc.Max_ammount__c >=c.Ammount__c){
                    Integer numberOfContact = (Integer) Math.ceil(c.Ammount__c / acc.Max_ammount__c);
                   c.Ammount__c=(c.Ammount__c/acc.Max_ammount__c)*acc.Max_ammount__c;
                   Contact newContacts = new Contact(AccountId = c.AccountId,LastName=c.LastName, Ammount__c = c.Ammount__c);
                        contactToUpsert.add(newContacts);
                        
                }
                 }
              
               
                 } 
            
            }system.debug(contactsToUpsert);
         if(contactsToUpsert.size()>0){
            upsert contactsToUpsert; 
        }
        system.debug(contactToUpsert);
        if(contactToUpsert.size()>0){
            upsert contactToUpsert;
        }
        }
       
    }