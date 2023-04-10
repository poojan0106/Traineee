public class Trigger14Handler {
    public static void deleteSameAccounts(List<Account> accList) {
      List<String> acc = new List<String>();
    for (Account a : accList) {
        acc.add(a.Name);
    } 
    List<Account> accDelet = [SELECT Name FROM Account WHERE Name IN :acc ];
    if (!accDelet.isEmpty()) {
        delete accDelet;
    }
    }

    }