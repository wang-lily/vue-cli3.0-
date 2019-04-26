import crypto from 'crypto'

//加密密码
export function getmd5(pass) {
    let md5 = crypto.createHash("md5");
    md5.update(pass);
    let a = md5.digest('hex').toUpperCase();
    // console.log(a,'加密');
    return a;
}
//生成uuid
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// 用户名正则，4到16位（字母，数字，下划线，减号）
export function isValidUserName(val) {
    if (/^[a-zA-Z0-9_-]{4,16}$/.test(val)){
        return true
    } else {
        return false;
    }
}
// 6-15位数字与字母组合
export function isValidPassword(val) {
    if (/^(?![^a-zA-Z]+$)(?!\D+$).{6,15}$/.test(val)) {
        return true
    } else {
        return false;
    }
}
// 手机号码验证
export function isValidPhone(val) {
    if (/^1[34578]\d{9}$/.test(val)) {
        return true
    } else {
        return false;
    }
}
// 身份证验证
export function isValidIdentityCode(val) {
    let city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    }
    if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val)) {
        return false;
    }
    if (!city[val.substr(0, 2)]) {
        return false;
    } 
    if (val.length == 18) {
        let code = val.split('');
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
        }
        let last = parity[sum % 11];
        if (last == code[17]) {
            return false;
        }
    }
    return true;
}
//验证邮箱格式的合法性
export function isValidEmail(value) {
    if (value != '') { //判断
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (!reg.test(value)) {
            return false;
        } else {
            return true;
        }
    }
}
//验证汉字的合法性
export function isValidCharacter(value) {
    var v_regex = /^[\u4E00-\u9FA5]+(?:·[\u4E00-\u9FA5]+)*$/;
    if (value.length > 0) {
        return v_regex.test(value);
    } else {
        return false;
    }
}
//验证座机号码的合法性
export function isValidTelphone(value) {
    var telphone = /^0\d{2,3}?\d{7,8}$/;
    if (value.length > 0) {
        return telphone.test(value);
    } else {
        return false;
    }
}
/**
 * 根据身份证获取 出生日期
 * @param cardnum  15位 18位皆可
 * @returns {string}
 */
export function getbirthday(cardnum) {
    if (15 == cardnum.length || 18 == cardnum.length) {
        var left = cardnum.length - 12;
        var right = cardnum.length - 4;
        var birthday = cardnum.slice(left, right);
        if (8 == birthday.length) {
            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            return birthday;
        } else {
            return "";
        }
    }
}

//验证正整数的合法性
export function isValidInteger(value) {
    var number = /^\+?[1-9][0-9]*$/; //正整数
    if (value.length > 0) {
        return number.test(value);
    } else {
        return false;
    }
}


