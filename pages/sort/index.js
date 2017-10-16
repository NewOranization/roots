// pages/sort/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // order: ['sort1', 'sort2', 'sort3', 'sort4', 'sort1'],
    order: [
            {
              id: 'sort1',
              title:'肉禽蛋奶'
            },
            {
              id: 'sort2',
              title: '水果蔬菜'
            },
            {
              id: 'sort3',
              title: '饮料酒水'
            }
          ],
    rightInfo:[
          {
            id:'sort1',
            content:[
              {
                title:'肉禽',
                contentItem:[
                  {
                    thumb:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                    con:'苹果'
                  },
                  {
                    thumb: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                    con: '梨'
                  },
                  {
                    thumb: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                    con: '香蕉'
                  }
                ]
              },
              {
                title: '蛋奶',
                contentItem: [
                  {
                    thumb: 'http://img01.taopic.com/161011/318750-1610110J25343.jpg',
                    con: '哇哈哈'
                  }
                ]
              }
            ]
          },
          {
            id: 'sort2',
            content: [
              {
                title: '水果',
                contentItem: [
                  {
                    thumb: 'http://pic13.nipic.com/20110301/2531170_083137628390_2.jpg',
                    con: '1'
                  }
                ]
              },
              {
                title: '蔬菜',
                contentItem: [
                  {
                    thumb: 'http://img01.taopic.com/161011/318750-1610110J25343.jpg',
                    con: '2'
                  }
                ]
              }
            ]
          },
          {
            id: 'sort3',
            content: [
              {
                title: '饮料',
                contentItem: [
                  {
                    thumb: 'http://pic13.nipic.com/20110301/2531170_083137628390_2.jpg',
                    con: '1'
                  }
                ]
              },
              {
                title: '酒水',
                contentItem: [
                  {
                    thumb: 'http://img01.taopic.com/161011/318750-1610110J25343.jpg',
                    con: '2'
                  }
                ]
              }
            ]
          }
    ],
    toView: 'sort1'
  },
  tap: function (e) {
    var ord = e.currentTarget.dataset.ord;
    console.log(ord)
    this.setData({
      toView: ord
    })
    console.log(this.data.toView);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})