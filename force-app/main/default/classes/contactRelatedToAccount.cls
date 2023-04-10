public class contactRelatedToAccount {
    
    @AuraEnabled
    public static List<Account> fetchAcc (){
        return [SELECT Id, Name, Phone,Type FROM Account ORDER BY Name DESC];
    }    
    @AuraEnabled
    public static List<Contact> fetchCon (String recordId){
        return [SELECT Id, Name, Phone ,Email FROM Contact WHERE AccountId=:recordId];
    }
    @AuraEnabled
    public static List<Account> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        return [SELECT id, name, phone,Type FROM Account WHERE name LIKE :name];
    }
    
    

}