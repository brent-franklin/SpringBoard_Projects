function countZeroes(arr) {
  let count = 0;
  for (let i of arr) {
    if (i === 0) count += 1;
  }
  return count;
}

module.exports = countZeroes;
