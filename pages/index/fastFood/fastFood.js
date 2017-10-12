
//获取应用实例
var app = getApp()
Page({
  data: {
    // 标签页切换
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    content: [],
    qy: [],
    nv: [],
    px: [],
    qyopen: false,
    qyshow: false,
    nzopen: false,
    nzshow: false,
    pxopen: false,
    pxshow: false,
    citycenter: {},
    cityright: {},
    select1: '',
    select2: '',
    shownavindex: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({//这里改了
      qy: ['全部', '抢购', '火锅', '酒店', 'KTV', '运动健身', '快餐', '自助餐', '更多分类'],
      nv: ['全部', '离我最近', '销量最高', '评分最高', '起送价最低', '送单速度最快'],
      px: ['全部', '首单立减', '新用户立减', '立减优惠', '下单满赠', '免配送费', '特价优惠', '进店领券', '下单返券', '自提优惠']
    })
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.qy,//////////////////////////////////////////////////////////////////////////////qy
        qyopen: true,
        pxopen: false,
        nzopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,//////////////////////////////////////////////////////////////////////////////nv
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.px,//////////////////////////////////////////////px
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
  listsj: function (e) {
        if (this.data.pxopen) {
            this.setData({
                nzopen: false,
                pxopen: false,
                qyopen: false,
                nzshow: true,
                pxshow: false,
                qyshow: true,
                shownavindex: 0
            })
        } else {
            this.setData({
                content: this.data.px,//////////////////////////////////////////////px
                nzopen: false,
                pxopen: true,
                qyopen: false,
                nzshow: true,
                pxshow: false,
                qyshow: true,
                shownavindex: e.currentTarget.dataset.nav
            })
        }
        console.log(e.target)
    },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {

    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
