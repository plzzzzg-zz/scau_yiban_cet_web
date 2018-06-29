// pages/record/add.js

var baseUrl = 'https://scauwlb.top/yiban_cet_api/public/cet'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    name_img_url: 'https://s1.ax1x.com/2018/05/31/CIJvZt.png',
    number_img_url: 'https://s1.ax1x.com/2018/05/31/CIJxdP.png',
    numberError: false,
    nameError: false,
    number:'',
    name:''
  },
  formSubmit: function () {
    console.log(this.data)
    var that = this
    if (typeof (that.data.name) == 'undefined' || that.data.name == '') {
      that.setData({
        'nameError':true
      })
      wx.showToast({
        title: '姓名/考号 不能为空',
        icon:'none'
      })
    }
    if (typeof (that.data.number) == 'undefined' || that.data.number == '') {
      that.setData({
        'numberError': true
      })
      wx.showToast({
        title: '姓名/考号 不能为空',
        icon: 'none'
      })
    }
    if (typeof (that.data.name) != 'undefined' && that.data.number != ''&&that.data.number != '' && that.data.name != '') {
      wx.showLoading({
        title: 'submiting',
      })
      //todo 判断语句需要重新写
      var that = this
      console.log('that.data')
      console.log(that.data)
      wx.request({
        url: baseUrl + '/addRecord',
        data: {
          name: that.data.name,
          number: that.data.number,
          openid: that.data.openid
        },
        method: 'POST',
        success: function (res) {
          if (res.data.status == 200) {
            wx.hideLoading()
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1300)
          }
        }
      })
      
    }
    
  },
  changeName: function (e) {
    console.log(e.detail.value)
    this.setData({
      'name': e.detail.value
    })
    if(e.detail.value!=''){
      this.setData({
        'nameError':false
      })
    }
  },
  changeNumber: function (e) {
    this.setData({
      'number': e.detail.value
    })
    if (e.detail.value != '') {
      this.setData({
        'numberError': false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          'openid': res.data
        })
      },
    })
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
export default {
  config: {
    usingComponents: {
      'wxc-input': '@minui/wxc-input'
    }
  },
  data: {},
  methods: {}
}