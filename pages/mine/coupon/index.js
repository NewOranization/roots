// pages/mine/coupon/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: [],
    isHave: true,
    status: 1,
    click:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.setData({
          clicks: clicks,
      })
      var data = {
         status: 1,
         op: 'coupon'
      }
      that.getAll(data);
  },

  /**
   * 优惠券状态切换
   */
  tabSwitch: function (e) {
      var that = this;
      var status = e.currentTarget.dataset.status;
      that.setData({
          status: status
      })
      var data = {
          op: 'coupon',
          status: status
      }
      that.getAll(data);
  },


  /**
   * 跳转页面函数
   */
  navTo: function (e){
      var click = e.currentTarget.dataset.click;
      var clicks = that.data.clicks;
      var id = e.currentTarget.dataset.id;
      if(click == 'back'){
          wx.navigateBack({
              delta: 1
          })
      }
      if (click == 'token') {
          wx.navigateTo({
              url: '/pages/index/shopMenuList/shopMenuList?id=' + id,
          })
      }
  },


  /**
   * 封装请求全部数据
   */
  getAll: function (data) {
     var that = this;
     app.getPostData(function (post_data){
        app.getApiData(function (res){
            //console.log(res)
            if(res.data.code == 0){
                that.setData({
                    coupon: res.data.data
                })
            }
        }, 'GET', post_data)
     }, data)

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
  
  },
})