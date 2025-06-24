public without sharing class fieldvalidation {
    public fieldvalidation() {

    }
    @AuraEnabled
    public static fieldvalidationwrapper getfieldvalidation(Id fieldId){
        try {
            Form_Fields__c fieldvalidation = [SELECT Id,Name,Field_Validations__c,Field_Mapping__c FROM Form_Fields__c WHERE Id =: fieldId ];
            String obj = fieldvalidation.Field_Mapping__c.split('<!@!>')[1];
            String field = fieldvalidation.Field_Mapping__c.split('<!@!>')[0];
            fieldvalidationwrapper wrapp = new fieldvalidationwrapper();
            if(!fieldvalidation.Name.split(',')[0].Contains('QF')){
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
                Schema.SObjectType leadSchema = schemaMap.get(obj) ;
                Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
                if(fieldvalidation.Name.split(',')[1] == 'CURRENCY' || fieldvalidation.Name.split(',')[1] == 'DOUBLE' || fieldvalidation.Name.split(',')[1] == 'PERCENT'){
                    wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                    wrapp.fieldlength = fieldMap.get(field).getDescribe().getPrecision();
                } else if (fieldvalidation.Name.split(',')[1] == 'ENCRYPTEDSTRING' || fieldvalidation.Name.split(',')[1] == 'STRING' ){
                    wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                    wrapp.fieldlength = fieldMap.get(field).getDescribe().getLength();
                } else if(fieldvalidation.Name.split(',')[1] == 'TEXTAREA'){
                    wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                    wrapp.fieldlength = fieldMap.get(field).getDescribe().getLength();
                    wrapp.filterable = fieldMap.get(field).getDescribe().isFilterable();
                } else {
                    wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                    wrapp.fieldlength = 255;
                }
        } else {
            if(fieldvalidation.Name.split(',')[0] == 'QFNAME'){
                wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                wrapp.fieldlength = 50;
            } else if(fieldvalidation.Name.split(',')[0] == 'QFSHORTTEXT'){
                wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                wrapp.fieldlength = 255;
            } else if( fieldvalidation.Name.split(',')[0] == 'QFLONGTEXT'){
                wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                wrapp.fieldlength = 131072;
            } else if( fieldvalidation.Name.split(',')[0] == 'QFNUMBER' || fieldvalidation.Name.split(',')[0] == 'QFPRICE'){
                wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                wrapp.fieldlength = 18;
            } else {
                wrapp.fieldvalidations = fieldvalidation.Field_Validations__c;
                wrapp.fieldlength = 255;
            }
        }
            return wrapp;

        } catch (Exception e) {
         // error_handler.insert_errordata(e,'fieldvalidation','getfieldvalidation');
            // throw new AuraHandledException(e.getMessage());
            fieldvalidationwrapper wrapp = new fieldvalidationwrapper();
            wrapp.error = String.valueOf(e);
            return wrapp;
        }
    }

    @AuraEnabled
    public static void deletefield(Id fieldId){
        try {

            delete [SELECT Id FROM Form_Fields__c WHERE Id =: fieldId];
            
        } catch (Exception e) {
         error_handler.insert_errordata(e,'fieldvalidation','deletefield');
            // throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void savevalidation(Id fieldId, String fieldValidation,String Label){
        try {
            System.debug(fieldValidation);
            fieldValidation = fieldValidation;
            Form_Fields__c field = [SELECT Id,Field_Validations__c	FROM Form_Fields__c WHERE Id =: fieldId];
            field.Field_Validations__c = fieldValidation;
            field.Field_Label__c = Label;
            update field;
        } catch (Exception e) {
            error_handler.insert_errordata(e,'fieldvalidation','savevalidation');
            // throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void copyfield(Id fieldId){
        try {
            Form_Fields__c field = [SELECT Id,Field_Validations__c,Field_Mapping__c,Field_Order__c,Form__c,Form_Page__c,Name,Mapped_Obj__c FROM Form_Fields__c WHERE Id =: fieldId];
            Form_Fields__c clonefield = field.clone(false,false,false,false);
            insert clonefield;
             // insert(new Form_Fields__c(Field_Validations__c = field.Field_Validations__c ,Field_Mapping__c = field.Field_Mapping__c ,Field_Order__c =field.Field_Order__c,
            // Form__c = field.Form__c ,Form_Page__c = field.Form_Page__c,Name = field.Name,Mapped_Obj__c =field.Mapped_Obj__c));
        } catch (Exception e) {
            error_handler.insert_errordata(e,'fieldvalidation','copyfield');
            // throw new AuraHandledException(e.getMessage());
        }
    }
    public class fieldvalidationwrapper{
        @AuraEnabled
        public string fieldvalidations{get; set;}

        @AuraEnabled
        public Integer fieldlength{get; set;}

        @AuraEnabled
        public String error{get; set;}

        @AuraEnabled
        public Boolean filterable{get; set;}
        
    }
}