//验证数字的合法性
export function isValidNumber(value) {
    if (!isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

//验证浮点数的合法性
export function isValidFloat(value) {
    var number = /^\d+(\.\d+)?$/; //浮点数
    if (value.length > 0) {
        if (value.indexOf(".") > 0) {
            return number.test(value);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//验证字母的合法性
export function isValidChar(value) {
    var str = /^[A-Za-z]+$/; //字母
    if (value.length > 0) {
        return str.test(value);
    } else {
        return false;
    }
}

//验证有效数字，包括整数和浮点类型
export function isValidNumbers(value) {
    var isfloat = isValidFloat(value);
    var isNumber = isValidNumber(value);
    if (isfloat != false) {
        return isfloat;
    } else if (isNumber != false) {
        return isNumber;
    } else {
        return false;
    }
}
//根据身份证获取年龄
export function getAge(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
//判断平年还是闰年 
export function LeapYear(Year) {
    if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
    } else {
        return (false);
    }
}
//严格验证身份证号码
export function checkIdCard(idCard) {
    var SystemDate = new Date();
    var year = SystemDate.getFullYear();
    var month = SystemDate.getMonth() + 1;
    var day = SystemDate.getDate();
    var yyyy; // 年
    var mm; // 月
    var dd; // 日
    var birthday; // 生日
    var sex; // 性别
    var id = idCard;
    var id_length = id.length;
    if (id_length == 0) {
        // alert("请输入身份证号码!");
        return false;
    }
    if (id_length != 15 && id_length != 18) {
        // alert("身份证号长度应为15位或18位！");
        return false;
    }
    if (id_length == 15) {
        for (var i = 0; i < id_length; i++) {
            if (isNaN(idCard.charAt(i))) {
                // alert("15位身份证号中不能有字符！");
                return false;
            }
        }
        yyyy = "19" + id.substring(6, 8);
        mm = id.substring(8, 10);
        dd = id.substring(10, 12);
        if (mm > 12 || mm <= 0) {
            // alert("身份证号月份非法！");
            return false;
        }
        if (dd > 31 || dd <= 0) {
            //alert("身份证号日期非法！");
            return false;
        }
        // 4,6,9,11月份日期不能超过30
        if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && (dd > 30)) {
            //alert("身份证号日期非法！");
            return false;
        }
        // 判断2月份
        if (mm == 2) {
            if (LeapYear(yyyy)) {
                if (dd > 29) {
                    //alert("身份证号日期非法！");
                    return false;
                }
            } else {
                if (dd > 28) {
                    // alert("身份证号日期非法！");
                    return false;
                }
            }
        }
    } else {
        for (var i = 0; i < id_length - 1; i++) {
            if (isNaN(idCard.charAt(i))) {
                //alert("身份证号中前17位中不能有字符！");
                return false;
            }
        }
        if (isNaN(idCard.charAt(17)) && idCard.charAt(17) != "X" &&
            idCard.charAt(17) != "x") {
            //alert("身份证校验错误，请认真检查！");
            return false;
        }
        if (idCard.indexOf("X") > 0 && idCard.indexOf("X") != 17 ||
            idCard.indexOf("x") > 0 && idCard.indexOf("x") != 17) {
            //alert("身份证中\"X\"输入位置不正确！");
            return false;
        }
        yyyy = id.substring(6, 10);
        if (yyyy > year || yyyy < 1900) {
            //alert("身份证号年度非法！");
            return false;
        }
        mm = id.substring(10, 12);
        if (mm > 12 || mm <= 0) {
            // alert("身份证号月份非法！");
            return false;
        }
        if (yyyy == year && mm > month) {
            // alert("身份证号月份非法！");
            return false;
        }
        dd = id.substring(12, 14);
        if (dd > 31 || dd <= 0) {
            // alert("身份证号日期非法！");
            return false;
        }
        // 4,6,9,11月份日期不能超过30
        if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && (dd > 30)) {
            //alert("身份证号日期非法！");
            return false;
        }
        // 判断2月份
        if (mm == 2) {
            if (LeapYear(yyyy)) {
                if (dd > 29) {
                    // alert("身份证号日期非法！");
                    return false;
                }
            } else {
                if (dd > 28) {
                    // alert("身份证号日期非法！");
                    return false;
                }
            }
        }
        if (yyyy == year && mm == month && dd > day) {
            //alert("身份证号日期非法！");
            return false;
        }
        if (id.charAt(17) == "x" || id.charAt(17) == "X") {
            if ("x" != GetVerifyBit(id) && "X" != GetVerifyBit(id)) {
                //alert("身份证校验错误，请认真检查！");
                return false;
            }
        } else {
            if (id.charAt(17) != GetVerifyBit(id)) {
                //alert("身份证校验错误，请认真检查！");
                return false;
            }
        }
    }
    return true;
}

//身份证号码 15位转18位中,计算校验位即最后一位
export function GetVerifyBit(id) {
    var result
    var nNum = eval(id.charAt(0) * 7 + id.charAt(1) * 9 + id.charAt(2) * 10 +
        id.charAt(3) * 5 + id.charAt(4) * 8 + id.charAt(5) * 4 +
        id.charAt(6) * 2 + id.charAt(7) * 1 + id.charAt(8) * 6 +
        id.charAt(9) * 3 + id.charAt(10) * 7 + id.charAt(11) * 9 +
        id.charAt(12) * 10 + id.charAt(13) * 5 + id.charAt(14) * 8 +
        id.charAt(15) * 4 + id.charAt(16) * 2);
    nNum = nNum % 11
    switch (nNum) {
        case 0:
            result = "1";
            break;
        case 1:
            result = "0";
            break;
        case 2:
            result = "X";
            break;
        case 3:
            result = "9";
            break;
        case 4:
            result = "8";
            break;
        case 5:
            result = "7";
            break;
        case 6:
            result = "6";
            break;
        case 7:
            result = "5";
            break;
        case 8:
            result = "4";
            break;
        case 9:
            result = "3";
            break;
        case 10:
            result = "2";
            break;
    }
    return result;
}
//身份证号 15位转18位
export function Get18(idCard) {
    if (CheckValue(idCard)) {
        var id = idCard;
        var id18 = id;
        if (id.length == 0) {
            alert("请输入15位身份证号！");
            return false;
        }
        if (id.length == 15) {
            if (id.substring(6, 8) > 20) {
                id18 = id.substring(0, 6) + "19" + id.substring(6, 15);
            } else {
                id18 = id.substring(0, 6) + "20" + id.substring(6, 15);
            }

            id18 = id18 + GetVerifyBit(id18);
        }

        return id18;
    } else {
        return false;
    }
}
//验证金额
export function isValidMoney(val) {
    if (/^\d+(\.\d{0,2})?$/.test(val)) {
        return true
    } else {
        return false;
    }
}
//验证支付密码
export function isValidPayPwd(val) {
    if (/^[0-9]{6}$/.test(val)) {
        return true
    } else {
        return false;
    }
}

