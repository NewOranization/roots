// pages/mine/collection/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
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
   * 处理商家评分星星个数
   */
  shopstars: function (num){
      var that = this;
      var star = [];
      for(var i = 1; i <= 5; i++){
         if(num - i >= 0){
             star.push(1);
         }else if(num - i > -1 && num - i < 0){
             star.push(0);
         }else{
             star.push(-1);
         }
      }
      return star
  },

  /**
   * 获取全部数据
   */
  getAll: function () {
     var that = this;
     app.getPostData(function (post_data){
         app.getApiData(function (res){
             var shopList = res.data.data;
             for(var i = 0; i < shopList.length; i++){
                 shopList[i]['stars'] = that.shopstars(shopList[i].storeStars);
             }
             console.log(shopList);
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