public class qf_guide2_Controller {

    @AuraEnabled
    public static List<Site> getSites() {
        try {
            return [SELECT Id, Name, MasterLabel, Subdomain, SiteType, Status FROM Site WHERE Status='Active' ];
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'qf_guide2_Controller','saveSecureUrl');
            return null;
        }
    }

    @AuraEnabled
    public static void saveSecureUrl(Id selectedSiteid) {
        try {
            SiteDetail siteDetail = [SELECT Id, SecureUrl FROM SiteDetail WHERE DurableId = :selectedSiteid];
            QuickForm_Administration__c customSetting = QuickForm_Administration__c.getOrgDefaults();
            customSetting.SecureUrl__c = siteDetail.SecureUrl;
            customSetting.SiteId__c = selectedSiteid;
            upsert customSetting;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'qf_guide2_Controller','saveSecureUrl');
            // return null;
        }
    }

    @AuraEnabled
    public static String getSettingData() {
        try {
            QuickForm_Administration__c customSetting = QuickForm_Administration__c.getOrgDefaults();
            return customSetting.SiteId__c;    
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'qf_guide2_Controller','saveSecureUrl');
            return null;
        }
    }

    // get site from org 
    @AuraEnabled
    public static List<String> getSitePrefixes() {
        try {
            List<String> sitePrefixes = new List<String>();
            for(Site site : [SELECT Id, Name, Subdomain, SiteType, Status FROM Site WHERE Status='Active']) {
                if(site.SiteType == 'Site') {
                    sitePrefixes.add(site.Subdomain);
                }
            }
            return sitePrefixes;
            
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'qf_guide2_Controller','saveSecureUrl');
            return null;
        }
    }

    // @AuraEnabled
    // public static void deletePermissionSet(){
    //     try {
    //         String sitename = 'first site';
    //         User us = [SELECT Id, Name FROM User WHERE Name = :sitename+' Site Guest User'];
    //         System.debug('us -> '+us.Name);
    //         PermissionSet permissionset = [SELECT Id, Name FROM PermissionSet WHERE Name = 'QuickForm_Site_User_Access'];
    //         System.debug('permissionset -> '+permissionset.Name);

    //         PermissionSetAssignment psa = [SELECT Id FROM PermissionSetAssignment WHERE PermissionSetId = :permissionset.Id AND AssigneeId = :us.Id];
    //         delete psa;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    @AuraEnabled
    public static void assignPermissionSet(String oldselectedSiteName, String newselectedSiteName){
        try {
            
            PermissionSet permissionset = new PermissionSet();
            permissionset = [SELECT Id, Name FROM PermissionSet WHERE Name = 'QuickForm_Site_User_Access'];            
            if(Test.isRunningTest()){
                permissionset = [SELECT Id, Name FROM PermissionSet WHERE Name = 'TestQuickform'];            
            }

            if(oldselectedSiteName!=''){
            User oldusr = [SELECT Id, Name FROM User WHERE Name = :oldselectedSiteName+' Site Guest User'];
            System.debug('us -> '+oldusr.Name);

            PermissionSetAssignment oldpsa = [SELECT Id FROM PermissionSetAssignment WHERE PermissionSetId = :permissionset.Id AND AssigneeId = :oldusr.Id];
                if(oldpsa != null){
            delete oldpsa;
                }
            }

            User newSiteusr = [SELECT Id, Name FROM User WHERE Name = :newselectedSiteName+' Site Guest User'];
            PermissionSetAssignment newpsa = new PermissionSetAssignment();
            newpsa.PermissionSetId = permissionset.id;
            newpsa.AssigneeId = newSiteusr.id;
            insert newpsa;

        } catch (Exception e) {
            System.debug('Exception--->>'+e.getMessage()+'-->'+e.getLinenumber());
        }
    }
}