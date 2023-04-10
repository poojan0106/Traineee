public with sharing class lwcTask5 {
@AuraEnabled(cacheable=true)
public static List<Map<String, Object>> searchRecords(String searchTerm, List<String> objectTypes) {
    String objectList = '';
    for(String objectType : objectTypes) {
        objectList += objectType + ' (Id, Name),';
    }
    objectList = objectList.removeEnd(',');
    String searchQuery = 'FIND \'' + searchTerm + '\' IN ALL FIELDS RETURNING ' + objectList;
    System.debug(searchQuery);
    List<List<SObject>> searchResults = search.query(searchQuery);
    List<Map<String, Object>> flattenedResults = new List<Map<String, Object>>();
    for (List<SObject> sublist : searchResults) {
        for(SObject record : sublist){
            Map<String, Object> result = new Map<String, Object>();
            result.put('ObjectName', record.getSObjectType().getDescribe().getName());
            result.put('Id', record.Id);
            result.put('Name', record.get('Name'));
            flattenedResults.add(result);
        }
    }
    return flattenedResults;
}

}