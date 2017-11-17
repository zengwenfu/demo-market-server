// import SparkMD5 from 'spark-md5';
import Crypto from 'crypto';
const key = 'facemagic88';
module.exports = {
  /**
   * md5 加密
   */
  encryptMd5 (value) {
    const md5 = Crypto.createHash('md5').update(value, 'utf-8').digest('hex');
    return md5;
  },
  /**
   * 
   * http://blog.fens.me/nodejs-crypto/
   * rc4和aes-256-cbc是表现不错的算法，加密和解密时间都比较短，加密时间:解密时间=1:3；
   */
  cipher (value) {
    let encrypted = "";
    const cip = Crypto.createCipher('rc4', key);
    encrypted += cip.update(value, 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
  },
  /**
   * 解密
   */
  decipher (encrypted) {
    let decrypted = "";
    const decipher = Crypto.createDecipher('rc4', key);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};
