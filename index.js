function generateRandomArray(rows, cols, min, max) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    arr.push(row);
  }
  return arr;
}

function findMinElement(arr) {
  let min = arr[0][0];
  let minRow = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] < min) {
        min = arr[i][j];
        minRow = i;
      }
    }
  }
  return { min, minRow };
}

function findMinPositiveInRow(row) {
  let minPositive = Infinity;
  for (let num of row) {
    if (num > 0 && num < minPositive) {
      minPositive = num;
    }
  }
  return minPositive === Infinity ? null : minPositive;
}

function countThreeInTheRow(row) {
  let posCount = 0;
  let negCount = 0;
  let toReplace = 0;

  for (let num of row) {
    if (num > 0) {
      posCount++;
      negCount = 0;
    } else if (num < 0) {
      negCount++;
      posCount = 0;
    } else {
      posCount = 0;
      negCount = 0;
    }

    if (posCount === 3 || negCount === 3) {
      toReplace++;
      posCount = 0;
      negCount = 0;
    }
  }
  return toReplace;
}

function printArrayWithDetails(arr) {
  const { minRow } = findMinElement(arr);

  const YELLOW = "\x1b[33m%s\x1b[0m";
  const RED = "\x1b[31m%s\x1b[0m";

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const minPositive = findMinPositiveInRow(row);
    const replacements = countThreeInTheRow(row);

    const formattedRow = row
      .map((num) => num.toString().padStart(4, " "))
      .join(", ");
    let rowString = formattedRow;
    const rowLabel = `Row ${i + 1}:`.padEnd(8, " ");
    if (i === minRow) {
      rowString = `${rowString} *`;
    }

    console.log(`${rowLabel} ${rowString}`);
    console.log(
      YELLOW,
      `  Min positive: ${minPositive !== null ? minPositive : "none"}`
    );
    console.log(
      RED,
      replacements === 0
        ? `  No need to replace any number`
        : replacements === 1
        ? `  Replace ${replacements} number`
        : `  Replace ${replacements} numbers`
    );
  }
}

const rows = 10;
const cols = 10;
const min = -100;
const max = 100;
const arr = generateRandomArray(rows, cols, min, max);
printArrayWithDetails(arr);
