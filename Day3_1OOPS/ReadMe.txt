Object Oriented Programming
    It has main pillars :
        Class / Object
        Encapsulation - 1) Mainly focus on data  , 2) permission access either to read or write or both 
                        3) validation while setting the data 
                        all attributes of a class are private in nature but indirectly we can 
                        access them so, to achieve  this we create getter and setter methods

                        for eg :  private long password ;  
                        we create a setter method which is write only method to 
                        set the password and we cannot read it as we have not created a getter method for it ( read method) .
        Abstraction : focussing on implementation hiding (achieved by either abstract class or interface)
        Inheritance :  when a child class is inheriting the features of base class like a child inherit the properties of father
        Polymorphism :  many forms when one object behaves many forms. 
        There  are two types static polymorphism and dynamic polymorphism



Object Oriented Programming : reusability  , scalable , write maintainable , security 
class  -- Entity class :  POJO - Data(Variables) 2) Behaviour (Methods)
        -- Real world entities  : Employee , BankAccount, Student , Teacher , Vehicle 
    It has main pillars :
        Class / Object  : from this blueprint which is a class , the Actual thing which we create  from this blueprint is an object
       Each object has its own data but shares same behaviour
        Encapsulation - wrapping data + methods together and hiding data using private access specifier
        1) Mainly focus on data  , 2) permission access either to read or write or both 
                        3) validation while setting the data 

                        1)Data Security
                        2)Validation Control
                        3) Easy Maintenance

        all attributes of a class are private in nature but indirectly we can 
                        access them so, to achieve  this we create getter and setter methods

                        for eg :  private long password ;  
                        we create a setter method which is write only method to 
                        set the password and we cannot read it as we have not created a getter method for it ( read method) .
        Abstraction : focussing on implementation hiding (achieved by either abstract class or interface)
                       Show what to do , and hide how to do
       
       
        Inheritance :  when a child class is inheriting the features of base class like a child inherit the properties of father
        Polymorphism :  many forms when one object behaves many forms. 
        There  are two types static polymorphism and dynamic polymorphism

        Static Polymorphism : When you have multiple methods with the same name but different
                                signature in same class  -- overloading
        dynamic Polymorphism : When you have multiple methods with the same name , with same 
                                signature in child class  -- overriding


                class Hr{
                public void salary(String role , int vc)
                {
                        // manager

                }

                 
                }
                Class TeamLead extends Hr{


                     public void salary(String role , int vc)
                {

                    //se
                }
                

                }



