/**
 *  错误信息
 */
const errorCodes = {
  ACCOUNT_INFO_ERROR: {
    code: '0001',
    msg: '用户名或密码错误'
  },
  USERNAME_IS_NEED: {
    code: '0002',
    msg: '用户名不能为空'
  },
  PASS_IS_NEED: {
    code: '0003',
    msg: '密码不能为空'
  }
  /********** add your error code ********************/
};

// 拼装错误的结果
const parseError = function (code, msg) {
  const result = {
    code,
    msg,
    data: {}
  };
  return JSON.stringify(result);
};

const errorResult = {};
for (const key in errorCodes) {
  errorResult[key] = parseError(errorCodes[key].code, errorCodes[key].msg);
}
/* 
* 测试 async/await
*/
const sleep = time => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // 返回 ‘ok’
      resolve('ok');
    }, time);
  });
};

const start = async function () {
  let result = await sleep(3000);
  console.log(result); // 收到 ‘ok’
};

start();


export default {
  ...errorResult,
  parseError,
  // 拼装成功的结果
  parseSuccess (data) {
    const result = {
      code: '0000',
      msg: '',
      data
    };
    return JSON.stringify(result);
  }

};
