public class NewLoginController {
  public Login__c login { get; set; }

  public NewLoginController() {
    login = new Login__c();
  }

  public PageReference login() {
    List<Login__c> result = [SELECT Id FROM Login__c WHERE Name = :login.Name AND Password__c = :login.Password__c];

    if (result.size() > 0) {
      // Successful login
      return new PageReference('https://mvclouds67-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
    } 
        else {
            Apexpages.Message msg=new Apexpages.Message(Apexpages.Severity.ERROR,'invalid user name or password');
                Apexpages.addMessage(msg);
            return null;
        }
  }
}