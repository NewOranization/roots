var app = getApp();
Page({
    data: {
        orderInfo: {},
        address: '',
        show: false,
        times: '尽快送达',
        payMethod: 'wechat'
    },

    onLoad: function (options) {
        var that = this;
        var token = wx.getStorageSync('token');
        var cartsData = wx.getStorageSync('cartsData');
        var totalPrice = wx.getStorageSync('totalPrice');
        var goodsInfo = [];
        that.setData({
            token: token
        })

        console.log(cartsData);
        for (var i = 0; i < cartsData.length; i++) {
            if (cartsData[i].cartNum > 0) {
                goodsInfo.push({
                    gid: cartsData[i].id,
                    num: cartsData[i].cartNum
                })
            }
        }

        var data = {
            ac: 'handleorder',
            op: 'orderCart',
            push_token: token,
            goodsInfo: goodsInfo,
            oldPrice: totalPrice,
        }
        that.getData(data);
        wx.clearStorageSync();
    },

    onShow: function (){
        var that = this;
        var address = wx.getStorageSync('address');
        console.log(address);
        that.setData({
            address: address
        })
    },

    /**
     * 页面跳转
     */
    navTo: function (e){
        var that = this;
        var click = e.currentTarget.dataset.click;
        
        if(click == 'chooseAddress'){
            wx.navigateTo({
                url: '/pages/mine/address/index?click=' + click,
            })
        }else{
            wx.setStorageSync('oldPrice', that.data.orderInfo.calculation.paid)
            console.log(that.data.orderInfo.calculation.paid)
            wx.navigateTo({
                url: '/pages/index/' + click + '/' + click + '?push_token=' + that.data.token,
            })
        }

    },

    /**
     * 选择送达时间
     */
    showModal: function (e){
        var that = this;
        that.setData({
            show: true
        })
    },

    chooseTime: function (e){
        var that = this;
        var index = parseInt(e.currentTarget.dataset.index);
        that.setData({
            times: that.data.orderInfo.business_hours[index],
            show: false
        })
    },

    hideModal: function (e){
        var that = this;
        that.setData({
            show: false
        })
    },
    
    /**
     * 选择支付方式
     */
    choosePayType: function (e){
        var that = this;
        var index = parseInt(e.currentTarget.dataset.index);
        that.setData({
            payMethod: that.data.orderInfo.payment[index].type,
        })
    },

    /**
     * 下单
     */
    placeOrder: function(e) {
        var that = this;
        var data = {
            ac: 'handleorder',
            op: 'confirmOrder',
            push_token: that.data.token,
            addressId: that.data.address.id,
            deliveryPrice: that.data.orderInfo.otherExpenses.deliveryPrice,
            deliveryTime: that.data.times,
            preferential: that.data.orderInfo.calculation.preferential,
            totalFee: that.data.orderInfo.oldData.oldPrice,
            payment: that.data.payMethod,
            platformFee: that.data.orderInfo.platformFee,
            agentFee: that.data.orderInfo.agentFee,
            discount: that.data.orderInfo.discount
        }
        app.getPostData(function (post_data){
            app.getApiData(function (res){
                console.log(res)
            }, 'GET', post_data)
        }, data)
    },

    /**
     * 获取订单页面信息
     */
    getData: function (data){
        var that = this;
        app.getPostData(function (post_data) {
            app.getApiData(function (res) {
                console.log(res);
                if (res.data.code == 0) {
                    that.setData({
                        orderInfo: res.data.data,
                        address: res.data.data.address
                    })
                }
            }, 'GET', post_data)
        }, data);

    },
})