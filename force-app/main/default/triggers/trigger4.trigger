trigger trigger4 on Opportunity (before insert){

    If(Trigger.isbefore && Trigger.isinsert){

        for(Opportunity oppRec: Trigger.new){
            oppRec.Type='New customer';
           
        }
    }
}