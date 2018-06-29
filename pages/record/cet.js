// pages/record/cet.js

var baseUrl = 'https://scauwlb.top/yiban_cet_api/public/cet'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    records:{
      img_url: 'https://i.loli.net/2018/05/31/5b0f9fd5500df.png',
      list:[]
    }
  },

  goDetail:function(item){
    console.log(item)
    var name = item.currentTarget.dataset.name;
    var number = item.currentTarget.dataset.number;
    wx.navigateTo({
      url: 'detail?name='+name+'&number='+number,
    })
  },

  addRecord:function(){
    wx.navigateTo({
      url: 'add',
    })
  },

  getData:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that =this 
    wx.login({
      success:function(res){
        if(res.code){
          wx.request({
            url: baseUrl + '/getOpenId',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data:{
              code: res.code
            },
            success:function(ress){
              console.log(ress.data)
              wx.setStorage({
                key: 'openid',
                data: ress.data.openid,
              })
              wx.request({
                url: baseUrl +'/records',
                method: 'POST',
                data:{
                  openid:ress.data.openid
                },
                success:function(resp){
                  console.log((resp.data))
                  if(resp.data.status==404){
                    wx.showToast({
                      icon:'none',
                      title:'还没有记录',
                    })
                  }else{
                    that.setData({
                      'records.list': (resp.data)
                    })
                    console.log(that.data)
                  }
                  wx.hideNavigationBarLoading()
                  wx.stopPullDownRefresh()
                }
              })
            }
          })
        }
      }
    })
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
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
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
    this.getData();
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
        imageUrl:'http://oqyng1awk.bkt.clouddn.com/18-6-12/49004334.jpg'
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