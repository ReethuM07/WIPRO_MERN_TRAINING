public class Day1Assignment1Q4 {

    public static String reverseEachWord(String s) {

        String[] words = s.split(" ");
        String result = "";

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            String rev = "";

            for (int j = word.length() - 1; j >= 0; j--) {
                rev = rev + word.charAt(j);
            }

            result = result + rev;

            if (i < words.length - 1) {
                result = result + " ";
            }
        }
        return result;
    }

    public static void main(String[] args) {

        String input = "Great Learning";   
        System.out.println(reverseEachWord(input));
    }
}
