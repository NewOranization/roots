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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var cid = wx.getStorageSync('cid');
    // if(cid) return
    // var params = {
    //   ac: 'homepage',
    //   op: 'store',
    //   page: page
    // }
    
    // that.getAll(params, page);
    // that.setData({
    //   params: params
    // })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var cid = wx.getStorageSync('cid');
    var params = {
      ac: 'homepage',
      op: 'store',
      page: 1
    }
    if (cid) {
      params['cid'] = cid;
      that.setData({
        store:[]
      })
      that.getAll(params, page);
      wx.clearStorageSync();
    }else{
      that.getAll(params, page);
      that.setData({
        params: params
      })
    }
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

  toShopMenuList: function (e) {
    console.log('啊啊啊啊啊啊啊')
    var that = this;
    var click = e.currentTarget.dataset.click;
    wx.navigateTo({
      url: '/pages/index/shopMenuList/shopMenuList?token=' + click
    })
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
   * 获得全部数据
   */
  getAll: function (params, page) {
    var that = this;
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        console.log(res.data.data);
        if (res.data.code == 0) {
          var shopdata = res.data.data;
          var store = res.data.data.store;
          var length = res.data.data.store.length;
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
      }, 'GET', post_data)
    }, params)
  },

})
