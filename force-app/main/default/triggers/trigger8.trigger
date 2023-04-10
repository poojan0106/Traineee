trigger trigger8 on Account (before insert){

    if(Trigger.isbefore && Trigger.isinsert){

        Trigger8Handler.addPrefix(Trigger.new);
        }
    }