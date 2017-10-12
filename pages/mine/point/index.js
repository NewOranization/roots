// pages/mine/point/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    isNone: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {
        op: 'credita'
    }
    app.getPostData(function (post_data){
        app.getApiData(function (res){
            var point = parseInt(res.data.data.credit2);
            that.setData({
                point: point
            })
        }, 'GET', post_data)
    }, data)
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
   * 积分兑换商品
   */
  exchange: function (e) {
    var that = this;
    var point = that.data.point;
    //console.log(point);
    if(point == 0) return;
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})