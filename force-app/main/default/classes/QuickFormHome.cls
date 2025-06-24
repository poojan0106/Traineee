//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         09/01/2023           Home Page UI              QUIC-37, QUIC-36
// ===================================
//   Edited as per sheet(qf_home.cls - 1)
public without sharing class QuickFormHome{
    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 09/01/2023
    // # Description: Used to Read All Forms record
    // =================================== -->
    @AuraEnabled
    // public static Map<Integer,List<Form__c>> getFormRecords(){
    //     try {
    //         List<Form__c> forms = [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
    //         Integer count = [SELECT Count() FROM Form__c];
    //         Map<Integer,List<Form__c>> data = new Map<Integer,List<Form__c>>();
    //         data.put(count,forms);
    //         return data;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }
    //   Edited as per sheet(qf_home.cls - 2 & 3)
    public static List<formwrapper> getFormRecords(){
        try{
            return commonquery(null);
        } catch (Exception e){
            // error_handler.insert_errordata(e,'QuickFormHome','getFormRecords');
            System.debug(e.getMessage());
            // throw new AuraHandledException(e.getMessage());
            return null;
        }
    }

    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 09/01/2023
    // # Description: Used to Search Form
    // =================================== -->
    @AuraEnabled
    public static List<formwrapper> searchForms(String searchkey){
        try{
            return commonquery(searchkey);
        } catch (Exception e){
            // error_handler.insert_errordata(e,'QuickFormHome','searchForms');
            System.debug(e.getMessage());
            return null;
            // throw new AuraHandledException(e.getMessage());
        }
    }

    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 09/01/2023
    // # Description: Used to Change Status of form
    // =================================== -->
    //   Edited as per sheet(qf_home.cls - 2 & 3 & 5)
    @AuraEnabled
    public static List<formwrapper> getFormsByStatus(Id id, String searchkey){
        try{

            Form__c form = [SELECT Id, Name, Status__c, (SELECT Id
                                                         FROM Form_Submissions__r)
                            FROM Form__c 
                            WHERE Id = :id
                            order by createdDate DESC];

            if (form.Status__c == true){
                form.Status__c = false;
            } else{
                form.Status__c = true;
            }
            update form;

            return commonquery(searchkey);

        } catch (Exception e){
            error_handler.insert_errordata(e, 'QuickFormHome', 'getFormsByStatus');
            System.debug(e.getMessage());
            return null;
            // throw new AuraHandledException(e.getMessage());
        }
    }

    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 09/01/2023
    // # Description: Used to delete form
    // =================================== -->
    //   Edited as per sheet(qf_home.cls - 2 & 3 & 5)
    @AuraEnabled
    public static List<formwrapper> deleteFormRecord(Id id, String searchkey){
        try{
            Form__c form = [SELECT Id, Name, Status__c, (SELECT Id
                                                         FROM Form_Submissions__r)
                            FROM Form__c 
                            WHERE Id = :id
                            order by createdDate DESC];
            delete form;

            return commonquery(searchkey);

        } catch (Exception e){
            error_handler.insert_errordata(e, 'QuickFormHome', 'deleteFormRecord');
            System.debug(e.getMessage());
            return null;
            // throw new AuraHandledException(e.getMessage());
        }
    }

    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 09/01/2023
    // # Description: Used to Rename form
    // =================================== -->
    //   Edited as per sheet(qf_home.cls - 2)
    @AuraEnabled
    public static List<formwrapper> renameFormRecord(Id id, String rename, String searchkey){
        try{
            Form__c form = [SELECT Name
                            FROM Form__c
                            WHERE Id = :id
                            order by createdDate DESC];
            form.Name = rename;
            update form;
            return commonquery(searchkey);

        } catch (Exception e){
            error_handler.insert_errordata(e, 'QuickFormHome', 'renameFormRecord');
            System.debug(e.getMessage());
            return null;
            // throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    // public static Void sendemail(String name, String email, String cc, String subject, String body, List<String> contentVersionIds){
    public static Void sendemail(String name, String email, String subject, String body, List<String> fname, List<String> fbase64){
        try{
            // System.debug('con==>'+ contentVersionIds);
            List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            String myCustomLabel = System.Label.supportEmail;
            System.debug('customlabel ==> ' + myCustomLabel);
            List<String> address = new List<String>{ myCustomLabel };

            // List<string> strCC = new List<string>();
            // if(cc != null && cc != ''){
            //     strCC.add(cc);
            // }
            // List<ContentVersion> contentList = [SELECT Id, Title, Versiondata, FileType FROM ContentVersion WHERE Id IN: contentVersionIds];
            System.debug('list of fname ==> ' + fname);
            System.debug('list of fbase64 ==> ' + fbase64);
            List<Messaging.Emailfileattachment> fileAttachments = new List<Messaging.Emailfileattachment>();
            for (Integer i = 0; i < fname.size(); i++){

                // for (String fname : fbase64.length) {
                Messaging.Emailfileattachment efat = new Messaging.Emailfileattachment();
                efat.setFileName(fname[i]);
                // String fdata = fileDataMap.get(fname);
                String fdata = fbase64[i];
                efat.setBody(EncodingUtil.base64Decode(fdata));
                fileAttachments.add(efat);
            }
            // }
            // Messaging.Emailfileattachment efat = new Messaging.Emailfileattachment();
            // efat.setFileName(fname);
            // efat.setBody(EncodingUtil.base64Decode(fdata));
            // fileAttachments.add(efat);


            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setSubject(subject);
            mail.setplaintextbody(body + '\n\n\nFrom ' + name + '\nEmail ' + email);
            mail.setToAddresses(address) ;
            // if(strCC != null && strCC.size() > 0) {
            //     mail.setCcAddresses(strCC);
            // }
            if (fileAttachments != null && fileAttachments.size() > 0){
                mail.setFileAttachments(fileAttachments);
            }
            emailList.add(mail);
            Messaging.sendEmail(emailList);
            System.debug('FileAttachment ==>' + fileAttachments);
        } catch (Exception e){
            error_handler.insert_errordata(e, 'QuickFormHome', 'sendemail');
            System.debug(e.getMessage());
            // throw new AuraHandledException(e.getMessage());
        }
    }

    // custom meta data
    Public static String formid{ get; set; }

    Public static String test_form_id;

    public string urlvalue{ get; set; }

    public QuickFormHome(){
        urlvalue = Apexpages.currentPage().getParameters().get('formid');
    }

    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> getProgressindicator(){
        return Progress_Indicator__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<	Captcha_Type__mdt> getCaptchatype(){
        return Captcha_Type__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> f_Get_Types(){
        try {
            List<Progress_Indicator__mdt> l_Types = new List<Progress_Indicator__mdt>();
             
            l_Types = [SELECT DeveloperName,Label,sr__c FROM Progress_Indicator__mdt ORDER BY sr__c ASC]; // Can include multiple fields, 
            System.debug(l_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return l_Types;
        } catch (Exception e) {
            // error_handler.insert_errordata(e ,'customMetadata','f_get_Type');
            // System.debug(e.getMessage());
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }

    @AuraEnabled(cacheable=true)

    public static List<Captcha_Type__mdt> Get_Captcha_Types(){
        try {
            List<Captcha_Type__mdt> Captcha_Types = new List<Captcha_Type__mdt>();
             
            Captcha_Types = [SELECT DeveloperName,Label,sr__c FROM Captcha_Type__mdt ORDER BY sr__c ASC]; // Can include multiple fields, 
            System.debug(Captcha_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return Captcha_Types;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'customMetadata','Get_Captcha_Types');
            // System.debug(e.getMessage());
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }

    // @AuraEnabled
    @AuraEnabled
    public static String siteUrl(String Formid){
        String publishedURL = '';
        try {
            System.debug('Method Name : customMetadata.siteUrl');
            System.debug('Form ID: '+ Formid);
            List<Form__c> formRecord = new List<Form__c>([SELECT Id, Name, Form_Published_URL__c FROM Form__c WHERE Id = :Formid]);
            QuickForm_Administration__c customsetting = QuickForm_Administration__c.getInstance();
            System.debug('-> '+customsetting.SecureUrl__c); 
            
            if(String.isBlank(customsetting.SecureUrl__c)) {
                publishedURL = 'Please select site from User Configuration tab to publish form.';
            }else if(formRecord.size() > 0 && !String.isBlank(formRecord[0].Form_Published_URL__c) && formRecord[0].Form_Published_URL__c.contains(customsetting.SecureUrl__c)) {
                publishedURL = formRecord[0].Form_Published_URL__c;
            }else if(!String.isBlank(customsetting.SecureUrl__c)) {
                String modifiedSecureURL = customsetting.SecureUrl__c;
                System.debug('modifiedSecureURL --> '+modifiedSecureURL);

                // Form Id Encryption 
                String encryptedData = EncryptDecryptController.processEncryption(Formid);
                publishedURL = modifiedSecureURL+'PreViewForm?access_key='+encryptedData;
                System.debug(publishedURL);
                Form__c formRec = new Form__c(Id = Formid);
                formRec.Form_Published_URL__c = publishedURL;
                update formRec;
            }else {
                publishedURL = 'Please select site from User Configuration tab to publish form.';
            }
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'customMetadata','siteUrl');
            // System.debug(e.getMessage());
            System.debug('An exception occurred: ' + e.getMessage());
            return null;
        }
        return publishedURL;
    }

    // This method is use to send the form list which are present in the org, this is common method used in 5 methods
    public static List<formwrapper> commonquery(String searchkey){
        String searchkeyword = '%' + searchkey + '%';
        String query = 'SELECT Id, Name, Status__c ,(SELECT Id FROM Form_Submissions__r) FROM Form__c';
        if (searchkey != null && searchkey != '' && searchkey != 'undefined'){
            query += ' WHERE Name LIKE :searchkeyword order by createdDate  DESC  ';
        } else{
            query += ' order by createdDate  DESC   ';
        }
        List<Form__c> forms = Database.query(query);

        List<formwrapper> wrapper = new List<formwrapper>();
        for (Form__c QFform : forms){
            wrapper.add(new formwrapper(QFform.Form_Submissions__r.size(), QFform));
        }
        System.debug(wrapper + ' wrapper');
        return wrapper;
    }

    // This wrapper is use to wrap form with it submission count
    public class formwrapper{
        @AuraEnabled
        public Integer submission_count{ get; set; }

        @AuraEnabled
        public Form__c formlist{ get; set; }

        public formwrapper(Integer count, Form__c form){
            try{
                this.submission_count = count;
                this.formlist = form;
            } catch (Exception e){
                throw new AuraHandledException(e.getMessage());
            }
        }

    }

}