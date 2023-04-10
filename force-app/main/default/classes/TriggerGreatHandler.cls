public class TriggerGreatHandler{
    
public static void GreatSolution(List<Contact> cont){
    
       	Set<Id> accId = new Set<Id>();
    
        List<Contact> conList = new List<Contact>();
    
        for(Contact c : cont){
            accId.add(c.AccountId);
        }
    
        Map<Id, Decimal> AccountMaxAmounts = new Map<Id, Decimal>();
    
    	for(Account acc : [SELECT Id, Max_ammount__c FROM Account WHERE Id IN :accId]){
            
        	AccountMaxAmounts.put(acc.Id, acc.Max_ammount__c);
    	}
    
        for(Contact con : cont){
            
            if(AccountMaxAmounts.containsKey(con.AccountId)){
                
                Decimal maxAmount = AccountMaxAmounts.get(con.AccountId);
                
               	 if(con.Ammount__c > maxAmount){
                     
                	Double cCreate = con.Ammount__c / maxAmount;
                     
                    Double norecs = cCreate - Math.floor(cCreate);
                     
                    Integer cCreates =(Integer)Math.ceil(cCreate);
                     
                    con.Ammount__c = norecs * maxAmount;
                     
                  	  for (Integer i=0; i<cCreates-1; i++){
                          
                        Contact c = new Contact(AccountId = con.AccountId);
                          
                        c.Ammount__c = maxAmount;
                          
                        c.LastName = con.LastName;
                          
                        conList.add(c);
                    }
                 }
             }
        }
      	insert conList;
    }
}