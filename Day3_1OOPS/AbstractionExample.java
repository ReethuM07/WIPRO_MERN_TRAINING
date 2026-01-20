public abstract class AbstractionExample {

    // contains abstract or non-abstract methods

    public abstract void phoneCall();  // implementation is hidden
   
    public void aboutPhone(){

        long memory;
    };  // non abstract which is not hidden and already revealed the implementation

    public static void main(String[] args) {
        
        Incentive incentive;

        incentive = new Manager(); // we cannot  create an object of abstract class
        incentive.diwaliBonus();

        incentive = new SE();
        incentive.diwaliBonus();
    }
    
}


interface  Incentive
{
     
     abstract void diwaliBonus(); // but this bonus will be different as per their role

}


class Manager implements Incentive{
 
 public void diwaliBonus()
    {
        //logic
    }
}

class SE implements Incentive
{

   public void diwaliBonus()
    {
        // logic
    }

}

//Write a program for bankaccount to know the balance after depositing and withdrawing the amount 
// and also having the loan account facilitiy to calculate the emi and monthly emi's will be
//paid by customer using either by card or cash 

interface BaseClass
{




}
interface  SubClass extends BaseClass{

public void amount();
}
class ChildClass  implements SubClass
{
public void amount()
{

}


public static void main(String[] args) {
    SubClass sc = new SubClass();
    sc.amount();
}
}


