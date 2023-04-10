public class conNameupdateHandler {
    public static void updateName(List<Contact> newContacts , Map<Id ,Contact> oldMap ) {       
       List<Task> tasksToInsert = new List<Task>();       
        for (Contact con : newContacts) {   
           
             if (con.LastName != oldMap.get(con.Id).LastName) {  
                 DateTime scheduledTime = DateTime.now().addMinutes(10);
                 system.debug(con.LastName);
                 system.debug(oldMap.get(con.Id).LastName);
                // The contact name has been changed
                    Task t = new Task();
                    t.whoId=con.id;
                    t.Subject = 'Contact Name Update';
                    t.Priority = 'Normal';
                    t.Status = 'Not Started';
                    t.OwnerId = con.OwnerId;
                    t.WhoId = con.Id;
                    tasksToInsert.add(t); 
                 system.debug(t);
            }
        }system.debug(tasksToInsert);
        if (!tasksToInsert.isEmpty()) {
            insert tasksToInsert;
        }
    }
}