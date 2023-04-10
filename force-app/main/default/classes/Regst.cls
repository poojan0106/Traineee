public class Regst {
  public String Name { get; set; }
  public String emailid { get; set; }
  public String password { get; set; }
  
  public void Registration() {
    Registration__c newRegistration = new Registration__c();
    newRegistration.Name = Name;
    newRegistration.Email_id__c = emailid;
    newRegistration.Password__c = Password;
    
    try {
      insert newRegistration;
      ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.INFO, 'Student registered successfully.'));
    } catch(Exception ex) {
      ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'An error occurred while registration.'));
    }
  }
}