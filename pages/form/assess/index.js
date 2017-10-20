// pages/form/assess/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [1,1,1,0.7,-1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getStars: function (e) {
      var num = parseInt(e.detail.value)/10;
      console.log(num);
  },
  shopstars: function (num) {
      var that = this;
      var star = [];
      for (var i = 1; i <= 5; i++) {
          if (num - i >= 0) {
              star.push(1);
          } else if (num - i > -1 && num - i <= -0.8) {
              star.push(0.2);
          } else if (num - i > -0.8 && num - i <= -0.65) {
              star.push(0.3);
          } else if (num - i > -0.65 && num - i <= -0.35) {
              star.push(0.5);
          } else if (num - i > -0.35 && num - i <= -0.2) {
              star.push(0.7);
          } else if (num - i > -0.2 && num - i < 0) {
              star.push(0.8);
          }else {
              star.push(-1);
          }
      }
      return star
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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