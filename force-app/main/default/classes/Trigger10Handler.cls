public class Trigger10Handler{
    public static void SubmitRecforApproval(List<Account> accList){
        for (Account acc: accList){
            Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
            req1.setComments('Your Record submitted for approval process Sucessfully , Wait for Approve');
            req1.setObjectId(acc.Id);
            Approval.ProcessResult result = Approval.process(req1);
        }
    }
}