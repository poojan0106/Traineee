@isTest
public class Trigger13HandlerTest {
    @isTest
    static void testCreateEvents() {
        // Test data setup
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            Contact con = new Contact();
            con.FirstName = 'Test' + i;
            con.LastName = 'Contact' + i;
            contacts.add(con);
        }
        insert contacts;
        
        Test.startTest();
        
        // Call the createEvents() method
        Trigger13Handler.createEvents(contacts);
        
        Test.stopTest();
        
        // Retrieve the events created
        List<Event> events = [SELECT WhoId, Subject, EndDateTime, Description, StartDateTime FROM Event];
        
        // Assert the number of events created
        System.assertEquals(5, events.size(), 'Incorrect number of events created');
        
        // Assert the event field values
        for (Integer i = 0; i < 5; i++) {
            System.assertEquals(contacts[i].Id, events[i].WhoId, 'Incorrect WhoId value');
            System.assertEquals('New Contact Created', events[i].Subject, 'Incorrect Subject value');
            System.assertEquals(DateTime.now().addHours(1).format(), events[i].EndDateTime.format(), 'Incorrect EndDateTime value');
            System.assertEquals('A new contact has been created:', events[i].Description, 'Incorrect Description value');
            System.assertEquals(DateTime.now().format(), events[i].StartDateTime.format(), 'Incorrect StartDateTime value');
        }
    }
}