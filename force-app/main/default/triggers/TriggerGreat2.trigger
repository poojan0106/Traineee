trigger TriggerGreat2 on Contact ( before update) {
    TriggerGreatHandler2.GreatSolution(Trigger.newMap, Trigger.oldMap);
}