Basic JavaScript Questions
1. Calculate the Area of a Circle (With Precision):
Task: Write a JavaScript function that takes the radius of a circle as input
and returns its area rounded to two decimal places. (Area = π * radius²)
Function Signature: calculateCircleArea(radius)
Example Input: radius = 5
Example Output: 78.54 (Using π ≈ 3.14159)
2. Count Vowels in a String (Ignore Numbers):
Task: Create a JavaScript function that takes a string as input and returns
the number of vowels (a, e, i, o, u) in the string (case-insensitive). Ignore
numbers and special characters in the string.
Function Signature: countVowelsIgnoreNumbers(str)
Example Input: "H3ll0 W0rld"
Example Output: 1 (Vowel is 'o'.)
3. Check if a String is an Anagram of Another (With Symbols):
Task: Write a JavaScript function to check if two strings are anagrams of
each other (ignoring case, spaces, and non-alphabetic characters).
Function Signature: isAnagramWithSymbols(str1, str2)
Example Input: "Listen!" , "Silent!!"
Example Output: true
4. Convert Fahrenheit to Celsius (Array of Temperatures):
Task: Write a JavaScript function that takes an array of temperatures in
Fahrenheit and returns an array of equivalent temperatures in Celsius. The
formula is (Fahrenheit - 32) * 5/9 .
JS trial question set 3.1 2
Function Signature: convertFahrenheitArrayToCelsius(arr)
Example Input: [32, 98.6, 212]
Example Output: [0, 37, 100]
5. Find the Smallest of Three Numbers (With Duplicate Handling):
Task: Create a JavaScript function that takes three numbers as input and
returns the smallest unique number. If all three numbers are the same,
return that number.
Function Signature: findSmallestUnique(num1, num2, num3)
Example Input: num1 = 3, num2 = 3, num3 = 5
Example Output: 3
Array Questions
1. Find the Intersection of Two Arrays (Remove Duplicates):
Task: Write a JavaScript function that takes two arrays as input and
returns a new array containing only the unique elements that are common
to both arrays.
Function Signature: findUniqueIntersection(arr1, arr2)
Example Input:
arr1 = [1, 2, 3, 3, 4, 5]
arr2 = [3, 5, 5, 6, 7]
Example Output: [3, 5]
2. Rotate Array to the Left (With Negative Steps):
Task: Write a JavaScript function that takes an array and a number k as
input and rotates the array to the left by k steps. If k is negative, rotate to
the right by |k| steps.
Function Signature: rotateArray(arr, k)
Example Input:
arr = [1, 2, 3, 4, 5]
JS trial question set 3.1 3
k = -2
Example Output: [4, 5, 1, 2, 3]
Questions on Nested JSON
1. Sum of Values with a Specific Key (With Default Value):
Task: Create a JavaScript function that takes a nested JSON object and a
key as input, and returns the sum of all numeric values associated with
that key at any level of nesting. If a key is missing, treat its value as 0.
Function Signature: sumValuesByKeyWithDefault(obj, key)
Example Input:
{
 "a": { "count": 10 },
 "b": [ { "count": 5 }, { "missingKey": 15 } ],
 "c": { "details": { "count": 20 } }
}
Key: "count"
Example Output: 35
2. Extract Objects Based on Property Existence (Support Arrays of Objects):
Task: Create a JavaScript function that takes a nested JSON object and a
key as input. Return an array of all objects (at any level) that have the
specified key, including objects inside arrays.
Function Signature: extractObjectsByKeyFromArrays(obj, key)
Example Input:
{
 "items": [
 { "name": "Item 1", "price": 10 },
 { "name": "Item 2" }
 ],
JS trial question set 3.1 4
 "details": { "manufacturer": "Acme", "price": 50 },
 "extra": [{ "price": 20 }]
}
Key: "price"
Example Output:
[
 { "name": "Item 1", "price": 10 },
 { "manufacturer": "Acme", "price": 50 },
 { "price": 20 }
]
