const crypto = require('crypto')

export const generateID = async () => {
  return (
    get2DigitYear() +
    getRandomString(1) +
    // Math.floor(100000 + Math.random() * 900000)
    //tk_fix
    crypto.randomInt(100000, 1000000)
  );
};

export const get2DigitYear = () => {
  const strDate = new Date();
  const shortYear = strDate.getFullYear();
  return shortYear.toString().substr(-2); //two digit year
};

export const getRandomString = (length: number) => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      crypto.randomInt(0, randomChars.length)
    );
  }
  return result;
};