public class StringPrograms {
    public static void main(String[] ar) {
        String s = "aabbcccc";
        System.out.println(s.charAt(2));
        // convert character to a number conversion
        System.out.println(s.charAt(2) - 't');
        // frequency count
        int[] freq = new int[26]; // 0 1 2 3 4
                                  // a b c d e
        for (int i = 0; i <= s.length(); i++) {
            System.out.println(s.charAt(i)); // a
            freq[s.charAt(i)]++;
                System.out.println(s.toUpperCase());
                 System.out.println(s.toLowerCase());
                  System.out.println(s.contains("t"));
                  System.out.println(s.equalsIgnoreCase("Nitin"));
        }
    }
}
