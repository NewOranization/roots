// pages/mine/myform/form.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    empty: false,
    formList: [
        {
            url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3798126124,2283897759&fm=27&gp=0.jpg",
            shopname: "私家小厨",
            formtime: "2017-3-21 18:05",
            dishes: "青椒肉丝盖浇饭",
            price: "19.00",
            state: 1
        }, {
            url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3311942753,590438962&fm=27&gp=0.jpg",
            shopname: "油瓶川菜",
            formtime: "2017-7-25 18:00",
            dishes: "金汤肥牛",
            price: "29.00",
            state: 2
        }, {
            url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3561330097,3964536810&fm=11&gp=0.jpg",
            shopname: "肯德基",
            formtime: "2017-8-11 10:30",
            dishes: "肯德基全家桶",
            price: "49.00",
            state: 1
        }, {
            url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4177982341,1891409126&fm=27&gp=0.jpg",
            shopname: "七把叉餐饮",
            formtime: "2017-8-19 17:30",
            dishes: "麻辣香锅培根-米饭（300克）等两件商品",
            price: "14.00",
            state: 3
        }
    ]
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
      console.log(that.data.formList)
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
             console.log(res)
         }, 'GET', post_data)
     }, {op: 'order'})
  },

})