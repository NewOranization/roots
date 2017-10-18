// pages/mine/collection/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    stars: [1,1,1,1,1],
    isHave: true,
    shopList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      that.getAll();
  },
  
  /**
   * 收藏内容状态切换
   */
  tabSwitch: function (e) {
      var that = this;
      var status = e.currentTarget.dataset.status;
    //   that.setData({
    //       status: status
    //   })
      if(status == 1 || 2){
          that.setData({
              isNone: true, 
              status: status
          })
      }else{
          that.setData({
              isNone: false,
              status: status
          })
      }

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
   * 获取全部数据
   */
  getAll: function () {
     var that = this;
     app.getPostData(function (post_data){
         app.getApiData(function (res){
             var shopList = res.data.data;
             if(res.data.code == 0){
                 if(shopList.length == 0){
                     that.setData({
                         isHave: false,
                     })
                 }else{
                     that.setData({
                         shopList: shopList,
                         isHave: true
                     })
                 }  
             }
         }, 'GET', post_data)
     }, { op: 'favorite'})
  },
})