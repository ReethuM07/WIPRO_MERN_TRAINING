KO

//concrete class
public class EncapsulationExample {

    private int id;
    private String name;
    private long phoneno;
   //public double balance; // is calulated via deposit() and withdraw()
    private double balance;

    
    public int getId() {
        return id;
    }
 
    public String getName() {
        return name;
    }
    public void setName(String Aadharname) {
        
        this.name = Aadharname;
    }
    public long getPhoneno() {
        return phoneno;
    }
    public void setPhoneno(long phoneno) {

        if(phoneno >= 10)
        this.phoneno = phoneno;
    }

    public  void deposit(double amount)
    {
        if(amount>0)
        {
            balance += amount;
        }
    }
    public double getBalance() {
        return balance;
    }

    public static void main(String[] ar)
    {

        EncapsulationExample obj = new EncapsulationExample();
        obj.setName("Niti Dwivedi");

        obj.deposit(5000);
        System.out.println("Hi!" + obj.getName() +"After depositing the updated Balance is:" + obj.getBalance());
    }
    
}
