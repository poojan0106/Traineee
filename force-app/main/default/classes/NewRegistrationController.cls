public class NewRegistrationController {
    public Registration__c Registration { get; set; }
    public String errorMessage { get; set; }
    
    public NewRegistrationController() {
        Registration = new Registration__c();
    }
    
    public PageReference save() {
        try {
            insert Registration;
            // Redirect to a success page or show a success message
            return Page.WebinarPage;
        } catch(Exception e) {
            // Set error message to display on the page
            errorMessage = e.getMessage();
            return null;
        }
    }
}