// pages/result/cet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_ur: 'https://i.loli.net/2018/05/31/5b0f9fd5500df.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      var level =''
      console.log(options)
      var r = JSON.parse(options.result)
      console.log(r)
      console.log((r.number / 100000) % 10)
      if (parseInt(r.number / 100000 % 10)==1){
        //四级
        level = '四'
      }else{
        //六级
        level = '六'
      }
      that.setData({
        'level':level
      })
      // if(r.length>1){
      //   this.setData(r)
      // }else{
      //   this.setData(r[0])
      // }
      this.setData(r)
      console.log(this.data)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '来查成绩啦',
      path: 'pages/record/cet',
      imageUrl: 'http://oqyng1awk.bkt.clouddn.com/18-6-12/49004334.jpg'
    }
  }
})

export default {
  config: {
    usingComponents: {
      'wxc-list': '@minui/wxc-list'
    }
  }
}