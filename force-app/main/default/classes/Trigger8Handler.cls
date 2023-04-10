public class Trigger8Handler{
    public static void addPrefix(List<Account> accList){
        for(Account acc: accList){
        
            acc.Name ='Mr. ' + acc.Name;
        }
    }
}