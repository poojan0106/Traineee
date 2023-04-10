trigger trigger1 on Contact (before insert , after insert , before update , after update , before delete , after delete) {
    System.debug('-------------------------------------------------Trigger Is Called--------------------------------------------------');
}