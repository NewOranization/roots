// pages/mine/myform/form.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    empty: false,
    formList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.getAll();
      //console.log(that.data.formList)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
      var that = this;
    //   that.setData({
    //       formList: that.data.formList.concat(that.data.formList)
    //   })
      that.getAll();
  },

  /**
   * 跳转到订单详情页面
   */
  navTo: function (e) {
    wx.navigateTo({
        url: '/pages/form/details/index',
    })  
  },

  kkk: function (e){
    console.log('haohaohaohaoha')
  },

  /**
   * 订单状态点击切换
   */
  tabSwitch: function (e){
    var that = this;
    var status = e.currentTarget.dataset.status;
    that.setData({
        status: status
    })
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
   * 页面上拉触底事件的处理函数
   */
  getAll: function () {
     var that = this;
     app.getPostData(function (post_data){
         app.getApiData(function (res){
             console.log(res);
             if(res.data.code == 0){
                 that.setData({
                     formList: res.data.data
                 })
             }
         }, 'GET', post_data)
     }, {op: 'order'})
  },

})