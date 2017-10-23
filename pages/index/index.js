//index.js
//获取应用实例
var app = getApp();
var page = 1;
var show = false;
// function getRect(that) {
//   setTimeout(function () {
//     wx.createSelectorQuery().select('.shopList').boundingClientRect(function (rect) {
//       that.setData({
//         scrollTop: rect.top
//       })
//       getRect(that)
//     }).exec()
//   }, 500)
// };
Page({
  data: {
    isLoading: true,
    top1: false,
    top2: false,
    top3: false,
    region: ['广东省', '广州市', '海珠区'],//选择地区
    imgUrls: [],
    sortSels: [],
    info:[],
    leftDiscount:{},
    discount:[],
    likeLayout:true,
    likeData: [],
    //商家列表数据
    empty: false,
    isLoading: false,
    onLoading: true,
    isNone: false,
    headTitle: '附近商家',
    length: 0,
    scrollTop: 0,
    shopdata: {},
    store: [],
    nav: 0,
    selected: {
      cid: -1,
      did: -1,
      soid: -1
    }
  },
  onLoad: function (ops) {
    var that = this;
    app.getPostData(function (post_data) {//请求轮播图
      app.getApiData(function (res) {
        that.setData({
          imgUrls: res.data.data
        })
      }, 'GET', post_data)
    }, {ac: 'homepage',op: 'carousel'});
    app.getPostData(function (post_data) {//请求分类选择图标
      app.getApiData(function (res) {
        console.log(res.data.data);
        if(res.data.code == 0){
            that.setData({
                sortSels: res.data.data,
                isLoading: false,
            })
        } 
      }, 'GET', post_data)
    }, {ac: 'homepage',op: 'nav'});
    app.getPostData(function (post_data) {//请求资讯
      app.getApiData(function (res) {
        that.setData({
          info: res.data.data
        })
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'notice' });
    app.getPostData(function (post_data) {//请求优惠信息
      app.getApiData(function (res) {
        console.log(res.data.data);
        if(res.data.data.length==3){
          that.setData({
            leftDiscount: res.data.data[0]
          });
          res.data.data.shift();
          that.setData({
            discount: res.data.data
          });
        }else{
          that.setData({
            discount: res.data.data
          });
        }
        console.log(that.data.discount)
        
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'cube' });
    // -------
    var params = {
      ac: 'homepage',
      op: 'store',
      page: page
    }
    that.getAll(params, page);
    that.setData({
      params: params
    })
    // --------
    wx.request({//请求猜你喜欢
      url: 'https://xcx.szhuanya.cn/web/index.php?c=site&a=entry&do=web&m=we7_wmall&ctrl=Interface',
      data: {
        ac: 'homepage',
        op: 'guessLike'
      },
      success:function(res){
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // getRect(that);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var params = that.data.params;
    console.log(params)

    params['page'] += 1;
    page = params['page'];
    that.getAll(params, page)
  },

  /**
   * 点击展开分类
   */
  openList: function (e) {
    var that = this;
    var nav = e.currentTarget.dataset.nav;
    show = !show
    if (show) {
      if (nav == that.data.nav) {
        show = false;
        that.setData({
          nav: 0
        })

      } else {
        that.setData({
          nav: nav
        })
      }
    } else {
      if (nav != that.data.nav) {
        show = true;
        that.setData({
          nav: nav
        })
      } else {
        that.setData({
          nav: 0
        })
      }
    }
    console.log(show)
    console.log(nav)
  },

  /**
   * 请求分类数据
   */
  getSelectData: function (e) {
    var that = this;
    var params = {
      ac: 'homepage',
      op: 'store',
    };
    var id = e.currentTarget.dataset.id;
    if (that.data.nav == 1) {
      params['cid'] = id;
      params['page'] = 1;
      that.data.selected.cid = id
    }
    if (that.data.nav == 2) {
      params['soid'] = id;
      params['page'] = 1;
      that.data.selected.soid = id
    }
    if (that.data.nav == 3) {
      params['did'] = id;
      params['page'] = 1;
      that.data.selected.did = id
    }
    that.getAll(params);
    that.setData({
      selected: id,
      params: params,
      nav: 0,
      selected: params
    })
  },

  /**
   * 页面跳转
   */
  navTo: function (e) {
    var that = this;
    var click = e.currentTarget.dataset.click;
    console.log(click);
    if (click == 'back') {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/shopMenuList/shopMenuList?push_token=' + click,
      })
    }
  },

  /**
   * 获得全部数据
   */
  getAll: function (params, page) {
    var that = this;
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        if (res.data.code == 0) {
          var shopdata = res.data.data;
          var store = res.data.data.store;
          var length = res.data.data.store.length;
          // that.setData({
          //     shopdata: shopdata
          // })
          if (res.data.code == 0) {
            if (page > 1) {

              if (length >= 10) {
                that.setData({
                  store: that.data.store.concat(store),
                  isLoading: true,
                  isNone: false,
                })
              } else {
                that.setData({
                  store: that.data.store.concat(store),
                  isLoading: false,
                  isNone: true,
                })
              }
            } else {
              if (length == 0) {
                that.setData({
                  empty: true,
                  onLoading: false,
                  isLoading: false,
                  isNone: false,
                  length: length
                })
              } else if (length >= 10) {
                that.setData({
                  shopdata: shopdata,
                  store: store,
                  onLoading: false,
                  isLoading: true,
                  isNone: false,
                  length: length
                })
              } else {
                that.setData({
                  shopdata: shopdata,
                  store: store,
                  onLoading: false,
                  isLoading: false,
                  isNone: false,
                  length: length
                })
              }
            }
          }
        }
      }, 'GET', post_data)
    }, params)
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // **********************************************页面跳转函数
  search: function () {
    wx.navigateTo({
      url: 'search/search'
    })
  },
  toShopMenuList: function (e){
    var that=this;
    var token = e.currentTarget.dataset.token;
    wx.navigateTo({
      url:'shopMenuList/shopMenuList?token='+token
    })
  },
  /**
   ************************************************* tel_tab分类点击
   */
  navBarSwitch: function (e) {
    var that = this;
    var nav = e.currentTarget.dataset.nav;
    that.setData({
      selNav:nav
    })
    if (nav == 1) {
      that.setData({
        top1: !that.data.top1,
        top2: false,
        top3: false
      })
    }
    if (nav == 2) {
      that.setData({
        top2: !that.data.top2,
        top1: false,
        top3: false
      })
    }
    if (nav == 3) {
      that.setData({
        top3: !that.data.top3,
        top2: false,
        top1: false
      })
    }

  },
  layoutSwith:function(){
   var that=this;
   that.setData({
     likeLayout:!that.data.likeLayout
   })
  },
  // ***********************************************请求函数
  toScan:function(){
    wx.scanCode({
      success: function (res) {
        var url = res.result;
        console.log(url);
        wx.navigateTo({
          url:url
        })
      },

      fail: function (res) { 
        wx.showToast({
          icon:'loading',
          title: '该店铺暂不支持扫码功能',
          duration: 1000
        })
      },

      complete: function () {
      }

    })
  },
  sortSel:function(e){
    var that=this;
    var cid = e.currentTarget.dataset.cid;
    app.getPostData(function (post_data) {//分类
      app.getApiData(function (res) {
        wx.setStorage({
          key: "selData",
          data: res.data.data
        })
        wx.switchTab({
          url: '/pages/nearby/index'
        })
        console.log(res.data.data);
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'store',cid:cid});
  }
})
