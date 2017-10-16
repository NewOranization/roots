//app.js
App({
  /**********************************************
   * 初始化
   *********************************************/
  

  /**********************************************
   * 全局变量
   *********************************************/
  globalData: {
      appApiUrl: "https://xcx.szhuanya.cn/web/index.php?c=site&a=entry&do=web&m=we7_wmall&ctrl=Interface&ac=member_info",
      userInfo: null,
      shopConfig: null
  },

 /************************************************
  * 获取全局数据
  ************************************************/
  getglobalData: function () {
    var that = this;
    if (wx.getExtConfig) {
      wx.getExtConfig({
        success: function (res) {
          var temp = false;
          for (var name in res.extConfig) {
            temp = true;
            break;
          }
          if (temp) {
            that.globalData = res.extConfig;
          }
        }
      })
    }
  },


  /************************************************
  * 获取用户信息
  ************************************************/
  getUserInfo: function (cb){
      getApp().getglobalData();
      var that = this;
      that.globalData.userInfo = that.wxCache('userInfo');
      if (that.globalData.userInfo == ''){
          that.getPostData(function (post_data) {
              that.getApiData(function (res) {
                  if (res.data.code == 0) {
                      console.log(res);
                      that.globalData.userInfo = res.data.data;
                      that.wxCache('userInfo', that.globalData.userInfo, 1800);
                      typeof cb == 'function' && cb(that.globalData.userInfo);
                  }
              }, 'GET', post_data)
          }, { op: 'info' })
      }  
  },



  /*************************************************
   * 获取小程序登录用户api接口内容， 
   * openID，session_kry,
   * 签名验证等 并返回json格式
   *************************************************/
    getPostData: function (cb, postData){
        getApp().getglobalData();
        var that = this;
        var postData = postData != undefined ? postData : {};
        var userInfo = {};
        var openId = wx.getStorageSync('openid');
        wx.login({
            success: function (res){
                var code = res.code;
                postData['code'] = res.code;
                //console.log(postData['code']);
                wx.getUserInfo({
                    success: function (resU) {
                        postData['iv'] = resU.iv;
                        //console.log(postData);
                        postData['encryptedData'] = resU.encryptedData;
                        wx.request({
                            url: that.globalData.appApiUrl +'&op=openUserInfo',
                            data: {
                                code: code,
                                iv: resU.iv,
                                encryptedData: resU.encryptedData
                            },
                            header: {
                                  "Content-Type": "application/json"
                            },
                            method: "GET",
                            success: function (res) {
                                console.log(res);
                                wx.setStorageSync('openid', res.data.data.openId);
                                //console.log(postData);
                                if(res.data.data.openId == '' || undefined || null){
                                    postData['openid'] = openId
                                }else{
                                      postData['openid'] = res.data.data.openId;
                                }
                                
                                var post_data = {};
                                for(var key in postData){
                                    post_data[key] = postData[key];
                                }
                                //console.log(postData);
      
                                //console.log(post_data);
                                typeof cb == 'function' && cb(post_data)
                                
                                wx.setStorageSync('userInfo', postData);
                                // userInfo.memberInfo = res.data.data;
                                // userInfo.openid = res.data.data
                                that.globalData.userInfo = res.data.data;
                           },
                           
                        })
                        
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: '用户授权',
                            content: '拒绝授权将无法体验完整功能，建议打开授权',
                            success: function (res) {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success: function (resp) {
                                            // console.log(resp);
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    },
    

    /**************************************
  * 调用API获取数据
  * 参数说明：
  *   postData - 请求参数
  *************************************/
    getApiData: function (cb, method, postData) {
        var that = this;
        wx.request({
            url: that.globalData.appApiUrl,
            method: method,
            header: method == 'POST' ? { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" } : { "Content-Type": "application/json" },
            data: postData,
            complete: function (res) {
                typeof cb == "function" && cb(res);
            }
        });
    },

  /******************************************************
  * 封装好了的缓存功能
  * 参数说明：
  *  key - 缓存键名
  *  value - 缓存值，不提供此值时表示取得数据；提供null表示要将此缓存删除掉；提供其他非空值表示要缓存的值，会生成缓存
  *  cache_time - 要缓存多长时间，单位：秒，默认永久缓存，只有当 value 不为空值时有效
  *  force_cache - 是否要强制缓存，因为我们系统是会判断是否开启调试模式的，当开启了调试模式时，一切数据都不缓存，此时为了开发调试缓存功能      就需要用到此是否强制缓存
  ******************************************************/
  wxCache: function (key, value, cache_time, force_cache) {
    var value = value != undefined ? value : "";
    var cache_time = cache_time != undefined ? cache_time : 0;
    var force_cache = force_cache != undefined ? force_cache : false;

    var that = this;
    try {
      var isDebug = that.globalData.shopConfig.APP_DEBUG; //是否是调试模式
    } catch (e) {
      var isDebug = 1;
    }

    if (isDebug == undefined) {
      var isDebug = 1;
    }

    var curTime = new Date().getTime()
    if (isDebug == '1' && force_cache == false) return '' //调试模式不使用缓存，但要求强制缓存时才需要缓存
    if (value == '') { //此时为取值
      var tmp = wx.getStorageSync(key) || ''
      if (tmp == '') {
        return ''
      } else {
        if (tmp.etime == 0) { //永久缓存
          return tmp.data
        } else {
          if (tmp.etime > curTime) { //缓存时间大于当前时间，表示可用
            return tmp.data
          } else { //缓存时间小于等于当前时间，表示已过期
            return ''
          }
        }
      }
    } else { //此时为设置值
      if (value == null) { //此时表示清空值
        try {
          wx.removeStorageSync(key)
        } catch (e) {
          // Do something when catch error
        }
      } else { //此时设置缓存
        var cacheData = {}
        var etime = 0
        if (cache_time > 0) { //设置了缓存时间
          etime = curTime + (cache_time * 1000)
        }
        cacheData = {
          "etime": etime,
          "data": value
        }
        wx.setStorageSync(key, cacheData)
      }
    }
  },

  /*********************************************
  * md5方法
  * 参数说明：
  *   str - 要生成md5的原始字符串
  *********************************************/
  md5: function (str) {
    var that = this

    str = that.Utf8Encode(str);
    var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    var chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);

    /* append padding */
    var len = str.length * chrsz
    var x = bin

    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;

      a = that.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = that.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = that.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = that.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = that.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = that.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = that.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = that.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = that.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = that.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = that.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = that.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = that.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = that.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = that.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = that.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = that.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = that.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = that.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = that.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = that.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = that.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = that.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = that.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = that.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = that.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = that.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = that.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = that.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = that.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = that.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = that.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = that.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = that.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = that.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = that.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = that.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = that.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = that.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = that.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = that.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = that.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = that.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = that.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = that.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = that.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = that.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = that.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = that.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = that.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = that.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = that.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = that.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = that.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = that.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = that.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = that.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = that.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = that.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = that.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = that.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = that.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = that.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = that.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = that.safe_add(a, olda);
      b = that.safe_add(b, oldb);
      c = that.safe_add(c, oldc);
      d = that.safe_add(d, oldd);
    }
    var binarray = Array(a, b, c, d);

    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
  },
  Utf8Encode: function (str) {
    var utftext = "";
    for (var n = 0; n < str.length; n++) {
      var c = str.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  md5_cmn: function (q, a, b, x, s, t) {
    var that = this
    return that.safe_add(that.bit_rol(that.safe_add(that.safe_add(a, q), that.safe_add(x, t)), s), b);
  },
  safe_add: function (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  },
  bit_rol: function (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  },
  md5_ff: function (a, b, c, d, x, s, t) {
    var that = this
    return that.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  },
  md5_gg: function (a, b, c, d, x, s, t) {
    var that = this
    return that.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  },
  md5_hh: function (a, b, c, d, x, s, t) {
    var that = this
    return that.md5_cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5_ii: function (a, b, c, d, x, s, t) {
    var that = this
    return that.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
})


