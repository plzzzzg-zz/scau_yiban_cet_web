// pages/record/detail.js
var baseUrl = 'https://scauwlb.top/yiban_cet_api/public/cet'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:'',
    name_img_url:'https://s1.ax1x.com/2018/05/31/CIJvZt.png',
    number_img_url:'https://s1.ax1x.com/2018/05/31/CIJxdP.png',
    number:'',
    name:'',
    checkCode:''
  },
  checkResult:function(){
    wx.showLoading({
      title: '查询中',
    })
    var that = this 
    wx.request({
      url: baseUrl+'/result',
      method:'POST',
      data:{
        name:that.data.name,
        number:that.data.number
      },
      success:function(res){
        console.log(res)
        wx.hideLoading()
        if (res.data.code==0){
          //检查成功,跳转成绩页面
          var r = JSON.stringify(res.data.result)
          console.log(r)
          wx.navigateTo({
            url: '../result/cet?result='+r,
          })
        } else if (res.data.code == 80001){
          //要求输入验证码重新查询
          // var img_url = res.data.img_url
          that.setData({
            'img_url': res.data.img_url
          })
          that.showDialog()
        } else if (res.data.code == 1012){
          //"无法找到对应的分数，请确认你输入的准考证号及姓名无误"
          wx.showToast({
            title: '考号或姓名错误',
            icon:'none'
          })
        } else if (res.data.code == 40001){
          //无法找到对应的分数，请确认你输入的准考证号及姓名无误
          wx.showToast({
            title: '考号或姓名错误',
            icon: 'none'
          })
        }
      }
    })
  },
  deleteRecord:function(){
    var that = this
    wx.request({
      url: baseUrl+ '/deleteRecord',
      method:'POST',
      data:{
        openid: that.data.openid,
        number: that.data.number,
        name:that.data.name
      },
      success:function(res){
        if(res.statusCode==200){
          wx.showToast({
            title: '删除成功',
            duration:1000
          })
          setTimeout(function () {
            wx.navigateBack({
            })
          }, 1300)
        }
      }
    })
  },
  changeCheckCode:function(e){
    console.log(e)
    this.setData({
      'checkCode':e.detail.value
    })
    console.log(this.data)
  },
  showDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onConfirm(e) {
    console.log('点击了确认按钮')
    var that = this
    if(that.data.checkCode==''){
      wx.showToast({
        title: '验证码不能为空',
        icon:'none'
      })
    }else{
      //带验证码提交查询
      this.hideDialog()
      wx.showLoading({
        title: '查询中',
      })
      console.log(that.data)
      //todo  checkCOde 传不进去
      wx.request({
        url: baseUrl + '/getResultWithCode',
        method: 'POST',
        data: {
          name: that.data.name,
          number: that.data.number,
          code: that.data.checkCode
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == 0) {
            //检查成功,跳转成绩页面
            var r = JSON.stringify(res.data.result)
            console.log(r)
            wx.navigateTo({
              url: '../result/cet?result=' + r,
            })
          } else if (res.data.code == 80001) {
            //要求输入验证码重新查询
            // var img_url = res.data.img_url
            that.setData({
              'img_url': res.data.img_url
            })
            that.showDialog()
          } else if (res.data.code == 1012) {
            //"无法找到对应的分数，请确认你输入的准考证号及姓名无误"
            wx.showToast({
              title: '考号或姓名错误',
              icon: 'none'
            })
          } else if (res.data.code == 40001) {
            //无法找到对应的分数，请确认你输入的准考证号及姓名无误
            wx.showToast({
              title: '考号或姓名错误',
              icon: 'none',
              duration:2000
            })
          }
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '网络状态不好',
            duration: 2000
          })
        }
      })
    }
  },
  onCancel() {
    console.log('点击了取消按钮')
    this.hideDialog()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          'openid':res.data
        })
      },
    })
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
      'wxc-dialog': '@minui/wxc-dialog'
    }
  },
  data: { },
  methods: {
    showDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog')
      dialogComponent && dialogComponent.show();
    },
    hideDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog')
      dialogComponent && dialogComponent.hide();
    },
    onConfirm() {
      console.log('点击了确认按钮')
      this.hideDialog()
    },
    onCancel() {
      console.log('点击了取消按钮')
      this.hideDialog()
    }
  }
}