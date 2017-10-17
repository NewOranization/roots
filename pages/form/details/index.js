// pages/form/details/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     var id = options.id;
     var data = {
         op: 'details',
         id: id
     };
     that.getAll(data);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
   * 获得订单数据
   */
  getAll: function (data) {
      var that = this;
      app.getPostData(function (post_data){
          app.getApiData(function (res){
             that.setData({
                 order: res.data.data
             })
          }, 'GET', post_data)
      },data)
  }
})