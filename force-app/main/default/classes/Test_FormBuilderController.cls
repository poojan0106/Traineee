@istest 
public class Test_FormBuilderController {
    @TestSetup 
    static void create_data(){
            
        Test.startTest();
        ContentVersion cv = new ContentVersion();
        cv.Title = 'Test Document';
        cv.PathOnClient = 'TestDocument.pdf';
        cv.VersionData = Blob.valueOf('Test Content');
        cv.IsMajorVersion = true;
        Insert cv;

        Form__c form = new Form__c();
        form.Name = 'Test';
        form.Status__c = true;
        // form.Total_Submissions__c = 2;
        form.Mapped_Objects__c = 'text,data,demo';
        form.Form_Styling__c = 'color:red;background';
        form.Page_CSS__C = 'color:red;background-image:"test.png";padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:solid;border-width:1px;border-radius:0px;';
        form.PageBgID__c = cv.Id;
        form.FormBgID__c = cv.Id;
        insert form;

        Form__c form3 = new Form__c();
        form3.Name = 'Test4';
        form3.Status__c = true;
        // form3.Total_Submissions__c = 2;
        form3.Mapped_Objects__c = 'text,data,demo';
        form3.Form_Styling__c = 'color:red;background-image:test.pdf';
        form3.Page_CSS__C = 'color:red;background-image:"test.png";padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:solid;border-width:1px;border-radius:0px;';
        form3.PageBgID__c = cv.Id;
        form3.FormBgID__c = cv.Id;
        insert form3;

        Form__c form1 = new Form__c();
        form1.Name = 'Test2';
        form1.Status__c = true;
        // form1.Total_Submissions__c = 2;
        form1.Mapped_Objects__c = 'Account,Contact,Account,Contact,Opportunity';
        form1.FormBgID__c = 'test';
        form.Form_Styling__c = 'width:60%;padding-top:0%;padding-bottom:0%;padding-left:0%;padding-right:0%;background-color:#A391FF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;';
        form1.Button_CSS__c = 'color:red;';
        form1.Label_CSS__c = 'color:red';
        form1.All_Field_Styling__c = 'background-color:#CA3D3D;border-color:#FF16FF;border-style:Solid;border-width:10px;border-radius:10px;font-family:monospace;font-weight:Normal;color:#242424;font-size:12px;font-style:Italic;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;line-height:1;';
        form1.All_Field_Hover__c = 'color:red';
        form1.All_Field_Focus__c = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:10px;border-radius:10px;font-family:monospace;font-weight:Normal;color:#242424;font-size:12px;font-style:Italic;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';
        form1.Page_CSS__C = 'padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:solid;border-width:1px;border-radius:0px;';
        form1.PageBgID__c = cv.Id;
        insert form1;
        
        Form__c form2 = new Form__c();
        form2.Name = 'Test3';
        form2.Status__c = true;
        // form2.Total_Submissions__c = 2;
        form2.Mapped_Objects__c = 'Account,Contact,Case';
        form2.FormBgID__c = 'test';
        form2.Form_Styling__c = 'background-image:test.pdf';
        form2.Button_CSS__c = 'color red';
        form2.Label_CSS__c = 'color red';
        form2.All_Field_Styling__c = 'color red';
        form2.All_Field_Hover__c = 'color:red';
        form2.All_Field_Focus__c = 'size:13px';
        form1.Page_CSS__C = 'padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:solid;border-width:1px;border-radius:0px;';
        form2.PageBgID__c = cv.Id;
        insert form2;


        Form_Page__c pageno = new Form_Page__c();
        pageno.Name = 'Test';
        pageno.Page_Number__c = 1;
        pageno.Form__c = form.ID;
        insert pageno;

        Form_Page__c pageno3 = new Form_Page__c();
        pageno3.Name = 'Test3';
        pageno3.Page_Number__c = 1;
        pageno3.Form__c = form2.ID;
        insert pageno3;

        Form_Page__c pageno2 = new Form_Page__c();
        pageno2.Name = 'Test2';
        pageno2.Page_Number__c = 1;
        pageno2.Form__c = form.ID;
        insert pageno2;
        
        Form_Fields__c field = new Form_Fields__c();
        field.Name = 'Test,isrequired,feerf';
        field.Form__c = form.ID;
        field.Form_Page__c = pageno.ID;
        field.Field_Order__c = 3;
        field.Field_Mapping__c = 'Description<!@!>Contact';
        field.Field_Validations__c = 'isRequired<!@!>true?$`~isDisabled<!@!>false?$`~isLabel<!@!>true?$`~isHelpText<!@!>true?$`~Label<!@!>LAST NAME?$`~HelpText<!@!>ceweew?$`~isPlaceholder<!@!>true?$`~Placeholder<!@!>ecewcecewcew?$`~Minimum<!@!>25?$`~Maximum<!@!>250?$`~isPrefix<!@!>false?$`~Prefix<!@!>?$`~Decimal<!@!>?$`~Richtext<!@!>?$`~MinimumTime<!@!>?$`~MaximumTime<!@!>?$`~MinimumDateTime<!@!>?$`~MaximumDateTime<!@!>?$`~MinimumDate<!@!>?$`~MaximumDate<!@!>';
        field.Mapped_Obj__c = 'Contact';
        insert field;

        Form_Fields__c field1 = new Form_Fields__c();
        field1.Name = 'Test2,dferf';
        field1.Form__c = form.ID;
        field1.Form_Page__c = pageno.ID;
        field1.Field_Order__c = 1;
        field1.Field_Mapping__c = 'LeadSource<!@!>Opportunity';
        field1.Field_Validations__c = 'isRequired<!@!>true?$`~isDisabled<!@!>false?$`~isLabel<!@!>true?$`~isHelpText<!@!>true?$`~Label<!@!>NAME?$`~HelpText<!@!>cdescece?$`~isPlaceholder<!@!>false?$`~Placeholder<!@!>?$`~Minimum<!@!>0?$`~Maximum<!@!>128?$`~isPrefix<!@!>false?$`~Prefix<!@!>?$`~Decimal<!@!>?$`~Richtext<!@!>?$`~MinimumTime<!@!>?$`~MaximumTime<!@!>?$`~MinimumDateTime<!@!>?$`~MaximumDateTime<!@!>?$`~MinimumDate<!@!>?$`~MaximumDate<!@!>';
        field1.Mapped_Obj__c = 'Contact';

        insert field1;
        
        Form_Fields__c field2 = new Form_Fields__c();
        field2.Name = 'Test3,dferf,feerf';
        field2.Form__c = form.ID;
        field2.Form_Page__c = pageno.ID;
        field2.Field_Order__c = 2;
        field2.Field_Mapping__c = 'Name<!@!>Account';
        field2.Mapped_Obj__c = 'Contact';
        field2.Field_Validations__c = 'isRequired<!@!>false?$`~isDisabled<!@!>false?$`~isLabel<!@!>true?$`~isHelpText<!@!>true?$`~Label<!@!>ACCOUNT NUMBER?$`~HelpText<!@!>rhrthth?$`~isPlaceholder<!@!>true?$`~Placeholder<!@!>hrghrthtrhtrhtr?$`~Minimum<!@!>0?$`~Maximum<!@!>128?$`~isPrefix<!@!>false?$`~Prefix<!@!>?$`~Decimal<!@!>?$`~Richtext<!@!>?$`~MinimumTime<!@!>?$`~MaximumTime<!@!>?$`~MinimumDateTime<!@!>?$`~MaximumDateTime<!@!>?$`~MinimumDate<!@!>?$`~MaximumDate<!@!>';
        insert field2;

        Form_Fields__c field3 = new Form_Fields__c();
        field3.Name = 'QFRADIOBUTTON,Extra,0';
        field3.Form__c = form.ID;
        field3.Form_Page__c = pageno.ID;
        field3.Field_Order__c = 3;
        field3.Field_Mapping__c = 'Description<!@!>Contact';
        field3.Field_Validations__c = 'isRequired<!@!>true?$`~isDisabled<!@!>false?$`~isLabel<!@!>true?$`~isHelpText<!@!>true?$`~Label<!@!>LAST NAME?$`~HelpText<!@!>ceweew?$`~isPlaceholder<!@!>true?$`~Placeholder<!@!>ecewcecewcew?$`~Minimum<!@!>25?$`~Maximum<!@!>250?$`~isPrefix<!@!>false?$`~Prefix<!@!>?$`~Decimal<!@!>?$`~Richtext<!@!>?$`~MinimumTime<!@!>?$`~MaximumTime<!@!>?$`~MinimumDateTime<!@!>?$`~MaximumDateTime<!@!>?$`~MinimumDate<!@!>?$`~MaximumDate<!@!>';
        field3.Mapped_Obj__c = 'Contact';
        insert field3;
        
        Form_Fields__c field4 = new Form_Fields__c();
        field4.Name = 'QFSCALERATING,Extra,0';
        field4.Form__c = form.ID;
        field4.Form_Page__c = pageno.ID;
        field4.Field_Order__c = 3;
        field4.Field_Mapping__c = 'Description<!@!>Contact';
        field4.Field_Validations__c = 'isRequired<!@!>true?$`~isDisabled<!@!>false?$`~isLabel<!@!>true?$`~isHelpText<!@!>true?$`~Label<!@!>LAST NAME?$`~HelpText<!@!>ceweew?$`~isPlaceholder<!@!>true?$`~Placeholder<!@!>ecewcecewcew?$`~Minimum<!@!>25?$`~Maximum<!@!>250?$`~isPrefix<!@!>false?$`~Prefix<!@!>?$`~Decimal<!@!>?$`~Richtext<!@!>?$`~MinimumTime<!@!>?$`~MaximumTime<!@!>?$`~MinimumDateTime<!@!>?$`~MaximumDateTime<!@!>?$`~MinimumDate<!@!>?$`~MaximumDate<!@!>';
        field4.Mapped_Obj__c = 'Contact';
        insert field4;

        Form_Submission__c sub = new Form_Submission__c();
        sub.Name = 'Test Sub';
        sub.Form__c = form.ID;
        sub.First_object_data__c  = '{"sobjectType":"Account","Name":"Testing"}';
        sub.Second_object_data__C  = '{"sobjectType":"Contact","LastName":"Test"}';
        sub.Third_object_data__C  = '{"sobjectType":"Case","Status":"New"}';
        sub.Other_fields_data__c = '{"sobjectType":"Form_c","'+field.Id+'":"'+field.Name+'","'+field1.ID+'":"'+field1.Name+'","'+field2.ID+'":"'+field2.Name+'"}';
        insert sub;

        Test.stopTest();

    }

