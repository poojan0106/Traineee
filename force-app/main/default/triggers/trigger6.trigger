trigger trigger6 on Account(before update){
    if(Trigger.isbefore && Trigger.isUpdate){
        Trigger6Handler.ModifyNameSendEmail(Trigger.New , Trigger.oldMap);
    }
}