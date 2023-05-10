global class interviewSchedule implements Schedulable {
    // global void execute(SchedulableContext sc) {
//         List<Contact> contacts = [SELECT Id,Email,Name FROM Contact where Name  = 'la1'];

//     System.debug(contacts);
// for(integer i=0;i<contacts.size() ; i++){
//     Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
//     String[] toAddresses = new String[] {contacts[i].Email};
//     mail.setToAddresses(toAddresses);
//     mail.setSubject(' poojan task!');
//     mail.setPlainTextBody('Dear ' + contacts[i].Name + ',\n\nThank you for visit my page. We look forward to serving you.\n\nBest,\nOur Team');
//      Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
// }
    // }

    global void execute(SchedulableContext ctx) {
        // Query for contacts created in the last 19 minutes
        List<Contact> contacts = [SELECT Id, Name, Email FROM Contact WHERE CreatedDate >= :DateTime.now().addMinutes(-19)];
        
        // Iterate over contacts and send email
        for (Contact c : contacts) {
           Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
           email.setToAddresses(new List<String>{c.Email});
           email.setSubject('New contact created: ' + c.Name);
           email.setPlainTextBody('A new contact has been created: ' + c.Name);
           Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
        }
        
        // Reschedule the job to run again in 19 minutes
        Datetime now = Datetime.now();
        Datetime nextRunTime = now.addMinutes(19);
        String cronExpression = '' + nextRunTime.second() + ' ' + nextRunTime.minute() + ' ' + nextRunTime.hour() + ' ' + nextRunTime.day() + ' ' + nextRunTime.month() + ' ? ' + nextRunTime.year();
        System.schedule('My Scheduled Apex Job', cronExpression, new interviewSchedule());
     }

}
