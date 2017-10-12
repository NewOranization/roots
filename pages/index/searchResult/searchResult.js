
//获取应用实例
var app = getApp()
Page({
  data: {
    inputData: '',
    searchResult:{}
  },
  
  onLoad: function (ops) {
    var that = this;
    that.setData({
      inputData: ops.inputData
    })
    var searchRequestData = {
      ac: 'homepage',
      op: 'searchResult',
      content: that.data.inputData
    }
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        console.log(res.data.data);
        that.setData({
          searchResult: res.data.data
        })
      }, 'GET', post_data)
    }, searchRequestData)
  },
  backImg: function () {
    wx.navigateBack();
  },
  gotoBusiness:function(e){
    var that = this;
    var token = e.currentTarget.dataset.token;
    wx.navigateTo({
      url: '/pages/index/shopMenuList/shopMenuList?token=' + token
    })
  }
})
