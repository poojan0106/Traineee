public class InterviewHandler {
    public static void caContact(List<Account> acc) {
        List<Contact> ct = new List<Contact>();
                for (Account ac : acc) {
                    Integer ii = ac.Contact_Count__c.intValue();
                    System.debug(ii);
                    Integer count= math.mod(ii, 9); 
                    System.debug(count);
                    if (ac.Contact_Count__c <= 100) {
                        if (count == 0) {
                            Integer conCount = ii/9;
                            for (Integer i=1 ; i<=conCount ; i++) {
                                Contact Con = new Contact();
                                Con.LastName = ac.Name ;
                                Con.AccountId = ac.Id;
                                Con.Email = 'foruse199p@gmail.com';
                                ct.add(Con);
                            }
                        }
                    }  
                }
                System.debug(ct);
                if (ct.size() > 0) {
                    insert ct;
                }
                

    }
}
