function bubbleSort(numArr) {
  let swapped;
  do {
    swapped = false;
    for (let j = 0; j < numArr.length; j++) {
      if (numArr[j] > numArr[j + 1]) {
        [numArr[j], numArr[j + 1]] = [numArr[j + 1], numArr[j]];
        swapped = true;
      }
    }
  } while (swapped);
  return numArr;
}

module.exports = bubbleSort;
