// pages/mine/address/addAdress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      checked: false,
      is_default: '0',
      userName: '',
      phoneNumber: '',
      address: '',
      detailAddress: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var click = options.click;
      var id = options.id;
      //console.log(click);
      that.setData({
          click : click,
          id: id
      })
      if (click == 'editAddress'){
          app.getPostData(function (post_data){
              app.getApiData(function (res){
                 //console.log(res)
                  var userName = res.data.data.userName;
                 var phoneNumber = res.data.data.mobile;
                 var address = res.data.data.address;
                 var detailAddress = res.data.data.detailAddress;
                 
                 that.setData({
                     userName: userName,
                     phoneNumber: phoneNumber,
                     address: address,
                     detailAddress: detailAddress,
                 })
              }, 'POST', post_data)
          },{id: id, op: 'update'})
      }
  },
  
  /**
   * 保存收货人
   */
  getUser: function (e) {
      var that = this;
      var userName = e.detail.value;
      that.setData({
          userName: userName
      })
  },

  /**
   * 保存电话号码
   */
  getPhone: function (e) {
      var that = this;
      var phoneNumber = e.detail.value;
      var reg = /^1[0-9]{10}$/;
      if (!reg.test(phoneNumber)){
          wx.showToast({
              title: '请填写正确的手机号码格式',
          })
          return
      }
      that.setData({
          phoneNumber: phoneNumber
      })
  },

  /**
   * 选择地址
   */
  chooseAddress: function (e) {
      var that = this;
      var address;
      var names;
      var location_x;
      var location_y;
      wx.chooseLocation({
          success: function (res) {
              //console.log(res);
              address = res.address + res.name;
              location_x = res.latitude;
              location_y = res.longitude;
              that.setData({
                  address: address,
                  location_x: location_x,
                  location_y: location_y,
              })
              //console.log(names);
          }
      })
      //console.log(address)
  },

  /**
   * 保存手写详细地址
  */
  getDetailAddress: function (e) {
      var that = this;
      var detailAddress = e.detail.value;
      that.setData({
          detailAddress: detailAddress
      })
    
      //console.log(detailAddress);
  },

  /**
   * 设为默认
  */
  setDefault: function (e){
      var that = this;
      var is_default;
      var checked;
      checked = !that.data.checked;
      is_default = checked == true ? '1' : '0';
      console.log(is_default);
      that.setData({
          checked: checked,
          is_default: is_default
      })
      //var isDefault = e.detail.value;
    //   if (checked == true){
    //       is_default = '1'
    //       that.setData({
    //           is_default: is_default
    //       })
    //   } 
    //   if(checked == false){
    //       is_default = '0'
    //       that.setData({
    //           is_default: is_default
    //       })
      //}
      
  },


  /**
   * 返回地址列表页
   */
  backTo: function (e) {
      wx.navigateBack({
          delta: 1
      })
  },


  /**
   * 提交新增地址及编辑地址保存 
   */
  saveAddress: function (e){
      var that = this;
      var click = that.data.click;
      var userName = e.detail.value.userName;
      var phoneNumber = e.detail.value.phoneNumber;
      var address = that.data.address;
      var detailAddress = e.detail.value.detailAddress;
      var is_default = that.data.is_default;
      var location_x = that.data.location_x;
      var location_y = that.data.location_y;
      var op = '';
      var id;
      
      //console.log(is_default);
      if (click == 'addAddress'){
          op = 'add';
          id = '';
      }
      if (click == 'editAddress'){
          op = 'updates';
          id = that.data.id;
      }
      var data = {
            op: op,
            id: id,
            userName: userName,
            mobile: phoneNumber,
            address: address,
            detailAddress: detailAddress,
            is_default: is_default,
            location_x: location_x,
            location_y: location_y
      };
      //console.log(data)
      var addressInfo = {};
      addressInfo['userName'] = userName;
      addressInfo['phoneNumber'] = phoneNumber;
      addressInfo['address'] = address;
      addressInfo['detailAddress'] = detailAddress;
      console.log(addressInfo);
      for (var key in addressInfo){
          if (addressInfo[key] == ''){
              wx.showToast({
                  title: '请填写完整地址',
                  duration: 1000,
                  mask: true,
              });
              return false
          }
      }
      wx.showToast({
          title: '正在提交',
          icon: 'loading',
          duration: 2000,
          mask: true,
      });
      app.getPostData(function (post_data) {
          app.getApiData(function (res) {
              //console.log(res);
              if(res.data.code == 0){
                  wx.hideToast();
                  wx.navigateTo({
                      url: '/pages/mine/address/index',
                  })
              }
             
          }, 'POST', post_data)
      }, data)        
    
  },

  /**
   * 删除地址
   */
  deleteAddress: function (e) {
      var that = this;
      var id = that.data.id;
      var data = {
          op: 'del',
          id: id
      }
      wx.showModal({
          title: '确定要删除该条地址吗?',
          success: function (res) {
              if (res.confirm) {
                  app.getPostData(function (post_data) {
                      app.getApiData(function (res) {
                          console.log(res);
                      }, 'GET', post_data)
                  }, data)
                  wx.showToast({
                      title: '删除成功',
                      icon: 'success'
                  })
              }
          }
      })
      wx.navigateBack({
          delta: 1
      })
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
})