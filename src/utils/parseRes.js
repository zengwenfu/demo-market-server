/**
 *  错误信息
 */
const errorCodes = {
  ACCOUNT_INFO_ERROR: {
    code: '0001',
    msg: '用户名或密码错误'
  },
  EMAIL_IS_NEED: {
    code: '0002',
    msg: '邮箱不能为空'
  },
  PASS_IS_NEED: {
    code: '0003',
    msg: '密码不能为空'
  },
  USER_EXIST: {
    code: '0004',
    msg: '用户已存在'
  },
  // needInput 为 true， 将封装成一个方法，需要传入 msg
  DB_ERROR: {
    code: '0005',
    needInput: true
  },
  PARAM_PARSE_ERROR: {
    code: '0006',
    msg: '参数格式错误'
  },
  EMAIL_ERROR: {
    code: '0006',
    needInput: true
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
  // 返回一个方法
  if (errorCodes.needInput) {
    errorResult[key] = (msg) => {
      return parseError(errorCodes[key].code, msg);
    };
  } else {
    errorResult[key] = parseError(errorCodes[key].code, errorCodes[key].msg);
  }
}

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
