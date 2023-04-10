global class scheduleApex implements Schedulable {
    global void execute(SchedulableContext ctx){
        List<Opportunity> oppList = [select Id, Name,OwnerId,CloseDate from Opportunity where IsClosed=false and CloseDate<Today];
    		Reminder.RemindOwner(oppList);
    }
}