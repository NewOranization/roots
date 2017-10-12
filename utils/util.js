
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

//参数data转formData
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}
module.exports = {
  json2Form: json2Form
}

  ;
var time = "";
/* 秒级倒计时 */
function countdown(that) {
  time = that.data.time;
  // 渲染倒计时时钟
  that.setData({
    day: dateDay(time),
    hour: datehour(time),
    minute: dateminute(time),
    second: datesecond(time)
  });
  if (time <= 0) {
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    time -= 1;
    countdown(that);
  }, 1000)
}

function countTemplate(that) {
  time = that.data.time;
  var newtime = new Date().getTime();
  newtime = newtime / 1000;
  var times = parseInt(time - newtime);
  if (times < 0) {
    that.setData({
      setd: {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00'
      }
    });
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    setd: {
      day: dateDay(time),
      hour: datehour(time),
      minute: dateminute(time),
      second: datesecond(time)
    }
  });
  setTimeout(function () {
    // 放在最后--
    time -= 1;
    countTemplate(that);
  }, 1000)
}
//天数
function dateDay(time) {
  var newtime = new Date().getTime();
  newtime = newtime / 1000;
  time = parseInt(time - newtime);
  // 秒数
  var second = Math.floor(time);
  // 小时位
  var hr = Math.floor(second / 3600);
  var day = Math.floor(hr / 24);
  if (day < 10) {
    day = "0" + day;
  }
  return day;
}
//小时
function datehour(time) {
  var newtime = new Date().getTime();
  newtime = newtime / 1000;
  time = parseInt(time - newtime);
  // 秒数
  var second = Math.floor(time);
  // 小时位
  var hr = Math.floor(second / 3600);
  var day = Math.floor(hr / 24);
  hr = parseInt((hr / 24 - day) * 24);
  if (hr < 10) {
    hr = "0" + hr;
  }
  return hr;
}
//分钟
function dateminute(time) {
  var newtime = new Date().getTime();
  newtime = newtime / 1000;
  time = parseInt(time - newtime);
  // 秒数
  var second = Math.floor(time);
  // 分钟位
  var min = Math.floor((second / 60) % 60);
  if (min < 10) {
    min = "0" + min;
  }
  return min;
}
//秒数
function datesecond(time) {
  var newtime = new Date().getTime();
  newtime = newtime / 1000;
  time = parseInt(time - newtime);
  // 秒数
  var second = Math.floor(time);
  // 秒位
  var sec = Math.floor(second % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return sec;
}
module.exports.countdown = countdown

module.exports.countTemplate = countTemplate

var cutDown = 60;
function secend(that, phoneCode, cutNum) {

  // console.log(phoneCode);
  // console.log(cutNum);
  phoneCode = 1;
  cutNum = true;
  if (cutDown < 0) {
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    code: {
      phoneCode: phoneCode,
      cutNum: !cutNum,
      second: second(cutDown)
    }
  });
  setTimeout(function () {
    // 放在最后--
    cutDown -= 1;
    secend(that);
    console.log(cutDown)
  }, 1000)
}

//秒数
function second(cutDown) {
  // 秒数
  var second = Math.floor(cutDown);
  // 秒位
  var sec = Math.floor(second % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return sec;
}

module.exports.secend = secend