public class TriggerSheepHandler{

public static void handleAfterUpdate(List<Contact> conList ,Map<Id, Contact> oldMap){

Set<Id> newAccId = new Set<Id>();

Set<Id> oldAccId = new Set<Id>();

Map<Id,Id> accMap = new Map<Id,Id>();

for(Contact con: conList){

    if(con.AccountId != oldMap.get(con.Id).AccountId && con.AccountId != NULL){

        newAccId.add(con.AccountId);

        oldAccId.add(oldMap.get(con.Id).AccountId);

        accMap.put(oldMap.get(con.Id).AccountId,con.AccountId);

    }

}
if(!oldAccId.isEmpty()){

	List<Contact> Rec = new List<Contact>([SELECT Id, AccountId FROM Contact WHERE AccountId IN :oldAccId]);  

    for(Integer i = 0;i < Rec.size() ; i++){

        if(Rec[i].AccountId != null){

            Rec[i].AccountId = accMap.get(Rec[i].AccountId);

         }

    }

    update Rec;

}

}

}