public class InterviewAccountCreation {
    @AuraEnabled
    public static void createInteviewAccount(String LstName , Integer CntactCount) {
        List<Account> list1 = new List<Account>();
        System.debug(LstName);
        System.debug(CntactCount);
            Account acc = new Account();
            acc.Name = LstName;
            acc.Contact_Count__c = CntactCount;
            list1.add(acc);
        
        insert list1;
                
    }

    @AuraEnabled(cacheable=true)
        public static List<Contact> fetchCont(String AccId){
            System.debug(AccId);
                return [SELECT Id, Name ,Email FROM Contact WHERE AccountId =:AccId  ORDER BY Name DESC ];
        }

        @AuraEnabled(cacheable=true)
        public static List<Account> fetchAcc(){
            System.debug('i am here');
        return [SELECT Id, Name ,Contact_Count__c FROM Account  ORDER BY CreatedDate DESC limit 1 ];
        }
}