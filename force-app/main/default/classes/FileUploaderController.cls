public with sharing class FileUploaderController {
    
    @AuraEnabled
    public static Id uploadFile(Id recordId, String fileName, String base64Data) {
        
        // Decode base64-encoded image data
        Blob fileData = EncodingUtil.base64Decode(base64Data);
        
        // Create ContentVersion record
        ContentVersion cv = new ContentVersion();
        cv.VersionData = fileData;
        cv.Title = fileName;
        cv.PathOnClient = fileName;
        
        // Insert ContentVersion record
        insert cv;
        
        // Create ContentDocumentLink record to associate ContentVersion with custom object record
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = cv.ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        cdl.ShareType = 'V';
        
        // Insert ContentDocumentLink record
        insert cdl;
        
        // Return ContentVersion record Id
        return cv.Id;
    }
}