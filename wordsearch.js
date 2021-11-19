//Submitted by Brian and Johannes

const transpose = function(matrix) {
  if (matrix.length === 0) return [];
  let resultArray = [];
  for (let i = 0; i < matrix[0].length; i++) {
    resultArray.push([]);
    for (let j = 0; j < matrix.length; j++) {
      resultArray[i].push(matrix[j][i]);
    }
  }
  return resultArray;
};


//Reverses elements of each row
const reverseRows = (matrix) => {

  let newMatrix = [];
  let copyRow;
  for (let row of matrix) {
    copyRow = row.join('').split('');
    newMatrix.push(copyRow.reverse());
  }

  return newMatrix;
};

//Checks to see if i and j are valid coordinates in the matrix
const coordinatesValid = function(matrix, i, j) {
  let noRows = matrix.length;
  let noCols = matrix[0].length;
  return (i >= 0 && i < noRows) && (j >= 0 && j < noCols);
};


//Generates strings (arrays) reading letters from bottom left to the top right
const generateStringsDiagonally = (matrix) => {
  let arrayOfStrings = [];
  for (let i = -matrix[0].length; i < matrix[0].length; i++) {
    let thisRow = [];
    let currentCol, currentRow;
    for (let j = 0; j < matrix.length; j++) {
      currentRow = matrix.length - 1 - j;
      currentCol = i + j;
      if (coordinatesValid(matrix, currentRow, currentCol)) {
        thisRow.push(matrix[currentRow][currentCol]);
      }
    }
    arrayOfStrings.push(thisRow);
  }
  return arrayOfStrings;
};


//Checks if word is in the row
const checkRowsForWord = (letters, word) => {
  const horizontalJoin = letters.map(ls => ls.join(''));
  for (const l of horizontalJoin) {
    if (l.includes(word)) return true;
  }
};

//Checks if word is in the column
const wordSearchBottomUpTopRight = (letters, word) => {
  return checkRowsForWord(generateStringsDiagonally(letters), word);
};

const wordSearch = (letters, word) => {
  if (typeof word !== 'string' || word.length === 0) return false;
  if (!(Array.isArray(letters) && letters.length)) return false;
  //Horizontally/Vertically
  const foundWordHorizontally = checkRowsForWord(letters, word);
  const foundWordVertically = checkRowsForWord(transpose(letters), word);
  const reverseWord = word.split('').reverse().join('');
  const foundWordHorizontallyReverse = checkRowsForWord(letters, reverseWord);
  const foundWordVerticallyReverse = checkRowsForWord(transpose(letters), reverseWord);
  //Diagonally
  const foundWordDiagonallyBtmLeftTopRight = wordSearchBottomUpTopRight(letters,word);
  const foundWordDiagonallyBtmLeftTopRightReverse = wordSearchBottomUpTopRight(letters,reverseWord);
  const foundWordDiagonallyTopLeftBtmRight = wordSearchBottomUpTopRight(reverseRows(letters),word);
  const foundWordDiagonallyTopLeftBtmRightReverse = wordSearchBottomUpTopRight(reverseRows(letters),reverseWord);
  return foundWordHorizontally
      || foundWordVertically
      || foundWordHorizontallyReverse
      || foundWordVerticallyReverse
      || foundWordDiagonallyBtmLeftTopRight
      || foundWordDiagonallyBtmLeftTopRightReverse
      || foundWordDiagonallyTopLeftBtmRight
      || foundWordDiagonallyTopLeftBtmRightReverse
    ? true : false;
};

module.exports = wordSearch;