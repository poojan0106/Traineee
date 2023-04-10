public class InsertAccount implements Database.Batchable<sObject> {
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('select id, Name,phone__c,Max_ammount__c from Account');
    }
    public void execute(Database.BatchableContext bc,List<Account> accountList){
        for(Account ac: accountList){
            ac.Name='batch example test---' + ac.Name;
            ac.phone__c='1111111111';
            ac.Max_ammount__c=300;     
                }
        update accountList;
    }
    public void finish(Database.BatchableContext bc){
        System.debug('Account name updated sucessfully');
    }
}