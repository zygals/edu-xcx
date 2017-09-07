// pages/personal/personal.js
var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;

Page({
  data:{
    userInfo:{},//用户信息
    user_name: '',//账号
  },
  getInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          userInfo: userInfo,

        });
        //将用户信息：头像和昵称发送服务器
        var user_name = wx.getStorageSync('user_name');
        if (!user_name) {
          app.register();
          user_name = wx.getStorageSync('user_name')
        }
        common.httpP(wxurl + 'user/save', {
          'user_name': user_name,
          'vistar': userInfo.avatarUrl,
          'nickname': userInfo.nickName,
          'sex': userInfo.gender,
        },function(res){
             
        });
      },//如果不同意则提示用户设置为同意
      fail: function () {
        wx.openSetting({
          success: function (data) {
            if (data) {
              if (data.authSetting["scope.userInfo"] == true) {
                that.getInfo();
              } else {
                console.log('没有同意用户信息')
              }
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
    this.setData({
      user_name: user_name,
    });
    
    this.getInfo()
  },
  onReady:function(){
    // 页面渲染完成
  
  },
  onShow:function(){
   
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})