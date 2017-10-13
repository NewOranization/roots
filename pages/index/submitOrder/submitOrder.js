var app = getApp();
Page({
    
  data: {
<<<<<<< HEAD
    time: '12:01',
    submitData:{},
    addressLen:0,
    boxShow:false,
    curSelTime:'',
    curDate:'',
    reMarkValue:'',
    push_token:'',
    oldPrice:0
=======
    cartsData: [],
    address: '',
>>>>>>> a243d64ab455d91b1b8ed86e1ce3d859bd538fb7
  },


  onLoad: function (options) {
    var that = this;
<<<<<<< HEAD
    wx.getStorage({
      key: 'toSubmitData',
      success: function (res) {
        that.setData({
          push_token: res.data.push_token,
          oldPrice: res.data.oldPrice
        })
        var data = {
          ac: 'handleorder',
          op: 'orderCart',
          push_token: res.data.push_token,
          goodsInfo: res.data.goodsInfo,
          oldPrice: res.data.oldPrice
        }
        app.getPostData(function (post_data) {//请求提交订单数据
          app.getApiData(function (res) {
            console.log(res.data.data);
            that.setData({
              submitData:res.data.data,
              addressLen: res.data.data.address.length
=======
    var cartsData = wx.getStorageSync('cartsData');
    var token = wx.getStorageSync('token');
    var totalPrice = wx.setStorageSync('totalPrice', totalPrice);
    var goodsInfo = [];

    for (var i = 0; i < cartsData.length; i++) {
        if (cartsData[i].cartNum > 0) {
            goodsInfo.push({
                gid: cartsData[i].id,
                num: cartsData[i].cartNum
>>>>>>> a243d64ab455d91b1b8ed86e1ce3d859bd538fb7
            })
        }
    };

    var data = {
        ac: 'handleorder',
        op: 'orderCart',
        push_token: token,
        goodsInfo: goodsInfo,
        oldPrice: totalPrice,
    }
    app.getPostData(function (post_data) {
        app.getApiData(function (res) {
            console.log(res)
        }, 'GET', post_data)
    }, data)
    
  },
<<<<<<< HEAD
  //页面跳转函数
  toNext:function(e){
    var that=this;
    var click = e.currentTarget.dataset.click;
    var next = e.currentTarget.dataset.next;
    console.log(click);
    console.log(next);
    if (next=='address'){
      wx.navigateTo({
        url: '/pages/mine/address/index?click='+click
      })
    } else if (next == "quan") {
      console.log("hahaha");
      wx.navigateTo({
        url: '/pages/index/coupon/coupon?push_token' + that.data.push_token + '&oldPrice' + that.data.oldPrice
      })
    } else if (next == "hongbao") {
      wx.navigateTo({
        url: '/pages/index/hongbao/hongbao'
      })
    }else if (next =="ReMark"){
      wx.navigateTo({
        url: '/pages/index/reMark/reMark'
      })
    } 
  }
=======

>>>>>>> a243d64ab455d91b1b8ed86e1ce3d859bd538fb7
})