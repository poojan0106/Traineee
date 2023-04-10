// public class sendEmails {
//     @AuraEnabled
//     public static void sendEmail(String Body, String conId, String Subject ,String contentId){
//         // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint    , Blob content , String fileName
//         Contact contactRecord = [SELECT Id, Email FROM Contact WHERE Id = :conId];
//         // ContentVersion[] cv_list = [select VersionData, PathOnClient from ContentVersion where ContentDocumentId = :contentId];
//         // ContentVersion cv = new ContentVersion();
//         //  Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
//         // if(cv_list.size() != 0) {
//         //     cv = cv_list[0];
//         //     // Create the email attachment
//         //     efa.setFileName(cv.pathOnClient); 
//         //     efa.setBody(cv.versionData);
//         //     System.debug(efa);
//         //     // email.setFileAttachments(new Messaging.EmailFileAttachment[] {efa});
//         // }
//             String email = contactRecord.Email;
//             System.debug(Body);
//             System.debug(Subject);
//             System.debug(email);
//                 HttpRequest req = new HttpRequest();
//                     String mbody = '{ "raw" : "' + EncodingUtil.base64Encode(Blob.valueof( 'To: ' + email + '\r\nContent-Type:text/plain; charset=utf-8;\r\nSubject: ' + Subject + '\r\n\r\n' + Body )) + '"}';
//                     req.setHeader('Content-Length', mbody.length()+'');
//                     req.setHeader('Content-Type', 'application/json');
//                     req.setEndpoint('callout:Gmail_API/gmail/v1/users/poojangabani12@gmail.com/messages/send');
//                     req.setMethod('POST');
//                     system.debug(mbody);
//                     req.setBody(mbody);
//                         // Send the request, and return a response
//                         Http h = new Http();
//                         HttpResponse res = h.send(req);
//                         system.debug(res);
                    
//    }
// }  
public class sendEmails{
    @AuraEnabled
public static void sendEmail(String Body, String conId, String Subject ,String contentId) {
    Contact contactRecord = [SELECT Id, Email FROM Contact WHERE Id = :conId];
    List<ContentVersion> conVer = [SELECT Id, PathOnClient, FileType, Title, ContentSize, VersionData FROM ContentVersion WHERE ContentDocumentId = :contentId];
    String mimeBody = '';
    String email = contactRecord.Email;
    String nl = '\n';
    String boundary = '__ctrlq_dot_org__';
    
    mimeBody += 'MIME-Version: 1.0' + nl;
    mimeBody += 'To:'+ email + nl;
    mimeBody += 'cc: foruse199p@gmail.com' + nl;
    mimeBody += 'bcc: foruse199p@gmail.com' + nl;
    mimeBody += 'Subject: ' + Subject + nl;
    mimeBody += 'Hello Testing' + nl;
    mimeBody += 'Content-Type: multipart/mixed; boundary=' + boundary + nl;
    mimeBody += '--' + boundary + nl;
    mimeBody += 'Content-Type: text/plain; charset=UTF-8' + nl;
    mimeBody += 'Content-Transfer-Encoding: base64' + nl;
    mimeBody += EncodingUtil.base64Encode(Blob.valueOf(Body)) + nl + nl;
    mimeBody += '--' + boundary + nl;
    mimeBody += 'Content-Type: text/html; charset=UTF-8' + nl;
    mimeBody += 'Content-Transfer-Encoding: base64' + nl + nl;
    mimeBody += EncodingUtil.base64Encode(Blob.valueOf(Body)) + nl + nl;
    mimeBody += '--' + boundary + nl;
    
    for (ContentVersion cv : conVer) {
        mimeBody += 'Content-Type:image/png' + ';name=' + cv.Title + nl;
        mimeBody += 'Content-Disposition: attachment; filename="' + cv.PathOnClient + '"' + nl;
        mimeBody += 'Content-Transfer-Encoding: base64' + nl + nl;
        mimeBody += EncodingUtil.base64Encode(cv.VersionData) + nl + nl;
    }
    
    mimeBody += '--' + boundary + '--';
    
    Http http = new Http();
    HttpRequest req = new HttpRequest();  
    req.setEndpoint('callout:Gmail_API/upload/gmail/v1/users/poojangabani12@gmail.com/messages/send?uploadType=media'); //(Gmail_API)API Name of Name credential
    req.setHeader('Authorization', 'Bearer ');
    req.setHeader('Content-Type', 'message/rfc822');
    req.setBody('{"raw":"' + mimeBody + '"}');
    req.setMethod('POST');
    req.setTimeout(60 * 1000);
    System.debug('req---->>' + req);
    HttpResponse response = http.send(req);
    System.debug('response---->>' + response.getBody());
    System.debug(response);
    if (response.getStatusCode() != 201) {
        System.debug('The status code returned was not expected: ' + response.getStatusCode() + ' ' + response.getStatus());
    } else {
        System.debug(response.getBody());
    }  
}
}