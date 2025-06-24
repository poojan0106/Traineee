@istest
public class Test_qf_guide2_Controller {

    @istest
    static void Test_getSites(){
        qf_guide2_Controller.getSites();
    }
    
    @istest(SeeAllData=true) 
    static void Test_saveSecureUrl(){
        
        Site s = [SELECT Id, Name, MasterLabel, Subdomain, SiteType, Status FROM Site Limit 1] ;
            SiteDetail sd = [SELECT ID,DurableId FROM SiteDetail WHERE DurableId =:  s.ID];
            qf_guide2_Controller.saveSecureUrl(s.ID);
            qf_guide2_Controller.saveSecureUrl(sd.ID);
    }
    
    @istest 
    static void Test_getSettingData(){
        qf_guide2_Controller.getSettingData();
   
    }
    
    @istest 
    static void Test_getSitePrefixes(){
        qf_guide2_Controller.getSitePrefixes();
        
               // Define test data
        String oldselectedSiteName = 'Old Site Name';
        String newselectedSiteName = 'New Site Name';

        // Create a test user record for the old site
        User oldSiteUser = new User(
            FirstName = 'Old Site Name',
            LastName = 'Site Guest User',
            Alias = 'tuser',
            Email = 'testuser@test.com',
            Username = 'testuser123test900124231@test.com',
            CommunityNickname = 'tuser90192301',
            ProfileId = UserInfo.getProfileId(),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert oldSiteUser;

        // Create a test user record for the new site
        User newSiteUser = new User(
            FirstName = 'New Site Name',
            LastName = 'Site Guest User',
            Alias = 'tuser',
            Email = 'testuser@test1.com',
            Username = 'testuser123test90012@test.com',
            CommunityNickname = 'tuser9019230182341',
            ProfileId = UserInfo.getProfileId(),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert newSiteUser;

        // Create a test permission set record
        PermissionSet permissionset = new PermissionSet(
            Name = 'TestQuickform',
            Label = 'TestQuickform'
        );
        insert permissionset;

        // Create a test permission set assignment record for the old site user
        PermissionSetAssignment oldpsa = new PermissionSetAssignment(
            PermissionSetId = permissionset.Id,
            AssigneeId = oldSiteUser.Id
        );
        insert oldpsa;

        // Call the method being tested
        Test.startTest();
        qf_guide2_Controller.assignPermissionSet(oldselectedSiteName, newselectedSiteName);
        Test.stopTest();                

    }
}