import SparkMD5 from 'spark-md5';

module.exports = {
  /**
   * md5 加密
   */
  encryptMd5 (value) {
    const spark = new SparkMD5();
    return spark.append(value).end();
  }
};
