import CryptoJS from 'crypto-js'

const cryptData = (data, pass) => {
  return CryptoJS.AES.encrypt(data, `${pass}`).toString()
};

const cryptDataObj = (data, pass) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), pass).toString();
};

const decryptData = (cryptedData, pass) => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, pass);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const decryptDataObj = (cryptedData, pass) => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, pass);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export {
  cryptData,
  decryptData,
  cryptDataObj,
  decryptDataObj
};