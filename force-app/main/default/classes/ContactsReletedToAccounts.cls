public with sharing class ContactsReletedToAccounts {
    public ContactsReletedToAccounts(){
    }
    @AuraEnabled(cacheable = true)
    public static List<Account> displyAccounts(){
        List<Account> accList =[select Id , Name from Account];
        return accList;
    }
    @AuraEnabled(cacheable = true)
    public static List<Contact>  displayContactsReletedToAccount(String accId){
        List<Contact> conList =new List<Contact>();
        for(Contact con : [select Id, LastName ,AccountId,Email from Contact Where AccountId= :accId ]){
            conList.add(con);
        }
        return conList;
    }  
}