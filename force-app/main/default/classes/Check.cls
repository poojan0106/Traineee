public class Check {
    public static void number(Integer i){
       try{
           if(i<=0){
               throw new AllException();
           }else{
               i=i*2;
               system.debug(i);
           }
       }catch(AllException ex){
           AllException.saveRec(ex,'aab','please enter number atleast greater then or equal to 1');
          system.debug('invalid number'+ex);
                   
       }
    }
}