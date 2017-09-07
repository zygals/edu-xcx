//获取应用实例  
var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: imgurl,
    school: {},
    school_id:0,
    school_name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var school_id = options.school_id;
    var school_name = options.school_name;
    this.setData({
      school_id:school_id,
      school_name: school_name,
    });
    this.getRowSchool(school_id)
  },
  getRowSchool: function (school_id) {
    var that = this;
    common.httpG(wxurl + 'school/read', {school_id:school_id}, function (obj) {
      that.setData({
        school:obj.data,
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