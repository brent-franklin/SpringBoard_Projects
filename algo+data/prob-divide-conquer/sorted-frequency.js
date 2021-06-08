function sortedFrequency(arr, target) {
  let count = 0;
  for (let i of arr) {
    if (i === target) count++;
  }
  return count || -1;
}

module.exports = sortedFrequency;
