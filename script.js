// Suffix With Unit
const suffixWithUnit = function(number) {
  if (typeof number !== "number" || number < 0) return "Must be a valid number";
  const numLen = String(number).length;

  if (numLen < 4) return String(number);
  if (numLen > 3 && numLen < 7) return `${number / 1000} Kilo`;
  if (numLen > 6) return `${number / 1000000} Mega`;
};

//JSON manipulation
const convertToJSON_B = function(jsonA) {
  const result = {};

  for (let key in jsonA) {
    const newKey = key.match("(?<=_)(.*)(?=_)")[0];
    const newNestedKey = key.match("(?<=_.*_)(.*)")[0];
    if (!result.hasOwnProperty(newKey)) {
      result[newKey] = {};
    }
    result[newKey][newNestedKey] = jsonA[key];
  }
  return result;
};

const convertToJSON_C = function(jsonB) {
  const result = [];
  let message = "";
  let signals = {};
  const objInArray = Object.entries(jsonB);

  objInArray.forEach((element, index) => {
    const key = element[0];
    const objs = element[1];

    signals[`locker_${key}_door`] = objs.door;
    signals[`locker_${key}_item`] = objs.item;

    if (index % 2 !== 1) {
      message = `rx_locker_${key}`;
    } else {
      result.push({
        message: `${message}${key}`,
        signals: signals
      });
      signals = {};
    }
  });
  return result;
};
