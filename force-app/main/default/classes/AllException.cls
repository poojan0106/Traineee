public class AllException extends Exception{
    public static void saveRec(Exception ex, String methodName, String details){
        Error_Log__c errorLog = new Error_Log__c();
        errorLog.Class_Name__c =ex.getTypeName();
        errorLog.Method_Name__c =methodName;
        errorLog.Line_Number__c =ex.getLineNumber();
        errorLog.Exception_Message__c = ex.getMessage();
        errorLog.More_Details__c =ex.getStackTraceString();
        errorLog.Exception_Type__c =ex.getTypeName();
        insert errorLog ;
      }
}