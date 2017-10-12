// pages/mine/balance/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
     
      var balance = wx.getStorageSync('balance');
      if(balance != ''){
          that.setData({
              balance: balance
          })
          wx.clearStorageSync();
      } else{
          var data = {
              op: 'credit'
          }
          app.getPostData(function (post_data) {
              app.getApiData(function (res) {
                  //console.log(res)
                  var balance = res.data.data.credit1;
                  wx.setStorageSync('balance', balance)
                  that.setData({
                      balance: balance
                  })
              }, 'GET', post_data)
          }, data)
      }
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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

  /**
   * 余额充值
   */
  recharge: function (e) {
    wx.showModal({
        title: '提示',
        content: '充值功能暂未开放，敬请期待',
    })
    // wx.requestPayment({
    //     timeStamp:'',
    //     nonceStr: '',
    //     package: '',
    //     signType: '',
    //     paySign: '',
    //     success: function (res){
    //         console.log(res);
    //     }
    // })  
  }
})