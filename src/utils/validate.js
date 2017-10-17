/* 合法邮箱*/
export function validEmail(str) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i
  return reg.test(str.trim())
}

/* 合法手机号*/
export function validMobiles(str) {
  const reg = /^((13|15|18|14|17)+\d{9})$/
  return reg.test(str)
}

/* 合法uri*/
export function validURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 是否为中文*/
export function isChinese(str) {
  const reg = /^[\u0391-\uFFE5]+$/
  return reg.test(str);
}

/* 身份证号码的验证规则*/
export function isIdCardNo(num) {
  let len = num.length, re;
  if (len === 15) {
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
  } else if (len === 18) {
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
  } else {
    return false;
  }
  let a = num.match(re);
  if (a != null) {
    let D, B;
    if (len === 15) {
      D = new Date(`19${a[3]}/${a[4]}/${a[5]}`);
      B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
    } else {
      D = new Date(`${a[3]}/${a[4]}/${a[5]}`);
      B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
    }
    if (!B) {
      return false;
    }
  }
  if (!re.test(num)) {
    return false;
  }
  return true;
}

/* 统一社会信用代码校验*/
export function checkSocialCreditCode(code) {
  let reg = /^[0-9A-Z]+$/;
  //18位校验及大写校验
  if ((code.length != 18) || !reg.test(code)) {
    return false;
  }
  let codeChar, codeCharValue;//统一社会信用代码的每一个值，统一社会信用代码每一个值的权重
  let total = 0;
  let weightedFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子
  let chars = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';//不用I、O、S、V、Z
  let charsArr = chars.split(',');
  let charsStr = charsArr.join('');
  for (let i = 0; i < code.length - 1; i++) {
    codeChar = code.substring(i, i + 1);
    codeCharValue = charsStr.indexOf(codeChar);
    total = total + codeCharValue * weightedFactors[i];//权重与加权因子相乘之和
  }
  let logicCheckCode = 31 - total % 31;
  if (logicCheckCode == 31) {
    logicCheckCode = 0;
  }
  logicCheckCode = charsArr[logicCheckCode];
  let checkCode = code.substring(17, 18);
  if (logicCheckCode != checkCode) {
    return false;
  }
  return true;
}
