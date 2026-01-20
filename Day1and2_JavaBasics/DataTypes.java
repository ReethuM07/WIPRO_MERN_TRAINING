public class DataTypes {

    /*J2SE  -- java standard edition --- Core java -- window based application
Java is a case sensitive language
Program and File name should be the same where your main function is defined and has to public */

    // these variables are non-static which we are defining in a class directly
    // that means directly we cannot call non static variables in a static main
    // method
    // int type of variable
    short shortValue = 23;
    double price = 678.00;
    float totalPrice = 5656.00F;
    // naming convention of a class in java where starting alphabet of each word is
    // in caps
    String name = " Reethu";
    char charValue = 'A';
    String address = "Mysuru";
    // constructor name must be the same as class name
    // constructor has access specifier
    // constructor do not have a return type
    private DataTypes() {

    }
    // method name
    public double displayNumber() {
        double age = 21.10;
        return age;
    }
    // entry point of your program
    public static void main(String[] args) {
        // declaration and initialization of a variable
        int number1 = 20;
        // to print anything on a console
        System.out.println("The value of number 1 : " + number1);
    }   
}
