public class Fileuploadcttrl {
    // @AuraEnabled(cacheable=true)
    // public static List<ContentDocumentLink> fetchFiles(String recordId){
    //     System.debug(recordId);
    //     return [SELECT LinkedEntityId,ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType 
    //                 FROM ContentDocumentLink  
    //             WHERE LinkedEntityId  =:recordId];
    // }

    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> fetchFile(String recordId){
        System.debug(recordId);
        return [SELECT LinkedEntityId,ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType 
                    FROM ContentDocumentLink  
                WHERE LinkedEntityId  =:recordId];
    }
    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> fetchFiles(String recordId){
        System.debug(recordId);
        return [SELECT ContentDocument.Id, ContentDocument.Title, ContentDocument.ContentSize,ContentDocument.CreatedDate, ContentDocument.FileType 
                     FROM ContentDocumentLink  
                 WHERE LinkedEntityId  =:recordId];
    }
   
    @AuraEnabled
public static void deleteFiles(String recId){
    System.debug(recId);
    List<ContentDocument> contentDocuments = [SELECT Id, Title FROM ContentDocument WHERE Id = :recId];
    System.debug(contentDocuments);
    if (!contentDocuments.isEmpty()) {
        // Delete the ContentDocument record to delete the file
        delete contentDocuments[0];
        System.debug('File deleted successfully');
    } else {
        System.debug('ContentDocument record not found');
    }
}
    
}