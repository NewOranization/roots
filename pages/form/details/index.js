// pages/form/details/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var id = options.id;
        that.setData({
            id: id
        })
        var data = {
            op: 'details',
            id: id
        };
        that.getAll(data);
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
     * 联系商家
     */
    callShopPhone: function (e) {
        var that = this;
        var phoneNumber = that.data.order.mobile;
        wx.makePhoneCall({
            phoneNumber: phoneNumber,
        })
    },

    /**
   * 取消订单
   */
    cancle: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var data = {
            op: 'cancel',
            id: id
        };
        app.getPostData(function (post_data) {
            app.getApiData(function (res) {
                if(res.data.code == 0){
                    var data = {
                        op: 'details',
                        id: that.data.id
                    }
                    that.getAll(data)
                }
            }, 'GET', post_data)
        }, data)
    },

    /**
   * 取消订单
   */
    navTo: function (e) {
        var that = this;
        var click = e.currentTarget.dataset.click;
        var token = e.currentTarget.dataset.token;
        if(click == 'store'){
            wx.navigateTo({
                url: '/pages/index/shopMenuList/shopMenuList?token=' + token,
            })
        }
        if (click == 'assess') {
            wx.navigateTo({
                url: '/pages/form/assess/index',
            })
        }
        
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 获得订单数据
     */
    getAll: function (data) {
        var that = this;
        app.getPostData(function (post_data) {
            app.getApiData(function (res) {
                that.setData({
                    order: res.data.data
                })
            }, 'GET', post_data)
        }, data)
    }
})