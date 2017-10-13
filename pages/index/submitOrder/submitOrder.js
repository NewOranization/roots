var app = getApp();
Page({
    
  data: {
    cartsData: [],
    address: '',
  },


  onLoad: function (options) {
    var that = this;
    var cartsData = wx.getStorageSync('cartsData');
    var token = wx.getStorageSync('token');
    var totalPrice = wx.setStorageSync('totalPrice', totalPrice);
    var goodsInfo = [];

    for (var i = 0; i < cartsData.length; i++) {
        if (cartsData[i].cartNum > 0) {
            goodsInfo.push({
                gid: cartsData[i].id,
                num: cartsData[i].cartNum
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

})