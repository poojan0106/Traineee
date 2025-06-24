/**
* @File Name : OTPLoginController.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : June 18, 2025
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | June 18, 2025 |   | Initial Version
**/

public without sharing class OTPLoginController {

  @AuraEnabled
    public static String loginWithEmail(String email) {
        List<User> users = [SELECT Id, Email FROM User WHERE Email = :email AND IsActive = true LIMIT 1];
        if (users.isEmpty()) {
            throw new AuraHandledException('User not found.');
        }

        List<Auth.VerificationMethod> methods = new List<Auth.VerificationMethod>{
            Auth.VerificationMethod.EMAIL
        };

        PageReference loginPage = Site.passwordlessLogin(users[0].Id, methods, '/');
        return loginPage != null ? loginPage.getUrl() : null;
    }

}