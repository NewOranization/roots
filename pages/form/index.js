// pages/mine/myform/form.js
var app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: false,
    formList: [],
    isLoading: false,
    onLoading: true,
    isNone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var data = {
          op: 'order'
      }
      that.getAll(data);
      //console.log(that.data.formList)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
      var that = this;
      var data = {
          op: 'order'
      }
      that.getAll(data);
      console.log('aas ')
  },

  /**
   * 取消订单
   */
  cancle: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var data = {
        op: 'cancel',
        id: id
    };
    app.getPostData(function (post_data){
        app.getApiData(function (res){
            if(res.data.code == 0){
                var data = {
                    op: 'order'
                }
                that.getAll(data)
            }
        }, 'GET', post_data)
    }, data)
  },

  /**
   * 跳转
   */
  navTo: function (e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var click = e.currentTarget.dataset.click;
      var token = e.currentTarget.dataset.token;
      if(click == 'runleg'){
          wx.switchTab({
              url: '/pages/runleg/index',
          })
      }
      if (click == 'detail') {
          wx.navigateTo({
              url: '/pages/form/details/index?id=' + id,
          })
      }
      if (click == 'placeOrder'){
          wx.navigateTo({
              url: '/pages/index/shopMenuList/shopMenuList?token=' + token,
          })
      }
      
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
    page += 1;
    var data = {
        op: 'order',
        page: page
    };

    that.getAll(data, page);
  },

  /**
   * 获取订单数据
   */
  getAll: function (data, page) {
     var that = this;
     app.getPostData(function (post_data){
         app.getApiData(function (res){
             var formList = res.data.data;
             for(var i = 0; i < formList.length; i++){
                 formList[i].goodsTitle = formList[i].goodsTitle.replace(/ /g, '+');
             }
             
             var length = formList.length;
             if(res.data.code === 0){
                 if(page > 1){
                     if(length >= 10){
                         that.setData({
                             formList: that.data.formList.concat(formList),
                             isLoading: true,
                             isNone: false,
                         })
                     }else{
                         that.setData({
                             formList: that.data.formList.concat(formList),
                             isLoading: false,
                             isNone: true
                         })
                     }
                 }else{
                     if(length === 0){
                         that.setData({
                             empty: true
                         })
                     }else if(length >= 10){
                         that.setData({
                             formList: formList,
                             onLoading: false,
                             isLoading: true,
                             isNone: false,
                         })
                     }else{
                         that.setData({
                             formList: formList,
                             onLoading: false,
                             isLoading: false,
                             isNone: true,
                         })
                     }
                 }
             }
         }, 'GET', post_data)
     }, data)
  },

//   /**
//    * 上拉加载更多封装
//    */
//   loadMore: function (e){
//       var that = this;
//       var data = {
//           op: 'order',
//           p: p
//       }
//       app.getPostData(function (post_data){
//           app.getApiData(function (res){
             
//           }, 'GET', post_data)
//       }, data)
//   }

})