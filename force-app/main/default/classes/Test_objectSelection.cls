@isTest
public class Test_objectSelection {
    public static List<String> test_data;
    
    @isTest
    static void Test_fetchParentObject(){
        objectSelection o = new objectSelection();
        test_data = objectSelection.fetchParentObject();
    }

    @isTest
    static void Test_temp2(){
        
        List<String> data = new List<String> {'Account','Case'};
        objectSelection.temp2(test_data);
        objectSelection.temp2(data);
    }

    @IsTest
    static void Test_temp3(){
        List<String> data = new List<String> {'Account','Case'};
        objectSelection.temp3(test_data);
        objectSelection.temp3(data);
    }
    @IsTest
    static void Test_fetchChildObject(){
        objectSelection.fetchChildObject('Account');
    }
    @IsTest
    static void Test_saveMappedobject(){
        objectSelection.saveMapped_object('Account', 'FormTitle', 'FormDesc', 'None', 'None');
        objectSelection.saveMapped_object('Account,Contact', 'FormTitle', 'FormDesc', 'None', 'None');
    }
}