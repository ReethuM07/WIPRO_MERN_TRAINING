abstract class Account {
    protected double bal;
    Account(double b) { bal = b; }
    abstract void show();
}

class Savings extends Account {
    Savings(double b) { super(b); }
    
    void update(double amt, boolean dep) {
        String type = dep ? "Deposit" : "Withdraw";
        System.out.println("Input -> Amount: " + amt + " | Type: " + type);
        bal += dep ? amt : -amt;
        System.out.println("Result -> Current Balance: " + bal + "\n");
    }

    void show() { System.out.println("Final Savings Balance: " + bal); }
}

class Loan extends Account {
    Loan(double p) { super(p); }

    void payEMI(int months, String mode) {
        System.out.println("Input -> Loan Principal: " + bal + " | Duration: " + months + " months | Method: " + mode);
        double emi = (bal + (bal * 0.1)) / months; // 10% interest
        System.out.println("Result -> Calculated EMI: " + String.format("%.2f", emi) + " via " + mode + "\n");
    }

    void show() { System.out.println("Loan Principal Amount: " + bal); }
}

public class BankApplication {
    public static void main(String[] args) {
        System.out.println("--- Starting Transactions ---");
        Savings s = new Savings(1000);
        s.update(500, true);  // Deposit
        s.update(200, false); // Withdraw
        
        System.out.println("--- Starting Loan Calculation ---");
        Loan l = new Loan(50000);
        l.payEMI(12, "Card"); 
    }
}