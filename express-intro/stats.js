const { ExpressError } = require("./errorHandlers");
const fs = require("fs");
// Calculate mean

const meanFunc = (numsArr) => {
  const nums = numsArr.split(",");
  // Check if array item is number, if all items are numbers then return the sum
  const sum = nums.reduce((acc, num) => {
    if (!Number(num)) {
      throw new ExpressError(`Error - Invalid Input: "${num}"`, 400);
    }
    return acc + Number(num);
  }, 0);
  // Divide by number of items in array for mean
  const mean = sum / nums.length;
  return mean;
};

// Calculate meadian

const medianFunc = (numsArr) => {
  const nums = numsArr.split(",");
  // Create array, check if array item is number, if all are numbers then sort
  const numArr = nums
    .map((num) => {
      if (!Number(num)) {
        throw new ExpressError(`Error - Invalid Input: "${num}"`, 400);
      } else {
        return Number(num);
      }
    })
    .sort();
  // If even number of array items then the mean
  // is calculated by the average of the two most center nums
  // else grab the middle/median num
  if (numArr.length % 2 === 0) {
    return (numArr[numArr.length / 2] + numArr[numArr.length / 2 - 1]) / 2;
  } else {
    return numArr[Math.floor(numArr.length / 2)];
  }
};

// Calculate mode

const modeFunc = (numsArr) => {
  const nums = numsArr.split(",");
  // Create a map to count each number
  const numMap = nums.reduce((acc, num) => {
    if (!Number(num)) {
      throw new ExpressError(`Error - Invalid Input: "${num}"`, 400);
    }
    // if key exists on map then add 1 to value
    // else add new key value pair to map
    acc.has(num) ? acc.set(num, acc.get(num) + 1) : acc.set(num, 1);
    return acc;
  }, new Map());
  // Grab values for each item in the map
  const mapValues = [...numMap.values()];
  const checkMap = mapValues.every((val) => {
    return val === 1;
  });
  // If all numbers appear the same number of times there is no mode
  if (checkMap) {
    return `Mode is the number(s) that appears most often but each num appears an equal number of times`;
  } else {
    // Find the highest value and push to keys
    // If numbers appear the same number of times
    // it returns each mode number with matching value
    let keys = [];
    let val = 0;
    for ([k, v] of numMap) {
      if (v === val) keys.push(k);
      if (v > val) (keys = []), keys.push(k), (val = v);
    }
    return keys.join(",");
  }
};

const timeStamp = () => {
  const time = new Date();
  let [month, date, year, hours, minutes, seconds] = [
    time.getMonth() + 1,
    time.getDate(),
    time.getFullYear(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ];
  return `${month}/${date}/${year} - ${hours}:${minutes}:${seconds}`;
};

const writeToFile = (type, input) => {
  const types = {
    mean: `Mean  = ${meanFunc(input)}`,
    median: `Median = ${medianFunc(input)}`,
    mode: `Mode = ${modeFunc(input)}`,
    all: `Mean = ${meanFunc(input)}, 
    \nMedian = ${medianFunc(input)}, 
    \nMode = ${modeFunc(input)}
    `,
  };
  fs.writeFile(
    `${type}.txt`,
    `${timeStamp()} \n${types[type]}`,
    "utf8",
    (err) => {
      if (err)
        console.log(`Error: Request failed with "${err}"`), process.exit(1);
    }
  );
};

module.exports = { meanFunc, medianFunc, modeFunc, writeToFile };
