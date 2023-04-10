trigger trigger9 on Contact (after delete){

    if(Trigger.isafter && Trigger.isdelete){

        Trigger9Handler.deletReletedAcco(Trigger.old);
        
    }
    }