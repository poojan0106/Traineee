public class Trigger7Handler {
    public static void createTaskOnNameUpdate(List<Opportunity> newList, Map<Id, Opportunity> oldMap) {
        List<Task> taskList = new List<Task>();
        
        for (Opportunity opp : newList) {
            if (opp.Name != oldMap.get(opp.Id).Name) {
            DateTime scheduledTime = DateTime.now().addMinutes(10);
                Task t = new Task(
                    Subject = 'Opportunity Name Update',
                    Description = 'Opportunity name was updated',
                    OwnerId = opp.OwnerId,
                    WhatId = opp.Id,
                    Priority = 'Normal',
                    Status = 'Not Started',
                    ActivityDate = Date.today()
                );
                taskList.add(t);
            }
        }
        
        if (!taskList.isEmpty()) {
            insert taskList;
        }
    }
}