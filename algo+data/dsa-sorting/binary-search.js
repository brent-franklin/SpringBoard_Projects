function numericRecursiveBinarySearch(sortedArr, target, low, high, compare) {
  // Stop if number is not in the range of the array
  if (sortedArr[0] > target) return "No Match";
  if (sortedArr[sortedArr.length - 1] < target) return "No Match";

  // Set low, high, and i (index) for the search
  if (low === undefined) low = 0;
  if (high === undefined) high = sortedArr.length - 1;
  let i = Math.floor((high - low) / 2 + low);

  // If compare matches i then we are in an infinite loop and this breaks it
  if (compare === i) return "No Match";

  // If there is a match then return the match and the index in a template literal
  const match =
    sortedArr[i] === target ? `${sortedArr[i]} is at index ${i}` : false;

  // If there is no match then adjust high or low depending on value
  if (!match) {
    if (sortedArr[i] < target) {
      low = i + 1;
      return numericRecursiveBinarySearch(sortedArr, target, low, high, i);
    } else if (sortedArr[i] > target) {
      high = i - 1;
      return numericRecursiveBinarySearch(sortedArr, target, low, high, i);
    } else {
      return "No Match";
    }
  }

  return match;
}

numericRecursiveBinarySearch([1, 2, 3, 4, 5, 6, 7], 6);

// The above code is mine, the below code is a copied example without recursion
// binarySearch implementation
// note: arr must be sorted!
function binarySearch(arr, val) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // we found our value!
      return middleIdx;
    }
  }

  // left and right pointers crossed, val isn't in arr
  return -1;
}
