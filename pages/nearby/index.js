//index.js
//获取应用实例
var app = getApp();
var page = 1;
Page({
  data: {
    isLoading: false,
    headTitle: '附近商家',
    shopdata: {},
    show1: false,
    show2: false,
    show3: false,
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var data = {
            ac: 'homepage',
            op: 'store'
        }
        that.getAll(data)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    

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

    /**
     * 点击展开分类
     */
    openList: function (e){
        var that = this;
        var nav = e.currentTarget.dataset.nav;
        console.log(nav)
        if(nav == 1){
            that.setData({
                show1: !that.data.show1,
                show2: false,
                show3: false
            })
        }
        if (nav == 2) {
            that.setData({
                show2: !that.data.show2,
                show1: false,
                show3: false
            })
        }
        if (nav == 3) {
            that.setData({
                show3: !that.data.show3,
                show2: false,
                show1: false
            })
        }
    },

    /**
     * 获得全部数据
     */
    getAll: function (data, page) {
        var that = this;
        app.getPostData(function (post_data){
            app.getApiData(function (res){
                if(res.data.code == 0){
                    var shopdata = res.data.data;
                    var length = shopdata.store.length;
                    that.setData({
                        shopdata: shopdata
                    })
                //     if (res.data.code == 0) {
                //         if (page > 1) {
                //             if (length >= 10) {
                //                 that.data.shopdata.store.concat(shopdata.store)
                //                 that.setData({
                //                     shopdata: shopdata,
            
                //                 })
                //             } else {
                //                 that.data.shopdata.store.concat(shopdata.store)
                //                 that.setData({
                //                     shopdata: shopdata,

                //                 })
                //             }
                //         } else {
                //             if (length == 0) {
                //                 that.setData({
                //                     empty: true
                //                 })
                //             } else if (length >= 10) {
                //                 that.setData({
                //                     shopdata: shopdata,
                //                     isLoading: false,
                //                 })
                //             } else {
                //                 that.setData({
                //                     shopdata: shopdata,
                //                     isLoading: false,
                //                 })
                //             }
                //         }
                //     }
                }
            },'GET', post_data)
        }, data)
    },

})
