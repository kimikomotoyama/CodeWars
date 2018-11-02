// const suffixWithUnit = function(number) {
//   if (typeof number !== "number") return "Must be a number";

//   if (String(number).length < 4) console.log(number);
//   if (String(number).length > 3 && String(number).length < 7)
//     console.log(`${number / 1000} Kilo`);
//   if (String(number).length > 6 && String(number).length < 10)
//     console.log(`${number / 1000000} Mega`);
// };

// suffixWithUnit("123"); //must be a number
// suffixWithUnit(123); //123
// suffixWithUnit(1234); //1.234 kilo
// suffixWithUnit(12345); //12.345 kilo
// suffixWithUnit(1234567); //1.234567 Mega
// suffixWithUnit(12345678); //12.345678 Mega

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
  const objInArray = Object.entries(jsonB);

  for (let i = 0; i < objInArray.length; i += 2) {
    console.log(objInArray);
    const key = objInArray[i][0];
    const key2 = objInArray[i + 1][0];
    const objs = objInArray[i][1];
    const objs2 = objInArray[i + 1][1];

    const message = `rx_locker_${key}${key2}`;
    const keyForDoor = `locker_${key}_door`;
    const keyForItem = `locker_${key}_item`;
    const keyForDoor2 = `locker_${key2}_door`;
    const keyForItem2 = `locker_${key2}_item`;

    const signal = {};
    signal[keyForDoor] = objs.door;
    signal[keyForItem] = objs.item;
    signal[keyForDoor2] = objs2.door;
    signal[keyForItem2] = objs2.item;

    result.push({
      message: message,
      signal: signal
    });
  }
  return result;
};

const jsonB = convertToJSON_B(JSON_A);
const jsonC = convertToJSON_C(jsonB);