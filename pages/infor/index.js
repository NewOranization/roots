//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [],
    list:[]
  },
  onLoad:function(ops){
    var that=this;
    app.getPostData(function (post_data) {//请求轮播图
      app.getApiData(function (res) {
        console.log(res.data.data)
        that.setData({
          imgUrls: res.data.data.carousel,
          list:res.data.data.list
        })
      }, 'GET', post_data)
    }, { ac: 'news', op: 'newList' });
  },
  toInforDetail:function(e){
    var nid = e.currentTarget.dataset.nid;
    console.log(nid);
    wx.navigateTo({
      url: './inforDetail/inforDetail?nid=' + nid
    })
  }
})