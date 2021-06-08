/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  return i === nums.length - 1
    ? nums[nums.length - 1]
    : nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, compare) {
  if (!i) return longest(words, i + 1, words[0].length);
  if (i === words.length) return compare;
  compare = words[i].length > compare ? words[i].length : compare;
  return longest(words, i + 1, compare);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0, newStr = "") {
  if (i >= str.length) return newStr;
  newStr += str[i];
  return everyOther(str, i + 2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i = 0) {
  if (i === Math.floor(str.length / 2)) return true;
  return str[i] === str[str.length - 1 - i] ? isPalindrome(str, i + 1) : false;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (i === arr.length) return -1;
  if (arr[i] === val) return i;
  return findIndex(arr, val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = 0, reverse = "") {
  const letter = str[str.length - 1 - i];
  return i === str.length - 1
    ? (reverse += str[0])
    : revString(str, i + 1, (reverse += letter));
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arr = [];
  for (let key in obj) {
    typeof obj[key] === "string"
      ? arr.push(obj[key])
      : arr.push(...gatherStrings(obj[key]));
  }
  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */
function binarySearch(
  sortedArr,
  target,
  low = 0,
  high = sortedArr.length - 1,
  compare
) {
  // Set low, high, and i (index) for the search
  let i = Math.floor((high - low) / 2 + low);

  // If compare matches i then we are in an infinite loop and this breaks it
  // Stop if number is not in the range of the array
  if (
    sortedArr[0] > target ||
    compare === i ||
    sortedArr[sortedArr.length - 1] < target
  )
    return -1;

  // If there is no match then adjust high or low depending on value
  if (sortedArr[i] !== target) {
    if (sortedArr[i] < target) {
      return binarySearch(sortedArr, target, i + 1, high, i);
    } else if (sortedArr[i] > target) {
      return binarySearch(sortedArr, target, low, i - 1, i);
    }
  } else {
    return i;
  }

  return -1;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
