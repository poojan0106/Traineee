public class Trigger12Handler {
    public static void createContacts(List<Account> acco) {
        List<Contact> ct = new List<Contact>();
        
        for (Account acc : acco) {
            Contact Con = new Contact();
            Con.LastName = acc.Name;
            Con.AccountId = acc.Id;
            ct.add(Con);
        }
        
        if (ct.size() > 0) {
            insert ct;
        }
    }
}