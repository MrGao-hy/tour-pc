import CryptoJS from 'crypto-js';

/**
 * @description 使用时必须于请求头加上responseType: 'blob'，慎用，慎用！
 * @stream  下载流（格式）
 * @filename  下载文件名称
 * @suffix  下载文件后缀，例如".xlsx"
 * @stream: any  等参数格式是对参数类型做一下限制
 */
function downloadFile (
  stream: any,
  filename: string,  //不传值默认以当前时间为文件名
  suffix: string
) {
  //通过new Blob和文件格式生成blob对象
  const blob = new Blob([ stream ], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" });
  const objectURL = URL.createObjectURL(blob);
  let link: HTMLAnchorElement | null = document.createElement("a");
  //下载的文件名
  link.download = `${ filename }${ suffix }`;
  link.href = objectURL;
  // @ts-ignore 判断浏览器的方法
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    (window.navigator as any).msSaveOrOpenBlob(blob, filename);
  } else {
    link.click();
  }
  URL.revokeObjectURL(objectURL);
  link = null;
}

/**
 * @description 函数防抖：一段实现执行多次，只执行最后一次
 * @param fn 回调函数
 * @param t 节流时间
 */
const debounce = (fn: Function, t: number) => {
  const delay = t || 500;
  let timer: any;
  let that = this;
  return function () {
    const args = arguments;
    if ( timer ) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(that, args);
    }, delay);
  };
};
/**
 * @description 函数节流: 一段时间执行一次
 * @param fn 回调函数
 * @param t 节流时间
 */
const throttle = (fn: Function, t: number) => {
  let last: any;
  let timer: any;
  let that = this;
  const interval = t || 500;
  return function () {
    const args = arguments;
    const now = +new Date();
    if ( last && now - last < interval ) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(that, args);
      }, interval);
    } else {
      last = now;
      fn.apply(that, args);
    }
  };
};

/**
 * @description 根据出生日期算出年龄
 * @param strBirthday {String} 例:2022-10-10
 * @return {String} 例:0~120
 * */
const getAge = (strBirthday?: string): string => {
  if (!strBirthday) return '';
  let returnAge
  const strBirthdayArr = strBirthday.split('-')
  const birthYear = Number(strBirthdayArr[0])
  const birthMonth = Number(strBirthdayArr[1])
  const birthDay = Number(strBirthdayArr[2])

  const day = new Date()
  const nowYear = day.getFullYear()
  const nowMonth = day.getMonth() + 1
  const nowDay = day.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge + 1 + "岁" // 返回周岁年龄
}

/**
 * @description 使用AES算法加密数据
 * @param encryptedData - 要加密的明文
 * @param secretKey - 加密密钥
 * @param iv - 初始化向量（可选，如果不提供，CryptoJS会自动生成）
 * @returns {string} - 返回加密后的密文字符串（通常为Base64编码）
 */
const encrypt = (encryptedData: string, secretKey: string, iv?: string): string => {
  // 将密钥和初始化向量（如果有）从字符串转换为CryptoJS可识别的格式
  let key = CryptoJS.enc.Utf8.parse(secretKey);
  let ivv = iv ? CryptoJS.enc.Utf8.parse(iv) : undefined; // 如果iv未提供，则不传入

  // 执行加密操作
  let encrypted = CryptoJS.AES.encrypt(encryptedData, key, {
    iv: ivv, // 如果提供了iv，则使用它
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7 // 填充方式
  });

  // 返回加密后的密文字符串（默认为Base64编码）
  return encrypted.toString();
};

/**
 * @description 解密一段通过 AES-CBC 模式加密的数据
 * @param encryptedData 解密数据
 * @param sessionKey 会话密钥，用于解密
 * @param iv 初始化向量，用于AES CBC模式加密中的每个块
 */
const decrypt = (encryptedData: string, sessionKey: string, iv?: string) => {
  let key = CryptoJS.enc.Utf8.parse(sessionKey)
  let ivv = iv ? CryptoJS.enc.Utf8.parse(iv) : undefined;
  let decrypt = CryptoJS.AES.decrypt(encryptedData, key,  {
    iv: ivv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypt.toString(CryptoJS.enc.Utf8);
};

/**
 * 递归拷贝对象
 * @param {object} source 对象或数组
 * @returns 深拷贝的数组和对象
 * */
const deepClone = (source: any) => {
  if (!source && typeof source !== 'object') {
    throw new Error('该值不存在或者不是个对象')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export {
  downloadFile,
  debounce,
  throttle,
  getAge,
  encrypt,
  decrypt,
  deepClone
};