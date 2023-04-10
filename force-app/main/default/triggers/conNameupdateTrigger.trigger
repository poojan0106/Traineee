trigger conNameupdateTrigger on Contact (after update) {
  conNameupdateHandler.updateName(Trigger.new, Trigger.oldMap);
}