    @isTest
    static void Test_GetFieldsMetaData(){ 

        Test.startTest();

        FormBuilderController.GetFieldsMetaData();
        
        Test.stopTest();
    }
    @isTest
    static void Test_GetStyles(){ 

        Test.startTest();

        FormBuilderController.GetStyles();
        
        Test.stopTest();
    }
    @isTest
    static void Test_getFields(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.getFields(form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.getFields(form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        
        FormBuilderController.getFields(form2.ID);
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.getFields(field2.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_UploadFormImage(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];

        FormBuilderController.UploadFormImage(form.ID,'testData','Test','Test_Type');
        FormBuilderController.UploadFormImage(form1.ID,'testData','Test','Test_Type');
        
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.UploadPageImage(form2.ID,'testData','Test','Test_Type');
        
        Form__c form3 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test4'];
        FormBuilderController.UploadFormImage(form3.ID,'testData','Test','Test_Type');

        Test.stopTest();
    }
    @isTest
    static void Test_UploadPageImage(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];

        FormBuilderController.UploadPageImage(form.ID,'testData','Test','Test_Type');
        FormBuilderController.UploadPageImage(form1.ID,'testData','Test','Test_Type');

        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.UploadPageImage(form2.ID,'testData','Test','Test_Type');
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.UploadPageImage(field2.ID,'testData','Test','Test_Type');
        
        Test.stopTest();
    }
    @isTest
    static void Test_RemoveFormImage(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,PageBgID__c,Label_CSS__c FROM form__c WHERE Name = 'Test4'];
 
        FormBuilderController.RemoveFormImage(form.ID);
        
        Test.stopTest();
    }
    
    @isTest
    static void Test_RemovePageImage(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,PageBgID__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.RemovePageImage(form.ID);
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.RemovePageImage(field2.ID);

        Test.stopTest();
    }
    
    @isTest
    static void Test_StoreBtnStyles(){ 
        
        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreBtnStyles('color:red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreBtnStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreBtnStyles('color:red;',form2.ID);
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreBtnStyles('color:red;',field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_StoreBtnposition(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreBtnposition('color red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreBtnposition('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreBtnposition('color:red;',form2.ID);
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreBtnposition('color:red;',field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_StoreLabelStyles(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreLabelStyles('color red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreLabelStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreLabelStyles('color:red;',form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreLabelStyles('color:red;',field2.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_StoreFormStyles(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreFormStyles('color:red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreFormStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreFormStyles('color:red;',form2.ID);
        
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreFormStyles('color:red;',field2.ID);
        Test.stopTest();
    }
    @isTest
    static void Test_StorePageStyles(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StorePageStyles('color:red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StorePageStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StorePageStyles('color:red;',form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StorePageStyles('color:red;',field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_StoreStyles(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreStyles('color red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreStyles('color:red;',form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreStyles('color:red;',field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_getBGImages(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.getBGImages(form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.getBGImages(form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.getBGImages(form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.getBGImages(field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_StoreHoverStyles(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreHoverStyles('color:red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreHoverStyles('color red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreHoverStyles('color:red;',form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreHoverStyles('color:red;',field2.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_StoreFocusStyles(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.StoreFocusStyles('color:red;',form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.StoreFocusStyles('color:red;',form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.StoreFocusStyles('color:red;',form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.StoreFocusStyles('color:red;',field2.ID);

        Test.stopTest();
    }
    @isTest
    static void Test_formdetails(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.formdetails(form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.formdetails(form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.formdetails(form2.ID);        

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.formdetails(field2.ID);        
        Test.stopTest();
    }
    @isTest
    static void Test_getcaptcha(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.getcaptcha(form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.getcaptcha(form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.getcaptcha(form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.getcaptcha(field2.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_GetFormPage(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        FormBuilderController.GetFormPage(form.ID);
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        FormBuilderController.GetFormPage(form1.ID);
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test3'];
        FormBuilderController.GetFormPage(form2.ID);

        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID and Name = 'Test2,dferf' LIMIT 1];
        FormBuilderController.GetFormPage(field2.ID);
        
        
        Test.stopTest();
    }
    @isTest
    static void Test_getScaleRating(){ 

        Test.startTest();
        
        FormBuilderController.getScaleRating();
        
        Test.stopTest();
    }
    @isTest
    static void Test_CreateFieldRecord(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Fields__c field3 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Name = 'QFRADIOBUTTON,Extra,0' LIMIT 1];
        Form_Fields__c field4 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE NAme = 'QFSCALERATING,Extra,0' LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test' LIMIT 1];
        Form_Page__c pageno2 = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name ='Test2'];
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        
        
        FormBuilderController.CreateFieldRecord(form2.ID,field3.ID,pageno.ID,2,true,field.ID,'Account');
        FormBuilderController.CreateFieldRecord(form2.ID,field4.ID,pageno.ID,2,false,field.ID,'Account');
        
        FormBuilderController.CreateFieldRecord(form.ID,field.ID,pageno.ID,2,true,field.ID,'');
        FormBuilderController.CreateFieldRecord(form.ID,field2.ID,pageno.ID,2,false,field.ID,'');
        
        FormBuilderController.CreateFieldRecord(form2.ID,field3.ID,pageno.ID,0,true,field.ID,'');
        FormBuilderController.CreateFieldRecord(form2.ID,field4.ID,pageno.ID,0,false,field.ID,'');
        
        FormBuilderController.CreateFieldRecord(form.ID,field.ID,pageno.ID,0,true,field.ID,'');
        FormBuilderController.CreateFieldRecord(form.ID,field2.ID,pageno.ID,0,false,field.ID,'');

        Test.stopTest();
    }
    @isTest
    static void Test_addPageBreak(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.addPageBreak(form.ID,'test_name',pageno.ID,3,field.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_ObjName(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        
        FormBuilderController.ObjName(form.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_getFieldsRecords(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];

        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        
        FormBuilderController.getFieldsRecords(form2.ID);
        FormBuilderController.getFieldsRecords(form.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_reOrderField(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Name = 'Test,isrequired,feerf' LIMIT 1];
        Form_Fields__c field1 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Name = 'Test2,dferf' LIMIT 1];
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Name = 'Test3,dferf,feerf' LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.reOrderField(field.ID,field1.ID,pageno.ID);
        FormBuilderController.reOrderField(field2.ID,field1.ID,pageno.ID);
        FormBuilderController.reOrderField(field.ID,field1.ID,pageno.ID);
        field2.Id = null;
        FormBuilderController.reOrderField(field2.ID,field.ID,pageno.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_createPage(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        
        FormBuilderController.createPage(20,form.Id,'test_pagename',2);
        FormBuilderController.createPage(5,form.Id,'test_pagename',10);
        FormBuilderController.createPage(20,field.Id,'test_pagename',2);
        // FormBuilderController.createPage(5,form.Id,'test_pagename',10);
        
        Test.stopTest();
    }
    @isTest
    static void Test_updatePage(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.updatePage(form.ID,pageno.ID,'test',5);
        
        Test.stopTest();
    }
    @isTest
    static void Test_renameform(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.renameform(pageno.id,'test_renameform',form.ID);
        FormBuilderController.renameform(pageno.id,'test_renameform',field.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_renameMainform(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];

        FormBuilderController.renameMainform('Testmain',form.ID);
        FormBuilderController.renameMainform('Testmain',field.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_deletePage(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form__c form1 = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.deletePage(form.id,pageno.id);
        FormBuilderController.deletePage(form1.id,pageno.id);
        
        Test.stopTest();
    }
    @isTest
    static void Test_pageDetails(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.pageDetails(form.ID,pageno.ID);
        FormBuilderController.pageDetails(pageno.ID,form.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_editFormSubmit(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];

        FormBuilderController.editFormSubmit(form.id,'testdemo','Page Count','Normal Captcha');
        FormBuilderController.editFormSubmit(form.id,'testdemo','None','None');

        Test.stopTest();
    }
    @isTest
    static void Test_getreferencevalue(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Form__c =: form.Id LIMIT 1];
        FormBuilderController.getreferencevalue(field.id,'testdemo');
        FormBuilderController.getreferencevalue(form.id,'testdemo');
    
        Test.stopTest();
    }
    @isTest
    static void Test_getpicklistvalue(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Mapped_Obj__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Fields__c field1 = [SELECT ID,Name,Form__c,Form_Page__c,Mapped_Obj__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Fields__c field2 = [SELECT ID,Name,Form__c,Form_Page__c,Mapped_Obj__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        
        FormBuilderController.getpicklistvalue(field.id);
        FormBuilderController.getpicklistvalue(field2.id);
        FormBuilderController.getpicklistvalue(field1.id);
    
        Test.stopTest();
    }
    @isTest
    static void Test_signatureSave(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];

        FormBuilderController.signatureSave(field.id,'testdemo');
        FormBuilderController.signatureSave(form.id,'testdemo');
    
        Test.stopTest();
    }
    @isTest
    static void Test_SaveFile(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];

        FormBuilderController.SaveFile(field.id,'testdemo','None','None');
        FormBuilderController.SaveFile(form.id,'testdemo','None','None');
    
        Test.stopTest();
    }
    @isTest
    static void Test_getFieldsRecords_page(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form__c form2 = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test2'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
       
        FormBuilderController.getFieldsRecords_page(pageno.ID);
        FormBuilderController.getFieldsRecords_page(form.ID);
        FormBuilderController.getFieldsRecords_page(form2.ID);
        FormBuilderController.getFieldsRecords_page(field.ID);
        
        Test.stopTest();
    }
    @isTest
    static void Test_GetFormObject(){ 

        Test.startTest();

        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Page__c pageno = [SELECT Id,Name,Page_Number__c,Form__c FROM Form_Page__c WHERE Name = 'Test'];
        
        FormBuilderController.GetFormObject(form.id);
        FormBuilderController.GetFormObject(field.id);
        FormBuilderController.GetFormObject(pageno.id);

        Test.stopTest();
    }
    @isTest
    static void Test_createrecord(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Submission__c sub1 = [SELECT ID, Form__c FROM Form_Submission__c WHERE Form__c =: form.ID];
       
        Form_Submission__c sub = new Form_Submission__c();
        sub.Form__c = form.ID;

        Sobject acc = new Account( Name = 'Testing');
        String sig_upload_jsone = '{"a019D000003l53tQAA","fjsdkhafcufghdnggggcdfjgfghfkjhgbfgnadfgfg"}';
        String file_upload_jsone = '{}';

        List<String> sig_upload_fid_list = new List<String>{'1'};
        List<String> file_upload_fid_list = new List<String>{'0'};
        
        FormBuilderController.createrecord(sub,acc,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list);
        FormBuilderController.createrecord(sub1,acc,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list);

        Test.stopTest();
    }
    @isTest
    static void Test_createrecord_for_secod_object(){ 

        Test.startTest();
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Submission__c sub1 = [SELECT ID, Form__c FROM Form_Submission__c WHERE Form__c =: form.ID];
        Form_Submission__c sub = new Form_Submission__c();
        sub.Form__c = form.ID;
        Sobject acc = new Account( Name = 'Testing');
        Sobject con = new Contact( LastName = 'Testing',Email='testing@test.com' );
        
        String sig_upload_jsone = '{"a019D000003l53tQAA","fjsdkhafcufghdnggggcdfjgfghfkjhgbfgnadfgfg"}';
        String file_upload_jsone = '{}';

        List<String> sig_upload_fid_list = new List<String>{'1'};
        List<String> file_upload_fid_list = new List<String>{'0'};
        
        List<String> lookup_list = new List<String>{'AccountId'};

        FormBuilderController.createrecord_for_secod_object(sub,acc,con,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list,true,lookup_list);
        FormBuilderController.createrecord_for_secod_object(sub1,acc,con,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list,true,lookup_list);

        Test.stopTest();
    }
    @isTest
    static void Test_createrecord_for_third_object(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Submission__c sub1 = [SELECT ID, Form__c FROM Form_Submission__c WHERE Form__c =: form.ID];
        Form_Submission__c sub = new Form_Submission__c();
        sub.Form__c = form.ID;
        
        Sobject acc = new Account( Name = 'Testing');
        Sobject con = new Contact( LastName = 'Testing',Email='testing@test.com' );
        Sobject ca = new Case(ContactId = con.ID,Status = 'New',Origin = 'Email');
        
        String sig_upload_jsone = '{"a019D000003l53tQAA","fjsdkhafcufghdnggggcdfjgfghfkjhgbfgnadfgfg"}';
        String file_upload_jsone = '{}';

        List<String> sig_upload_fid_list = new List<String>{'1'};
        List<String> file_upload_fid_list = new List<String>{'0'};

        List<String> lookup_list = new List<String>{'AccountId'};
        List<String> lookup_list1 = new List<String>{'AccountId'};

        FormBuilderController.createrecord_for_third_object(sub,acc,con,ca,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list,true,lookup_list,true,lookup_list1);
        FormBuilderController.createrecord_for_third_object(sub1,acc,con,ca,sig_upload_jsone,sig_upload_fid_list,file_upload_jsone,file_upload_fid_list,true,lookup_list,true,lookup_list1);

        Test.stopTest();
    }
    @isTest
    static void Test_GetFormValidation(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Submission__c sub1 = [SELECT ID, Form__c FROM Form_Submission__c WHERE Form__c =: form.ID];
        
        FormBuilderController.GetFormValidation(sub1.id);
        FormBuilderController.GetFormValidation(field.id);

        Test.stopTest();
    }
    @isTest
    static void Test_update_ext_list(){ 

        Test.startTest();
        
        Form__c form = [SELECT ID,Name,Status__c,All_Field_Focus__c,All_Field_Hover__c,All_Field_Styling__c,Mapped_Objects__c,Form_Styling__c,FormBgID__c,Page_CSS__c,Button_CSS__c,Label_CSS__c FROM form__c WHERE Name = 'Test'];
        Form_Fields__c field = [SELECT ID,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE form__c =: form.ID LIMIT 1];
        Form_Submission__c sub1 = [SELECT ID, Form__c FROM Form_Submission__c WHERE Form__c =: form.ID];
        
        FormBuilderController.update_ext_list('{"sobjectType":"Form_c"}',sub1.id);
        FormBuilderController.update_ext_list('{"sobjectType":"Form_c"}',field.id);

        Test.stopTest();
    }

    @isTest
    static void Test_findlookupfildes(){
        FormBuilderController.findlookupfildes('Account','Case');
        // FormBuilderController.findlookupfildes();
    }
}