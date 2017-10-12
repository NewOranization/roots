//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    top1: false,
    top2: false,
    top3: false,
    region: ['广东省', '广州市', '海珠区'],//选择地区
    imgUrls: [],
    sortSels: [],
    info:[],
    leftDiscount:{},
    discount:[],
    industry:[],//商家分类
    sort:[],//智能排序
    discountActive:[],//优惠活动
    stars:5,
    sortIcon:[
      '/imgs/sortIcon/balance.png',
      '/imgs/sortIcon/clock.png',
      '/imgs/sortIcon/hot-sale.png',
      '/imgs/sortIcon/myaddress.png',
      '/imgs/sortIcon/star.png'
    ],
    discountIcon:[
      '/imgs/discountIcon/fan.png',
      '/imgs/discountIcon/jian.png',
      '/imgs/discountIcon/mian.png',
      '/imgs/discountIcon/piao.png',
      '/imgs/discountIcon/quan.png',
      '/imgs/discountIcon/shou.png',
      '/imgs/discountIcon/te.png',
    ],
    shopInfo:[],
    wrap:true,
    likeLayout:true,
    likeData:[]
  },
  onLoad: function (ops) {
    var that = this;
    app.getPostData(function (post_data) {//请求轮播图
      app.getApiData(function (res) {
        that.setData({
          imgUrls: res.data.data
        })
      }, 'GET', post_data)
    }, {ac: 'homepage',op: 'carousel'});
    app.getPostData(function (post_data) {//请求分类选择图标
      app.getApiData(function (res) {
        console.log(res.data.data);
        that.setData({
          sortSels: res.data.data
        })
      }, 'GET', post_data)
    }, {ac: 'homepage',op: 'nav'});
    app.getPostData(function (post_data) {//请求资讯
      app.getApiData(function (res) {
        that.setData({
          info: res.data.data
        })
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'notice' });
    app.getPostData(function (post_data) {//请求优惠信息
      app.getApiData(function (res) {
        that.setData({
          leftDiscount: res.data.data[0]
        });
        res.data.data.shift();
        that.setData({
          discount: res.data.data
        });
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'cube' });
    app.getPostData(function (post_data) {//请求筛选导航列表
      app.getApiData(function (res) {
        that.setData({
          industry: res.data.data.nav,
          sort: res.data.data.sort,
          discountActive: res.data.data.discount
        });
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'get_condition' });
    app.getPostData(function (post_data) {///获取商家信息及筛选
      app.getApiData(function (res) {
        that.setData({
          shopInfo: res.data.data
        });
        console.log(res.data.data)
      }, 'GET', post_data)
    }, { ac: 'homepage', op: 'store' });
    wx.request({
      url: 'http://xcx.szhuanya.cn/web/index.php?c=site&a=entry&do=web&m=we7_wmall&ctrl=Interface',
      data: {
        ac: 'homepage',
        op: 'guessLike'
      },
      success:function(res){
        console.log(res);
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // **********************************************页面跳转函数
  search: function () {
    wx.navigateTo({
      url: 'search/search'
    })
  },
  toShopMenuList: function (e){
    var that=this;
    var token = e.currentTarget.dataset.token;
    wx.navigateTo({
      url:'shopMenuList/shopMenuList?token='+token
    })
  },
  /**
   ************************************************* tel_tab分类点击
   */
  navBarSwitch: function (e) {
    var that = this;
    var nav = e.currentTarget.dataset.nav;
    if (nav == 1) {
      that.setData({
        top1: !that.data.top1,
        top2: false,
        top3: false
      })
    }
    if (nav == 2) {
      that.setData({
        top2: !that.data.top2,
        top1: false,
        top3: false
      })
    }
    if (nav == 3) {
      that.setData({
        top3: !that.data.top3,
        top2: false,
        top1: false
      })
    }

  },
  moreWrap:function(){
    var that=this;
    that.setData({
      wrap:!that.data.wrap
    })
    console.log(that.data.wrap)
  },
  layoutSwith:function(){
   var that=this;
   that.setData({
     likeLayout:!that.data.likeLayout
   })
   console.log(that.data.likeLayout)
  }
  // ***********************************************请求函数



})
