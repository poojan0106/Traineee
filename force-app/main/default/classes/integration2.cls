public class integration2 {
    @AuraEnabled
    public static String  UploadFile(String fileName, String fileType, String docid ,String recordId) {
         String fileId = '';
         String filen = '';
         String foldersId = '';
         Map<String, String> fileDetails = new Map<String, String>();
        System.debug(fileType);
        String query = 'mimeType="application/vnd.google-apps.folder" and trashed = false and name="'+ recordId +'"';
        HttpRequest request = new HttpRequest();
        request.setEndpoint('callout:Google_Drive/drive/v3/files?q=' + EncodingUtil.urlEncode(query, 'UTF-8'));
            request.setMethod('GET');
            request.setHeader('Authorization', 'Bearer '); // Replace accessToken with your actual access token
            System.debug(request);
            // Send the request and get the response
            HttpResponse response = new Http().send(request);
            if (response.getStatusCode() == 200) {
            Map<String, Object> responMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(responMap);
            // String foldeId = (String) responMap.get('id');
            List<Object> files = (List<Object>) responMap.get('files');
    if (!files.isEmpty()) {
        Map<String, Object> file = (Map<String, Object>) files[0];
        String foldeId = (String) file.get('id');
        System.debug('Folder ID: ' + foldeId);
    

            System.debug('folder searched successfully to Google Drive: ' + recordId + ', File ID: ' + foldeId);
            List<ContentVersion> cvFile = [SELECT VersionData, FileType, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId = :docid];
        Blob myBlob = cvFile[0].VersionData;
        String boundary = '---------------------------' + String.valueOf(System.currentTimeMillis());
        String delimiter = '\r\n--' + boundary + '\r\n';
        String close_delim = '\r\n--' + boundary + '--';
        String bodyEncoded = EncodingUtil.base64Encode(myBlob);
        String encodedFileName = EncodingUtil.urlEncode(fileName, 'UTF-8');
        
        String body = delimiter + 'Content-Type: application/json\r\n\r\n' + '{"name" : "' + encodedFileName + '", ' + ' "parents": ["'+ foldeId +'"], ' + ' "mimeType" : "image/' + fileType + '"}' + delimiter + 'Content-Type: image/' + fileType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + bodyEncoded + close_delim;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Google_Drive/upload/drive/v3/files?uploadType=multipart');
        req.setHeader('Authorization', 'Bearer '); // Add your actual access token here
        req.setHeader('Content-Type', 'multipart/mixed; boundary="' + boundary + '"');
        req.setHeader('Content-length', String.valueOf(body.length()));
        req.setBody(body);
        req.setMethod('POST');
        req.setTimeout(60 * 1000);
        HttpResponse resp = http.send(req);
    
        if (resp.getStatusCode() == 200 || resp.getStatusCode() == 201) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
            fileId = (String) responseMap.get('id');
            System.debug('File uploaded successfully to Google Drive: ' + fileName + ', File ID: ' + fileId);

            Map<String, Object> responseMp = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
            filen = (String) responseMp.get('name');
            System.debug('File uploaded successfully to Google Drive: ' + filen + ', File ID: ' + fileId);

            fileDetails.put('fileId', fileId);
            fileDetails.put('fileName', filen);
        } else {
            System.debug('Failed to upload file to Google Drive: ' + resp.getStatusCode() + ' ' + resp.getStatus());
        }
        foldersId = foldeId;
        System.debug(foldersId);
    }    
        else {
                    // Define the folder metadata
                    System.debug('else started');
                    // Make the HTTP POST request
                    String salesforce = '1hEmeSc1xycNWxsesWNcMsbAPsrDRewnS';
                    HttpRequest reques = new HttpRequest();
                    reques.setEndpoint('callout:Google_Drive/drive/v3/files' );
                    reques.setMethod('POST');
                    reques.setHeader('Authorization', 'Bearer '); // Replace accessToken with your actual access token
                    reques.setHeader('Content-Type', 'application/json');
                    reques.setBody('{"name": "' + recordId + '", "mimeType": "application/vnd.google-apps.folder", "parents": ["' + salesforce + '"]}');

                    // Send the request and get the response
                    HttpResponse respons = new Http().send(reques);

                    // Parse the response
                    if (respons.getStatusCode() == 200 || respons.getStatusCode() == 201) {
                        Map<String, Object> resMap = (Map<String, Object>) JSON.deserializeUntyped(respons.getBody());
                        String folderId = (String) resMap.get('id');
                        System.debug('folder created successfully to Google Drive: ' + recordId + ', File ID: ' + folderId);
                        List<ContentVersion> cvFile = [SELECT VersionData, FileType, ContentDocumentId FROM ContentVersion WHERE ContentDocumentId = :docid];
        Blob myBlob = cvFile[0].VersionData;
        String boundary = '---------------------------' + String.valueOf(System.currentTimeMillis());
        String delimiter = '\r\n--' + boundary + '\r\n';
        String close_delim = '\r\n--' + boundary + '--';
        String bodyEncoded = EncodingUtil.base64Encode(myBlob);
        String encodedFileName = EncodingUtil.urlEncode(fileName, 'UTF-8');
        String body = delimiter + 'Content-Type: application/json\r\n\r\n' + '{"name" : "' + encodedFileName + '", ' + ' "parents": ["'+ folderId +'"], ' + ' "mimeType" : "image/' + fileType + '"}' + delimiter + 'Content-Type: image/' + fileType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + bodyEncoded + close_delim;
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Google_Drive/upload/drive/v3/files?uploadType=multipart');
        req.setHeader('Authorization', 'Bearer '); // Add your actual access token here
        req.setHeader('Content-Type', 'multipart/mixed; boundary="' + boundary + '"');
        req.setHeader('Content-length', String.valueOf(body.length()));
        req.setBody(body);
        req.setMethod('POST');
        req.setTimeout(60 * 1000);
        HttpResponse resp = http.send(req);
        if (resp.getStatusCode() == 200 || resp.getStatusCode() == 201) {
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
            fileId = (String) responseMap.get('id');
            System.debug('File uploaded successfully to Google Drive: ' + fileName + ', File ID: ' + fileId);

            Map<String, Object> responseMp = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
            filen = (String) responseMp.get('name');
            System.debug('File uploaded successfully to Google Drive: ' + filen + ', File ID: ' + fileId);

            fileDetails.put('fileId', fileId);
            fileDetails.put('fileName', filen);
        } else {
            System.debug('Failed to upload file to Google Drive: ' + resp.getStatusCode() + ' ' + resp.getStatus());
        }
        foldersId = folderId;
        System.debug(foldersId);
                    } else {
                        // Error handling for unsuccessful response
                        System.debug('Error: ' + response.getStatusCode() + ' ' + response.getStatus());
                        System.debug('Error response: ' + response.getBody());
                    }

            }
    }else{
        System.debug('somthing is wrong with the code');
    } 
    return foldersId;
    }
    
    @AuraEnabled
