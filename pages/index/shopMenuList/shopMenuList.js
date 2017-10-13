
var app = getApp();
// page/one/index.js
Page({
  data: {
    token:'',
    status: 1,
    dataList: {},
    store: {},
    toView: '0',
    content: [],
    winHeight: 0,
    click: 'sort0',
    scrollTop: 30,
    show: false,
    notCollar: true,
    totalNum: 0,
    totalPrice: 0,
    current:0,
    evaluate:{},
    price: 0,
  },

  onLoad: function (options) {
    var that = this;
    var token = options.token;
    that.setData({
        token: token
    });
    var data = {
        ac: 'homepage',
        op: 'merchant_commodity',
        push_token: token,
    };
    wx.showToast({
        title: '正在为您拼命加载。。。',
        icon: 'loading',
        duration: 10000,
        mask: true
    })
    that.getData(that, data);
    
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
                winWidth: res.windowWidth,
                winHeight: res.windowHeight
            });
        }
    });
  },

  onShow: function () {//请求"商品"标签页下数据
    var that = this;

    
  },

  /**
   * 商品 评价 商家 客服导航点击跳转
   */
  tabSwitch: function (e) {
      var that = this;
      var data = {};
      var status = e.currentTarget.dataset.status;
      that.setData({
          status: status
      });
      if (status == 2) {
          data = {
              ac: 'homepage',
              op: 'evaluate',
              page: '1',
              count: '10',
              push_token: that.data.token,
              screen: ''
          }
      }
      if(status == 3){
          data = {
              ac: 'homepage',
              op: 'storeInfo',
              push_token: that.data.token,
          }
      }
      that.getData(that, data)
  },
  /**
    * 评价页面
    * 全部 有图 好评等筛选条件点击事件
    */
  swichNav: function (e) {
      var that = this;
      var data = {};
      var current = e.currentTarget.dataset.current;
      that.setData({
          current: current
      });
      data = {
          ac: 'homepage',
          op: 'evaluate',
          page: '1',
          count: '10',
          push_token: that.data.token,
          screen: current
      }
      that.getData(that, data)
  },
  /**
   * 跳转页面函数
   */
  navTo: function (e) {
      var that = this;
      var click = e.currentTarget.dataset.click;
      if (click == 'back') {
          if(status == 1){
             wx.switchTab({
                 url: '/pages/index/index',
             })
          }else{
              that.setData({
                  status: 1
              })
          }
      } else if (click == "order"){
        console.log("ffffffff");
        wx.setStorage({
          key: "toSubmitData",
          data: {
            push_token: that.data.token,
            goodsInfo: that.data.goodsInfo,
            oldPrice: that.data.totalPrice
          }
        })
        wx.navigateTo({
          url: '/pages/index/submitOrder/submitOrder'
        })
      }
  },
  
  /**
   * 楼梯点击切换分类
   */
  tabFloor: function (e){
      var that = this;
      var content = that.data.content;
      var id = e.currentTarget.dataset.id;
      var index = parseInt(e.currentTarget.dataset.index);
      var sid = content[index].sid;
      var scrollTop = 0;
      that.getRect(function (rect){
          //console.log(rect);
          if(index == 0){
              scrollTop = 0;
          }else{
              for (var i = 1; i <= index; i++) {
                  scrollTop += rect[i].height
              }
              console.log(scrollTop);
          }
          
          that.setData({
              toView: id,
              click: id,
              scrollTop: scrollTop
          });
          console.log(that.data.scrollTop);
      });
      //console.log(that.data.nodeHeight);  
  },
  getRect: function (cb) {
      var that = this;
      wx.createSelectorQuery().selectAll('.menu').boundingClientRect(function (rect) {
        //   console.log(rect.height);
        //   that.setData({
        //       nodeHeight: rect.height
        //   })
        //   console.log(that.data.nodeHeight)
        typeof cb == 'function' && cb(rect)
      }).exec()
  },

  /**
   * 点击弹出购物车弹框
   */
  showCart: function (e){
      var that = this;
      var show = that.data.show;
      that.setData({
          show: !show
      })
  },
  
  /**
   * 菜单滚动到一定高度隐藏头部导航
   */
  scroll: function (e){
       var that = this;
       
       var scrollTop = e.detail.scrollTop;
       //console.log(e);
       that.setData({
           scrollTop: scrollTop
       })
  },

  /**
   * 领取代金券
   */
  collarCoupon: function (e){
       var that = this;
       var data = {
           ac: 'homepage', 
           op: 'nav',
           push_token: that.data.token,
           id: that.data.store.coupon.id
       }
       app.getPostData(function (post_data){
           app.getApiData(function (res){
              console.log(res);
              if(res.data.code == 0){
                  wx.showModal({
                      title: '提示',
                      content: '领取成功',
                  })
                  that.setData({
                      notCollar: false
                  })
              }
           }, 'GET', post_data)
       },data)
  },


   /**
   * 点击加号增加商品数量
   */
  plus: function (e){
      var that = this;
      var dataList = that.data.dataList;
      var content = that.data.content;
      var price = that.data.price;
      var id = e.currentTarget.dataset.id;
      var idx = e.currentTarget.dataset.idx;
      var click = e.currentTarget.dataset.click;
      var index = parseInt(e.currentTarget.dataset.index);
      var totalNum = that.data.totalNum;
      var totalPrice = that.data.totalPrice;
      var cartsData = [];
      
      for(var i = 0; i < content.length; i++){  

         if(content[i].id == idx){ 
             //var price = parseFloat(content[i].commodity[index].price);
             if (click == 'plus' && content[i].commodity[index].cartNum <= 99){
                 totalNum++;
                 content[i].commodity[index].cartNum++;
                 //console.log(that.data.dataList.commodity[idx].cartNum);
                 totalPrice += parseFloat(content[i].commodity[index].price);
                 
                 for (var k = 0; k < dataList.commodity.length; k++) {
                     if (dataList.commodity[k].id == id) {
                         dataList.commodity[k].cartNum++;
                         dataList.commodity[k].totalPrice += parseFloat(dataList.commodity[k].price); 
                     }
                 }
                
             } 
             if (click == 'reduce' && content[i].commodity[index].cartNum >= 1) {
                 totalNum--;
                 content[i].commodity[index].cartNum--;
                 totalPrice -= parseFloat(content[i].commodity[index].price);

                 for (var k = 0; k < dataList.commodity.length; k++) {
                     if (dataList.commodity[k].id == id) {
                         dataList.commodity[k].cartNum--;
                         dataList.commodity[k].totalPrice -= parseFloat(dataList.commodity[k].price)
                     }
                 }
             } 
         }
      };

      for (var i = 0; i < dataList.commodity.length; i++){
          if (dataList.commodity[i].id == id){
              if (click == 'cartPlus' && dataList.commodity[i].cartNum < 99){
                  totalNum++;
                  dataList.commodity[i].cartNum++;
                  dataList.commodity[i].totalPrice += parseFloat(dataList.commodity[i].price);

                  for (var k = 0; k < content.length; k++){
                      for (var j = 0; j < content[k].commodity.length; j++)
                      if (content[k].commodity[j].id == id){
                          content[k].commodity[j].cartNum++;
                          totalPrice += parseFloat(content[k].commodity[j].price);
                      }
                  }
              }

              if (click == 'cartReduce' && dataList.commodity[i].cartNum >= 1) {
                  totalNum--;
                  dataList.commodity[i].cartNum--;
                  dataList.commodity[i].totalPrice -= parseFloat(dataList.commodity[i].price);

                  for (var k = 0; k < content.length; k++) {
                      for (var j = 0; j < content[k].commodity.length; j++)
                          if (content[k].commodity[j].id == id) {
                              content[k].commodity[j].cartNum--;
                              totalPrice -= parseFloat(content[k].commodity[j].price);
                          }
                  }
              }
          }
      };

      if(click == 'empty'){
          for (var i = 0; i < dataList.commodity.length; i++){
              totalNum = 0;
              totalPrice = 0;
              dataList.commodity[i].cartNum = 0;
              dataList.commodity[i].totalPrice = 0;
          }
          for (var j = 0; j < content.length; j++) {
              for (var k = 0; k < content[j].commodity.length; k++) {
                  content[j].commodity[k].cartNum = 0;
              }
          }
      }
      totalPrice = parseFloat(totalPrice.toFixed(2));
      wx.setStorageSync('cartsData', dataList.commodity);
      wx.setStorageSync('token', dataList.store.push_token);
      wx.setStorageSync('totalPrice', totalPrice);

      that.setData({
          dataList: dataList,
          content: content,
          totalNum: totalNum,
          totalPrice: totalPrice,
      })
  },
  
  /**
   * 封装请求商品列表数据
   */
  getData: function (that, data){
      var that = this;
      
      app.getPostData(function (post_data){
          app.getApiData(function (res) {
              if(res.data.code == 0){
                  wx.hideToast();
                  if (res.data.data.category){
                      for (var i = 0; i < res.data.data.category.length; i++) {
                          res.data.data.category[i]['cid'] = "sort" + i;
                          res.data.data.category[i]['sid'] = "mark" + i;
                      }
                  }
                  
                  that.setData({
                      dataList: res.data.data,
                      content: res.data.data.category
                  })
                  //console.log(that.data.content)
              }
              
              
          }, 'GET', post_data)
      }, data)
  },



})
