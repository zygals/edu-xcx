// pages/zti/zti.js

var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    imgurl: imgurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var article_id = options.article_id;
  
      //get ads
    common.httpG(wxurl + 'index/article_detail', {"article_id": article_id}, function (obj) {
        that.setData({
          article: obj.data,

        });
        wx.setNavigationBarTitle({
          title: obj.data.title
        })
      });
  

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