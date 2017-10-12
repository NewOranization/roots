var app = getApp();
Page({
  data: {
    time: '12:01',
    submitData:{},
    addressLen:0,
    boxShow:false,
    curSelTime:'',
    curDate:'',
    reMarkValue:''
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'toSubmitData',
      success: function (res) {
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
            })
          }, 'GET', post_data)
        }, data);
      }
    })
    console.log(that.data.submitData)
  },
  toSelTime:function(){
    var that = this;
    var curDate = new Date();
    that.setData({
      boxShow: true,
      curDate: curDate.toLocaleDateString()
    })
  },
  clickTime:function(e){
    var that=this;
    that.setData({
      boxShow:false,
      curSelTime: e.currentTarget.dataset.time
    })
  },
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
        url: '/pages/index/coupon/coupon'
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
})