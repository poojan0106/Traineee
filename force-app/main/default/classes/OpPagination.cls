public class OpPagination {
    private integer totalRecords =0;
private integer index =0;
private integer blockSize =5;
    public OpPagination(){
        totalRecords = [select count() from Opportunity ];
    }
    public List<Opportunity> getMembers(){
        List<Opportunity> Members = Database.Query('Select Name,AccountId,StageName,Type,Email_id__c from Opportunity  ORDER BY AccountId LIMIT:blockSize OFFSET:index');
    	return Members;
        
    }
    
    public void begning(){
        index=0;
       }
    public void previous(){
        index=index-blockSize;
    }
    public void next(){
        index=index+blockSize;
    }
    public void end(){
        index=totalRecords-math.mod(totalRecords,blockSize);
    }
    
    public boolean getprev(){
        if(index==0)
            return true;
        else
            return false;
    }
    public boolean getnext(){
        if((index+blockSize) > totalRecords)
            return true;
        else
            return false;
    }
}