// TODO, all below functions not handle negative number case.
// TODO, all below function not handle precision case.
// TODO, all below function not handle illegal number case.

// Trim useless 0 before integer part and after fractions part.
function trim0(str) {
  let start = str.length - 1;
  let end = str.length;

  let find = false;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '.') {
      start = i - 1;
      find = true;
      break;
    }

    if (str.charAt(i) !== '0') {
      start = i;
      find = true;
      break;
    }
  }

  let hasFractions = str.indexOf('.') !== -1;

  if (hasFractions) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) === '.') {
        end = i;
        break;
      }

      if (str.charAt(i) !== '0') {
        end = i + 1;
        break;
      }
    }
  }

  return str.substring(start, end);
}

function _2To10(str) {
  // Integer part
  let integerPart = String(Math.floor(Number(str)));
  let integerSum = 0;

  let lengthInteger = integerPart.length;

  for (let i = 0; i < lengthInteger; i++) {
    integerSum += integerPart.charAt(i) * Math.pow(2, lengthInteger - i - 1);
  }

  // Fractions part
  let fractionsPart = str.split('.')[1];
  let fractionsSum = 0;

  let lengthFractions = fractionsPart ? fractionsPart.length : 0;

  for (let i = 0; i < lengthFractions; i++) {
    fractionsSum += fractionsPart.charAt(i) * Math.pow(2, -(i + 1));
  }

  return String(integerSum + fractionsSum);
}

function _10To2(str) {
  // Integer part
  let integerPart = Math.floor(Number(str));
  let integerResult = [];

  if (integerPart === 0) {
    integerResult.push(0);
  }

  while (integerPart > 0) {
    integerResult.unshift(integerPart % 2);
    integerPart = Math.floor(integerPart / 2);
  }

  // Fractions part
  let precision = 12;
  let fractionsPart = Number(str) - Math.floor(Number(str));

  if (!fractionsPart) {
    return integerResult.join('');
  }

  let fractionsResult = [];

  let count = 0;
  while (fractionsPart > 0) {
    let temp = fractionsPart * 2;
    fractionsResult.push(Math.floor(temp));
    fractionsPart = temp - Math.floor(temp);
    count++;
  }

  return [...integerResult, '.', ...fractionsResult].join('');

}

function _2To8(str) {
  // Integer part
  let integerPart = str.split('.')[0];
  let integerResult = [];

  for (let i = integerPart.length; i > 0; i -= 3) {
    // substring() will handle case startIndex < 0
    let subStr = integerPart.substring(i - 3, i);
    integerResult.unshift(_2To10(subStr));
  }

  // Fractions part
  let fractionsPart = str.split('.')[1];

  if (!fractionsPart) {
    return integerResult.join('');
  }

  let fractionsResult = [];

  for (let i = 0; i < fractionsPart.length; i += 3) {
    // substring() will handle case endIndex > string length
    let subStr = fractionsPart.substring(i, i + 3);

    fractionsResult.push(_2To10(subStr));
  }

  return [...integerResult, '.', ...fractionsResult].join('');
}

function _8To2(str) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '.') {
      result.push('.');
      continue;
    }

    let binaryValue = _10To2(str.charAt(i));

    let diff = 3 - String(binaryValue).length;
    if (diff > 0) {
      binaryValue = new Array(diff).fill(0).join('') + binaryValue;
    }

    result.push(binaryValue);
  }

  return trim0(result.join(''));
}

function _2To16(str) {
  // Integer part
  let integerPart = str.split('.')[0];
  let integerResult = [];

  for (let i = integerPart.length; i > 0; i -= 4) {
    let subStr = integerPart.substring(i - 4, i);
    let subInteger = Number(_2To10(subStr));

    if (subInteger < 10) {
      integerResult.unshift(subInteger);
    } else {
      integerResult.unshift(String.fromCharCode(65 + subInteger - 10));
    }
  }

  // Fractions part
  let fractionsPart = str.split('.')[1];

  if (!fractionsPart) {
    return integerResult.join('');
  }

  let fractionsResult = [];

  for (let i = 0; i < fractionsPart.length; i += 4) {
    let subStr = fractionsPart.substring(i, i + 4);
    let subInteger = Number(_2To10(subStr));

    if (subInteger < 10) {
      fractionsResult.push(subInteger);
    } else if (subInteger < 16) {
      fractionsResult.push(String.fromCharCode(65 + subInteger - 10));
    } else {
      // illegal
    }
  }

  return [...integerResult, '.', ...fractionsResult].join('');
}

