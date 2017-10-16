// pages/mine/address/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      addressList: [],
      isEmpty: false,
      click: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var click = options.click;
      that.setData({
          click: click
      })
      wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 10000,
            mask: true
      })
      that.getAll();
      
  },

  /**
   * 设置默认地址
   */
  setDefaultAddress: function (e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var is_default = e.currentTarget.dataset.is_default;
      is_default = is_default == '0' ? '1' : '0';
      var data = {
          op: 'is_default',
          id: id,
          is_default: is_default
      }
      //console.log(id);
      
      app.getPostData(function (post_data) {
          app.getApiData(function (res) {
              wx.showToast({
                  title: '设置成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true
              })
              that.getAll();
          }, 'GET', post_data)
      }, data)
     
  },
  
  /**
   * 删除地址
   */
  deleteAddress: function (e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var data = {
          op: 'del',
          id: id
      }
      wx.showModal({
          title: '确定要删除该条地址吗?',
          success: function (res){
              if(res.confirm){
                  app.getPostData(function (post_data){
                     app.getApiData(function (res){
                        console.log(res);
                        that.getAll();
                     }, 'GET', post_data)
                  }, data)
                  wx.showToast({
                      title: '删除成功',
                      icon: 'success'
                  })
              }
          }
      })
  },


  /**
   * 请求所有地址数据
   */
  getAll: function (e) {
      var that= this;
      var data = {
            op: 'address'
      }
      app.getPostData(function (post_data){
            app.getApiData(function (res){
                if(res.data.code == 0){
                    wx.hideToast();
                    var addressList = res.data.data;
                    //console.log(addressList.length);
                    if(addressList.length == 0){
                        that.setData({
                            addressList: addressList,
                            isEmpty: true
                        })
                    } else{
                        that.setData({
                            addressList: addressList
                        }) 
                    }
                    
                }     
            }, 'GET', post_data)
      }, data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var that = this;
      that.getAll();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 跳转页面
   */
  navTo: function (e) {
    var that = this;
    var click = e.currentTarget.dataset.click;
    var id = e.currentTarget.dataset.id;
    var index = parseInt(e.currentTarget.dataset.index);
    if(click == 'addAddress' ||  'editAddress'){
        wx.navigateTo({
            url: 'addAddress?click=' + click + '&id=' + id
        })
    }
    
  },

  /**
   * 下单页跳转选择地址
   */
  chooseAddress: function (e){
      var that = this;
      var click = e.currentTarget.dataset.click;
      var index = parseInt(e.currentTarget.dataset.index);
      if(click != that.data.click) return
      wx.setStorageSync('address', that.data.addressList[index]);
      wx.navigateBack({
          delta: 1
      })
  }
})