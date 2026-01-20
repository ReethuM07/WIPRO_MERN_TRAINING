
    import java.util.Scanner;

class Student{

    String s_name;
    int s_rollNo ;
    int s_class;
    double s_marks;
    public void displayInfo() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'displayInfo'");
    }

}

// First we can create an object of a class and as many as objects we can create
// array is used to hold similar type of data int[] stud = new int[5];
// array is static in nature because once size is defined it is fixed

// for eg: if we want to store a student data having his name, rollno, class and marks
public class ArrayExample {
    
    public static void main(String[] a){
    int a2 = 10; //primitive
    int[] a1 = {56,78,45,34}; // non-primitive-- this array is of similar type
   // int[] students = new int[3];

   // Student[] sobj = new Student[3];// non-primitive  -- this array is of dissimilar type of elements stored in a class object form
     //Types of arrays
    //single , multidimensional , jagged array

    Scanner sc = new Scanner(System.in);
    int size = sc.nextInt();
    
    int[] students = new int[size]; // this size is now may vary depends upon user 

   System.out.println(students.length);

   students[0] = 101;
   students[1] = 102;
   students[2] = 103;
   students[3] = 104;


   System.out.println("Student at a particular index no." +  students[2]);

  for(int i=0 ; i<students.length ; i++){}
   for(int stud : students)
   {
     System.out.println("Student Data :" + stud); 
   }
    


    int[][]  studentarray = new int [4][2]; // multi dimensional array 
    studentarray[0][0] =101;    studentarray[0][1] = 12;
    studentarray[1][0] =102;    studentarray[1][1] = 12;
    studentarray[2][0] =103;    studentarray[2][1] = 12;
    studentarray[3][0] =104;    studentarray[3][1] = 12;


    int[][] marks = {
        
     {23,45} ,
     {45,56,67} , 
     {34,56,34,56}
    
    };
}
}
