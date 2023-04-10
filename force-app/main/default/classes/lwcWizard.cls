public class lwcWizard {
    @AuraEnabled(cacheable=true)
        public static List<Account> fetchAcc(){
        return [SELECT Id, Name,Email_id__c,Type FROM Account ORDER BY Name DESC];
    }
    @AuraEnabled(cacheable=true)
        public static List<Contact> fetchCon(){
        return [SELECT Id, Name,Email_id__c,AccountId FROM Contact ORDER BY Name DESC];
    }
    @AuraEnabled(cacheable=true)
        public static List<Lead> fetchLead(){
        return [SELECT Id, Name,Email_id__c,Rating FROM Lead ORDER BY Name DESC];
    }
    @AuraEnabled(cacheable=true)
    public static void sendEmailToController(String Body, List<String> s, String Subject){
       System.debug(Body);
        try{ 
            
            for(integer i=0;i<s.size() ; i++){
                System.debug(s[i]);
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[] {s[i]};
                mail.setToAddresses(toAddresses);
                mail.setSubject(Subject);
                mail.setHtmlBody(Body);
                // Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            }
            
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }

    // @AuraEnabled(cacheable=true)
    //     public  hendle(List p){
    //     List a =[];
    //         a = p ;
    //         System.debug("a", a);
    // }
    // @AuraEnabled(cacheable=true)
    //     public  mail(String Subject){
    //     String s;
    //     s= Subject ; 
    //     System.debug("s" , s);
    // }
    // @AuraEnabled(cacheable=true)
    //     public  mail1(String Body){
    //    String b ;
    //    b= Body;
    //    System.debug("b" , b);
    // }
}