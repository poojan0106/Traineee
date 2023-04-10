trigger trigger7 on Opportunity (after update) {
    if(Trigger.isafter && Trigger.isUpdate){
    Trigger7Handler.createTaskOnNameUpdate(Trigger.new, Trigger.oldMap);
}
}