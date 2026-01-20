import java.util.Scanner;
public class Day1Assignment1Q2 {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String s = sc.next();

        int[] freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }

        int maxFreq = 0;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > maxFreq) {
                maxFreq = freq[i];
            }
        }

        int result = s.length() - maxFreq;
        System.out.println(result);
    }
}
