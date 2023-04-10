trigger TriggerGreat on Contact (before insert) {
   
    TriggerGreatHandler.GreatSolution(Trigger.New);
    
 
}