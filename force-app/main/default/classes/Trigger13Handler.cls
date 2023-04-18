public class Trigger13Handler {
    public static void createEvents(List<Contact> cont) {
        List<Event> event = new List<Event>();
        
        for (Contact con : cont) {
            Event Eve = new Event();
                Eve.WhoId  =con.Id	;
                Eve.Subject = 'New Contact Created';
                Eve.EndDateTime = DateTime.now().addHours(1);
                Eve.Description = 'A new contact has been created:';
                Eve.StartDateTime = DateTime.now();
            event.add(Eve);
        }
        
        if (event.size() > 0) {
            insert event;
        }
    }



}