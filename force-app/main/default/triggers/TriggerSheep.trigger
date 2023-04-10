trigger TriggerSheep on Contact (after update) {
    TriggerSheepHandler.handleAfterUpdate(Trigger.new, Trigger.oldMap);
}