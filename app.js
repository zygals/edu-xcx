App({
  onLaunch: function () {
    //
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      this.register();
    }
  },
  onHide: function () {
    // Do something when hide.

  },
  //注册
  register: function () {
    var that = this;
    // Do something initial when launch.
    //当程序开启时，自动完成注册功能 
    wx.login({
      success: function (res) {
        if (res.code) {
     
          //发起网络请求,注册用户
          wx.request({
            url: that.globalData.wxurl + 'user',
            data: {
              code: res.code
            },
            success: function (res) {
              try {
                wx.setStorageSync('user_name', res.data.data)
              } catch (e) {
                wx.showToast({
                  title: 'setStorageSync fail',
                  duration: 10000
                })
              }
            },fail:function(){
              console.log('login-errro');
            }
          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！',
            duration: 10000
          })
        }
      }
    });
  },
  globalData:{
    'wxurl':'https://huahui.qingyy.net/edu/public/wx.php/',
    'imgurl':'https://huahui.qingyy.net/edu/public',


  }
});