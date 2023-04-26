public class lmsTask3 {
    @AuraEnabled(cacheable=true)
        public static List<Account> fetchAcc(){
        return [SELECT Id, Name FROM Account ORDER BY Name DESC];
    }
    @AuraEnabled(cacheable=true)
        public static List<Contact> fetchCon(String accountId){
            List<Contact> conList = new List<Contact>();
            if(accountId != null || accountId != ''){
            conList =  [SELECT Id,Name FROM Contact WHERE AccountId = :accountId];
            
        }
        return conList;
    }
    @AuraEnabled(cacheable=true)
        public static List<Opportunity> fetchOpp(String accountId){
            List<Opportunity> oppList = new List<Opportunity>();
            if(accountId != null || accountId != ''){
               oppList =  [SELECT Id,Name FROM Opportunity WHERE AccountId = :accountId] ;
                  
            } 
            return oppList; 
    }
}