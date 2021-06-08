function findFloor(arr, floor) {
  if (arr[0] > floor) return -1;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > floor) return arr[i - 1];
  }
  return arr[arr.length - 1];
}

module.exports = findFloor;
