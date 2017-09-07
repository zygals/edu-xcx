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
    good: '',
    imgurlstar: '../../images/book-star.png',//
    collection: '收藏',
    color: '#000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var good_id = options.good_id;
    this.getGood(good_id);
  },
  getGood: function (good_id) {
    var that = this;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
    common.httpG(wxurl + 'good/read', { "good_id": good_id, user_name: user_name}, function (obj) {
      that.setData({
        good: obj.data,
      });
      if (obj.data.isFav){
        that.setData({
          collection: '已收藏',
          imgurlstar: '../../images/book-star1.png',
          color: '#fe7501'
        });
      }
    });
  },
  collect: function (e) {     
    var that = this;
    var good_id = e.currentTarget.dataset.good_id;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
    common.httpG(wxurl + 'good/collect', { "good_id": good_id ,user_name:user_name}, function (obj) {
      that.setData({
        collection: '已收藏',
        imgurlstar: '../../images/book-star1.png',
        color: '#fe7501'
      });
    });
  
  },
  //提交订单
  tapAddOrder:function(){
    var that = this;
    var good_id = this.data.good.id;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
      common.httpP(wxurl + 'dingdan/save', { "good_id": good_id, user_name: user_name ,'nums':1}, function (obj) {
       //跞转至订单详情
       //console.log(obj.data);return;
       wx.navigateTo({
         url: '/pages/order/order?order_id='+obj.data,
       })
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})