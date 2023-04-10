global class InsertAccountRecord implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc){
       return Database.getQueryLocator('select id from Account limit 2000');
     
    }
    global void execute(Database.BatchableContext bc,List<Account> accList){
        List<Account> accToInsert = new List<Account>();
        for(integer i=1;i<=2000;i++){
            Account newAcc = new Account(
            Name='New Account--' + i,
            phone__c='99999999999',
            Max_ammount__c=1000, 
            Type = 'Prospact');
            accToInsert.add(newAcc);
        }
        if(accToInsert.size()> 0){
            insert accToInsert;
        }
    }
    global void finish(Database.BatchableContext bc){
        system.debug('insert sucessfully');
    }
}