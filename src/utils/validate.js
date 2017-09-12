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

//身份证号码的验证规则
export function isIdCardNo(num){
  //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
  var len = num.length, re;
  if (len == 15)
    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
  else if (len == 18)
    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
  else {
    //alert("输入的数字位数不对。");
    return false;
  }
  var a = num.match(re);
  if (a != null)
  {
    if (len==15)
    {
      var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
      var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
    }
    else
    {
      var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
      var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
    }
    if (!B) {
      //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
      return false;
    }
  }
  if(!re.test(num)){
    //alert("身份证最后一位只能是数字和字母。");
    return false;
  }
  return true;
}
