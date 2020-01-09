import CryptoJS from 'crypto-js'

const { VUE_APP_CIPHER_PASS } = process.env;

const cryptData = (data, pass = VUE_APP_CIPHER_PASS) => {
  return CryptoJS.AES.encrypt(data, `${pass}`).toString()
};

const cryptDataObj = (data, pass = VUE_APP_CIPHER_PASS) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), pass).toString();
};

const decryptData = (cryptedData, pass = VUE_APP_CIPHER_PASS) => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, pass);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const decryptDataObj = (cryptedData, pass = VUE_APP_CIPHER_PASS) => {
  const bytes = CryptoJS.AES.decrypt(cryptedData, pass);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export {
  cryptData,
  decryptData,
  cryptDataObj,
  decryptDataObj
};