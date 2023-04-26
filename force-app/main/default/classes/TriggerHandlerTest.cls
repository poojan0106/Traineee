@isTest
public class TriggerHandlerTest {
//----------------------------------------------triggt13Handler.cls ----------------------------------------------------------------
    @isTest
    static void testCreateEvents() {
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            Contact con = new Contact();
            con.FirstName = 'Test' + i;
            con.LastName = 'Contact' + i;
            contacts.add(con);
        }
        insert contacts;
        Test.startTest();
        Trigger13Handler.createEvents(contacts);
        Test.stopTest();
        List<Event> events = [SELECT WhoId, Subject, EndDateTime, Description, StartDateTime FROM Event];
        System.assertEquals(5, events.size(), 'Incorrect number of events created');
        for (Integer i = 0; i < 5; i++) {
            System.assertEquals(contacts[i].Id, events[i].WhoId, 'Incorrect WhoId value');
            System.assertEquals('New Contact Created', events[i].Subject, 'Incorrect Subject value');
            System.assertEquals(DateTime.now().addHours(1).format(), events[i].EndDateTime.format(), 'Incorrect EndDateTime value');
            System.assertEquals('A new contact has been created:', events[i].Description, 'Incorrect Description value');
            System.assertEquals(DateTime.now().format(), events[i].StartDateTime.format(), 'Incorrect StartDateTime value');
        }
    }




//-----------------------------------demo3.cls  drag drop aura component.------------------------------------------------------------
    @testSetup
    static void setupTestData() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 5; i++) {
            Account acc = new Account(Name = 'Test Account ' + i, Type = 'Customer', Phone = '234234342');
            accounts.add(acc);
        }
        insert accounts;
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            Contact con = new Contact(FirstName = 'Test', LastName = 'Contact ' + i, Phone = '45434345534',Email = 'testcontact' + i + '@example.com', AccountId = accounts[i].Id);
            contacts.add(con);
        }
        insert contacts;
    }
    @isTest
    static void testFetchAcc1() {
        List<Account> accounts = Demo3.fetchAcc1();
        System.assertEquals(5, accounts.size(), 'Expected 5 accounts');
    }
    @isTest
    static void testFetchCon1() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        List<Contact> contacts = Demo3.fetchCon1(testAccount.Id);
        System.assertEquals(1, contacts.size(), 'Expected 1 contact');
    }
    @isTest
    static void testFindByName1() {
        List<Account> accounts = Demo3.findByName1('Test Account');
        System.assertEquals(5, accounts.size(), 'Expected 5 accounts');
    }
    @isTest
    static void testFetchAcc2() {
        List<Account> accounts = Demo3.fetchAcc2();
        System.assertEquals(5, accounts.size(), 'Expected 5 accounts');
    }
    @isTest
    static void testFetchCon2() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];
        List<Contact> contacts = Demo3.fetchCon2(testAccount.Id);
        System.assertEquals(1, contacts.size(), 'Expected 1 contact');
    }
    @isTest
    static void testFindByName2() {
        List<Account> accounts = Demo3.findByName2('Test Account');
        System.assertEquals(5, accounts.size(), 'Expected 5 accounts');
    }
    @isTest
    static void testUpdateRecord() {
        Account testAccount1 = [SELECT Id FROM Account LIMIT 1];
        Account testAccount2 = [SELECT Id FROM Account LIMIT 1   OFFSET 1];
        Contact testContact = [SELECT Id, AccountId FROM Contact LIMIT 1];
        Demo3.updateRecord(testContact.Id, testAccount2.Id);
        Contact updatedContact = [SELECT Id, AccountId FROM Contact WHERE Id = :testContact.Id];
        System.assertEquals(testAccount2.Id, updatedContact.AccountId, 'Expected contact to be updated with new Accounts Id');
    }





//-----------------------------------wizardTask.cls   lwc task 4---------------------------------------------------------------------
    @isTest
    public static void testSave() {
        Account accountData = new Account(Name = 'Test Account');
        Contact contactData = new Contact(FirstName = 'Test', LastName = 'Contact', AccountId = accountData.Id);
        Event eventData = new Event(Subject = 'Test Event', StartDateTime = Datetime.now(), EndDateTime = Datetime.now().addHours(1), WhoId = contactData.Id);
        Test.startTest();
        String result = WizardTask.save(accountData, contactData, eventData);
        Test.stopTest();
        System.assertEquals('record successfully insert', result, 'Expected result to be "record successfully insert"');
        Account insertedAccount = [SELECT Id, Name FROM Account WHERE Id = :accountData.Id];
        Contact insertedContact = [SELECT Id, FirstName, LastName, AccountId FROM Contact WHERE Id = :contactData.Id];
        Event insertedEvent = [SELECT Id, Subject, StartDateTime, EndDateTime, WhoId FROM Event WHERE Id = :eventData.Id];
        System.assertEquals(accountData.Name, insertedAccount.Name, 'Expected Account Name matches');
        System.assertEquals(contactData.FirstName, insertedContact.FirstName, 'Expected Contact First Name matches');
        System.assertEquals(contactData.LastName, insertedContact.LastName, 'Expected Contact Last Name matches');
        System.assertEquals(accountData.Id, insertedContact.AccountId, 'Expected Contact Account Id  matches');
        System.assertEquals(eventData.Subject, insertedEvent.Subject, 'Expected Event Subject matches');
        System.assertEquals(eventData.StartDateTime, insertedEvent.StartDateTime, 'Expected Event Start Date Time matches');
        System.assertEquals(eventData.EndDateTime, insertedEvent.EndDateTime, 'Expected Event End Date Time matches');
        System.assertEquals(contactData.Id, insertedEvent.WhoId, 'Expected Event WhoId matches');
    }
    @isTest
    public static void testSave_Exception() {
        Account accountData = new Account();
        Contact contactData = new Contact();
        Event eventData = new Event();
        Test.startTest();
        String result = WizardTask.save(accountData, contactData, eventData);
        Test.stopTest();
        System.assertNotEquals(null, result, 'Expected result not be null');
    }
}