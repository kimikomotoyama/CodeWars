function expandedForm(num) {
  const splitArray = String(num).split("");
  return splitArray.map((numInString, i) => {
    return Number(numInString) * (10 ** splitArray.length - i);
  });
}

console.log(expandedForm(12)); // "10 + 2"
console.log(expandedForm(42)); // "40 + 2"
console.log(expandedForm(70304)); //"70000 + 300 + 4"