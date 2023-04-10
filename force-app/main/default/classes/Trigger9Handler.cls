public class Trigger9Handler {
    public static void deletReletedAcco(List<Contact> oldContacts) {
        Set<Id> accIds = new Set<Id>();
        
        for (Contact c : oldContacts) {
            accIds.add(c.AccountId);
        }
        
        List<Account> accDelete = new List<Account>();
        for (Account a : [SELECT Id FROM Account WHERE Id IN :accIds]) {
            accDelete.add(a);
        }
        
        if (!accDelete.isEmpty()) {
            delete accDelete;
        }
    }
}