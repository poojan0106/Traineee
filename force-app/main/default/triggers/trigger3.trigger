trigger trigger3 on Opportunity (before update){

    If(Trigger.isbefore && Trigger.isupdate){

        for(Opportunity oppRec: Trigger.new){
            oppRec.StageName='prospecting';
            oppRec.CloseDate =Date.Today().addDays(15);
        }
    }
}