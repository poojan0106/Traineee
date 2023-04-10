public class TriggerRs1Handler {
    public static void RollupSummary(List<Contact> contacts) {
        Set<ID> acctIds = new Set<ID>();
        for (Contact con : contacts) {
            acctIds.add(con.AccountId);
        }

        Map<ID, Contact> contactsForAccounts = new Map<ID, Contact>([SELECT Id, AccountId, Ammount__c FROM Contact WHERE AccountId IN :acctIds]);

        Map<ID, Account> acctsToUpdate = new Map<ID, Account>([SELECT Id, Total_ammount__c FROM Account WHERE Id IN :acctIds]);

        for (Account acct : acctsToUpdate.values()) {
            Set<Id> conIds = new Set<Id>();
            Decimal totalValue = 0;
            for (Contact con : contactsForAccounts.values()) {
                if (con.AccountId == acct.Id && con.Ammount__c != NULL) {
                    totalValue += con.Ammount__c; 
                }
            }
            acct.Total_ammount__c = totalValue;
        }
        if (acctsToUpdate.values().size() > 0) {
            update acctsToUpdate.values();
        }
    }
}