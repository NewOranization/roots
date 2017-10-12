
//获取应用实例
var app = getApp()
Page({
  data: {
    searchData: {},
    historySearch:[],//历史搜索数据
    inputData: ''
  },
  onShow: function (ops) {
    console.log("fffffffffffffffffffff");
    var that = this;
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          searchData: res.data.data,
          historySearch: res.data.data.historySearch
        })
        console.log(res.data.data.historySearch);
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'searchPage', });
  },
  onLoad: function () {
    var that = this;
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          searchData: res.data.data,
          historySearch: res.data.data.historySearch
        })
        console.log(res.data.data.historySearch);
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'searchPage', });
  },
  backNearBy:function(){
    wx.navigateBack();
  },
  bindblur: function (e) {
    var that = this;
    that.setData({//获取并设置搜索框输入的值
      inputData: e.detail.value
    })
  },
  btnSearch: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/index/searchResult/searchResult?inputData=' + that.data.inputData
    })
  },
  hotData: function (e) {
    var that = this;
    that.setData({
      inputData: e.currentTarget.dataset.hot
    })
    wx.navigateTo({
      url: '/pages/index/searchResult/searchResult?inputData=' + that.data.inputData
    })
  },
  historyData: function (e) {
    var that = this;
    that.setData({
      inputData: e.currentTarget.dataset.history
    })
    wx.navigateTo({
      url: '/pages/index/searchResult/searchResult?inputData=' + that.data.inputData
    })
  },
  cleanHistory:function(){
    var that=this;
    var cleanData={
      ac:'homepage', 
      op:'cleanHistory',
      //openid默认请求的时候在默认参数post_data里已经被传过去了
    }
    app.getPostData(function (post_data) {
      app.getApiData(function (res) {
        that.setData({
          historySearch:res.data.data
        })
      }, 'GET', post_data)
    }, cleanData)
  }
})
