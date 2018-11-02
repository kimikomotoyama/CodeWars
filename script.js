// Suffix With Unit
const suffixWithUnit = function(number) {
  if (typeof number !== "number" || number < 0) return "Must be a valid number";
  const numLen = String(number).length;

  if (numLen < 4) return String(number);
  if (numLen > 3 && numLen < 7) return `${number / 1000} Kilo`;
  if (numLen > 6) return `${number / 1000000} Mega`;
};

console.log(suffixWithUnit("123")); //Must be a valid number
console.log(suffixWithUnit(-5)); //Must be a valid number
console.log(suffixWithUnit(123)); //123
console.log(suffixWithUnit(1234)); //1.234 kilo
console.log(suffixWithUnit(12345)); //12.345 kilo
console.log(suffixWithUnit(1234567)); //1.234567 Mega
console.log(suffixWithUnit(12345678)); //12.345678 Mega

//JSON manipulation
const JSON_A = {
  locker_5_light: 1,
  locker_5_unlock: 2,
  locker_6_light: 1,
  locker_6_unlock: 1,
  locker_1_door: 1,
  locker_1_item: 1,
  locker_2_door: 1,
  locker_2_item: 2,
  locker_5_door: 1,
  locker_5_item: 5,
  locker_6_door: 1,
  locker_6_item: 1,
  locker_1_light: 0,
  locker_1_unlock: 1,
  locker_2_light: 1,
  locker_2_unlock: 1,
  locker_3_light: 1,
  locker_3_unlock: 1,
  locker_4_light: 1,
  locker_4_unlock: 1,
  locker_3_door: 1,
  locker_3_item: 3,
  locker_4_door: 1,
  locker_4_item: 0
};

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

const JSON_B = convertToJSON_B(JSON_A);
console.log(JSON_B);
const JSON_C = convertToJSON_C(JSON_B);
console.log(JSON_C);
