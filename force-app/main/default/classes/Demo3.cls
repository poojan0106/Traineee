public class Demo3 {

    
    @AuraEnabled
    public static List<Account> fetchAcc1 (){
        return [SELECT Id, Name, Phone,Type FROM Account ORDER BY Name DESC];
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