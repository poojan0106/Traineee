global class ScheduleEmailAction implements Schedulable {
    private List<Contact> newContacts;
	private Map<Id,Contact> oldMap;
    global ScheduleEmailAction(List<Contact> newContacts) {
        this.newContacts = newContacts;
        this.oldMap = oldMap;
    }

    global void execute(SchedulableContext context) {
         List<Task> tasksToInsert = new List<Task>();       
        for (Contact con : newContacts) {   
           
             if (con.Name != oldMap.get(con.Id).Name) {  
                 
                // The contact name has been changed
                    Task t = new Task();
                    t.whoId=con.id;
                    t.Subject = 'Contact Name Update';
                    t.Priority = 'Normal';
                    t.Status = 'Not Started';
                    t.OwnerId = con.OwnerId;
                    t.WhoId = con.Id;
                    tasksToInsert.add(t);  
            }
        }
        if (!tasksToInsert.isEmpty()) {
            insert tasksToInsert;
        }
    }
}