public class QueueableApex implements Queueable {
    public void execute(QueueableContext context){
        List<Contact> conList = new List<Contact>();
        for(Contact con :[select  id,Name from Contact where Name='112aab']){
            con.Email='queuetest@gmail.com';
            conList.add(con);
        }
        if(!conList.isEmpty()){
       update conList;
    }
  }
}
// ID jobid = system.enqueueJob(new QueueableClass());