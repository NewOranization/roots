// pages/form/details/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          cartData: res.data.data
        })
        console.log(res.data.data)
      }, 'GET', post_data)
    }, { ac: 'cart', op: 'cartList'});
  },
  toShop:function(e){
    var token= e.currentTarget.dataset.token;
    wx.navigateTo({
      url: '../index/shopMenuList/shopMenuList?token=' + token
    })
  },
  clear: function (e) {
    var that = this;
    var token = e.currentTarget.dataset.token;
    wx.showModal({
      title: '提示',
      content: '您确定要删除此单吗？',
      success:function(res){
        if (res.confirm) {//用户点击确定，删除对应数据并重新请求购物车数据
          app.getPostData(function (post_data) {
            app.getApiData(function (res) {
              app.getPostData(function (post_data) {//删除成功之后重新请求数据
                app.getApiData(function (res) {
                  that.setData({
                    cartData: res.data.data
                  })
                }, 'GET', post_data)
              }, { ac: 'cart', op: 'cartList' });
            }, 'GET', post_data)
          }, { ac: 'homepage', op: 'eliminateCart', push_token: token });
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log('kkk')
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
  }
})