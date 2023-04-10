trigger trigger2 on Lead (before update){

    If(Trigger.isbefore && Trigger.isupdate){

        for(Lead leadRec: Trigger.new){
            leadRec.Rating ='hot';
        }
    }
}