function _16To2(str) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);

    if (charCode === 46) {
      result.push('.');
      continue;
    }

    let binaryValue;

    if (charCode >= 48 && charCode <= 57) {
      binaryValue = _10To2(str.charAt(i));
    } else if (charCode >= 65 <= 70) {
      binaryValue = _10To2(10 + charCode - 65);
    } else {
      // illegal
    }

    let diff = 4 - String(binaryValue).length;
    if (diff > 0) {
      binaryValue = new Array(diff).fill(0).join('') + binaryValue;
    }

    result.push(binaryValue);
  }

  return trim0(result.join(''));
}

/*
64-based number system contains:
'0123456789'
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
'abcdefghijklmnopqrstuvwxyz'
'-'
'_'
 */
// TODO, fractions has some precision problem.
function _10To64(str) {
  const binaryStr = _10To2(str);

  // convert from 2 to 64
  let integerPart = binaryStr.split('.')[0];
  let integerResult = [];

  const integerToCharCode = (integer) => {
    if (integer >= 0 && integer < 10) {
      // 0 - 9
      return 48 + integer;
    } else if (integer >= 10 && integer < 36) {
      // A - Z
      return 65 + integer - 10;
    } else if (integer >= 36 && integer < 62) {
      // a - z
      return 97 + integer - 36;
    } else if (integer === 62) {
      // -
      return 45;
    } else if (integer === 63) {
      // _
      return 95;
    } else {
      // illegal
    }
  };

  for (let i = integerPart.length; i > 0; i -= 6) {
    const subStr = integerPart.substring(i - 6, i);
    const subInteger = Number(_2To10(subStr));
    const charCode = integerToCharCode(subInteger);

    integerResult.unshift(String.fromCharCode(charCode));
  }

  const fractionsPart = binaryStr.split('.')[1];

  if (!fractionsPart) {
    return integerResult.join('');
  }

  let fractionsResult = [];

  for (let i = 0; i < fractionsPart.length; i += 6) {
    const subStr = integerPart.substring(i, i + 6);
    const subInteger = Number(_2To10(subStr));
    const charCode = integerToCharCode(subInteger);

    fractionsResult.push(String.fromCharCode(charCode));
  }

  return [...integerResult, '.', ...fractionsResult].join('');
}

function _64To10(str) {
  let result = 0;

  const charCodeToInteger = (charCode) => {
    if (charCode >= 48 && charCode <= 57) {
      // 0 - 9
      return Number(String.fromCharCode(charCode));
    } else if (charCode >= 65 && charCode <= 90) {
      // A - Z
      return 10 + charCode - 65;
    } else if (charCode >= 97 && charCode <= 122) {
      // a - z
      return 10 + 26 + charCode - 97;
    } else if (charCode === 45) {
      // -
      return 62;
    } else if (charCode === 95) {
      // _
      return 63;
    } else {
      // illegal
    }
  };

  let integerLength = str.indexOf('.');
  if (integerLength === -1) {
    integerLength = str.length;
  }

  let fractionFlag = false;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode === 46) {
      // '.'
      fractionFlag = true;
      continue;
    }

    const integer = charCodeToInteger(charCode);

    const exponent = fractionFlag ? integerLength - i : integerLength - i - 1;


    result += integer * Math.pow(64, exponent);
  }

  return String(result);
}

module.exports = {
  _2To10,
  _10To2,
  _2To8,
  _8To2,
  _2To16,
  _16To2,
  _10To64,
  _64To10
};
