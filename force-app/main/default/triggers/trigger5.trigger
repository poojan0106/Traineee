trigger trigger5 on Account (before insert){

    If(Trigger.isbefore && Trigger.isinsert){

        for(Account accRec: Trigger.new){
            accRec.Ownership='Public';
           
        }
    }
}