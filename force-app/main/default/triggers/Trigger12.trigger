trigger Trigger12 on Account (after insert){
    
        Trigger12Handler.createContacts(Trigger.New);
            
    }