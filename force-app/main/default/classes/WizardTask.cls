public class WizardTask {
    
        @AuraEnabled
        public static string save(Account accountData ,Contact contactData,Event EventData){
            try{
                System.debug('accountData::::'+accountData);
                System.debug('contactData::::'+contactData);
                System.debug('EventData::::'+EventData);
                
                insert accountData;
                contactData.AccountId = accountData.id;
                insert contactData;
                Integer DurationInMinute = Integer.valueOf((EventData.EndDateTime.getTime() - EventData.StartDateTime.getTime())/(1000*60));
                System.debug('Minutes : ' + DurationInMinute);
                EventData.DurationInMinutes = DurationInMinute;
                System.debug(EventData.ActivityDateTime);
                EventData.WhoId = contactData.id;
                insert EventData;
            }
            catch(Exception ex){
                return ex.getMessage();
            }
            return 'record successfully insert';  
        }
}