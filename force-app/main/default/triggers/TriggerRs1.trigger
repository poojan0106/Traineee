trigger TriggerRs1 on Contact (after delete, after insert, after undelete, after update) {
    if (Trigger.isDelete) {
        TriggerRs1Handler.RollupSummary(Trigger.old);
    } else {
        TriggerRs1Handler.RollupSummary(Trigger.new);
    }
}