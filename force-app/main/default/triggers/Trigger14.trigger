trigger Trigger14 on Account (before insert){
    
        Trigger14Handler.deleteSameAccounts(Trigger.New);
            
    }