public static List<Map<String, String>> getFileIdFromDrive(String folderId) {
    List<Map<String, String>> fileList = new List<Map<String, String>>();
    // String folderId='1hEmeSc1xycNWxsesWNcMsbAPsrDRewnS';
    // Construct the request to retrieve files from the folder
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:Google_Drive/drive/v3/files?q=\'' + folderId + '\'+in+parents+and+trashed=false&fields=files(name,id)');
    req.setHeader('Authorization', 'Bearer '); // Add your actual access token here
    req.setMethod('GET');
    req.setTimeout(60 * 1000);

    HttpResponse resp = http.send(req);
    if (resp.getStatusCode() == 200) {
        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
        List<Object> filesList = (List<Object>) responseMap.get('files');

        for (Object obj : filesList) {
            Map<String, Object> fileMap = (Map<String, Object>) obj;
            String fileId = (String) fileMap.get('id');
            String fileName = (String) fileMap.get('name');

            Map<String, String> fileDetails = new Map<String, String>();
            fileDetails.put('fileId', fileId);
            fileDetails.put('fileName', fileName);
            fileList.add(fileDetails);
        }
    } else {
        System.debug('Failed to retrieve files from Google Drive: ' + resp.getStatusCode() + ' ' + resp.getStatus());
    }
    System.debug(fileList);
    return fileList;
}

@AuraEnabled
    public static void DeleteFile(String fileId) {
        System.debug(fileId);
        // Get the file from Google Drive by file ID
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Google_Drive/drive/v3/files/' + fileId ); // Replace with the actual endpoint for deleting files in Google Drive 
        req.setHeader('Authorization', 'Bearer '); // Add your actual access token here
        req.setMethod('DELETE');
        HttpResponse resp = http.send(req);
        
        // Check response status code for success or failure
        if (resp.getStatusCode() == 204) {
            // File deleted successfully in Google Drive
            System.debug('File deleted successfully in Google Drive: ' + fileId);
        } else {
            // File deletion failed in Google Drive
            System.debug('File deletion failed in Google Drive: ' + fileId + ', Status Code: ' + resp.getStatusCode());
        }
    }

}







