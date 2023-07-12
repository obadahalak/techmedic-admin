export function isBinary(str) {
    let isBinary = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "0" || str[i] == "1") {
        isBinary = true;
      } else {
        isBinary = false;
      }
    }
    return isBinary;
  }