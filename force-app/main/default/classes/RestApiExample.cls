@RestResource(urlMapping='/Contact/*')
global with sharing class RestApiExample {
    @HttpGet
    global static Contact getCon() {
        RestRequest request = RestContext.request;
        String conId = request.requestURI.substring(
          request.requestURI.lastIndexOf('/')+1);
        Contact result =  [SELECT Name,Id,Email FROM Contact WHERE Id = :conId];
        return result;
    }
    @HttpPost
    global static ID createCon(String LastName, String Email) {
        Contact thisCon = new Contact(LastName=LastName,
                Email=Email);
        insert thisCon;
        return thisCon.Id;
    }   
    @HttpDelete
    global static void deleteCon() {
        RestRequest request = RestContext.request;
        String conId = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        Contact thisCon = [SELECT Id FROM Contact WHERE Id = :conId];
        delete thisCon;
    }     
    @HttpPut
    global static ID upsertCon(String LastName, String Email, String Id) {
        Contact thisCon = new Contact(
                Id=Id,
                LastName=LastName,
                Email=Email);
        upsert thisCon;
        return thisCon.Id;
    }
    @HttpPatch
    global static ID updateCon() {
        RestRequest request = RestContext.request;
        String conId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Contact thisCon = [SELECT Id FROM Contact WHERE Id = :conId];
        Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring());
        for(String fieldName : params.keySet()) {
            thisCon.put(fieldName, params.get(fieldName));
        }
        update thisCon;
        return thisCon.Id;
    }    
}