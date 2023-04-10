trigger ContactUpdateTrigger on Contact (after update) {
    for (Contact c : Trigger.new) {
        if (c.Name != Trigger.oldMap.get(c.Id).Name) {
            // The contact name has been changed
            DateTime scheduledTime = DateTime.now().addMinutes(10);
            String taskSubject = 'Follow up on contact name change: ' + c.Name;
            Task newTask = new Task(
                Subject = taskSubject,
                WhoId = c.Id,
                ActivityDate = scheduledTime.date(),
                Priority = 'Normal',
                Status = 'Not Started'
            );
            insert newTask;
        }
    }
}