// import java.util.Scanner;
// public class StringExample {

//     public static void main(String[] args) {

//         Scanner sc = new Scanner(System.in);
//         System.out.println("Enter a string: ");
//         String s = sc.nextLine().toLowerCase();

//         String vowels = "aeiou";
//         int count = 0;

//         for (int i = 0; i < s.length(); i++) {
//             if (vowels.contains(String.valueOf(s.charAt(i)))) {
//                 count++;
//             }
//         }

//         System.out.println(count);
//     }
// }


import java.util.Scanner;

public class StringExample {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();

        if (s.isEmpty()) {
            System.out.println(0);
            return;
        }

        String[] words = s.split(" ");
        System.out.println(words.length);
    }
}


