// /pages/orders/orders.js
var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    totalPage: 0,
    dxHidden: true,
    orders: [],
    imgurl: imgurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getList();
  },
  getList: function () {
    var that = this;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }

    common.httpG(wxurl + 'dingdan/index', { user_name: user_name }, function (obj) {
      that.setData({
        orders: obj.data.data,
        page: obj.data.current_page,
        totalPage: obj.data.total / obj.data.per_page,
      });
    });

  },
  tapDel: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '删除订单',
      content: '确定要删除吗？删除后不可恢复！',
      success: function (res) {
        if (res.confirm) {
          common.httpG(wxurl + 'dingdan/update_st', { order_id: order_id, st: "delByUser" }, function (obj) {
            wx.showToast({
              title: '删除成功',
            })
            that.getList();

          });
        }
      }
    });

  },
  //确认收货
  tapHaveTake: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '确认收货',
      content: '确认您已经收到货了吗？',
      success: function (res) {
        if (res.confirm) {
          //确定
          common.httpG(wxurl + 'dingdan/update_st', { order_id: order_id, st: "taken" }, function (obj) {
            wx.showToast({
              title: '确认成功',
            })
            that.getList();
          });
        }
      }
    });

  },
  //取消订单
  cancelOrder: function (e) {
    var that = this;
    var order_id = e.target.dataset.order_id;
    wx.showModal({
      title: '取消订单',
      content: '确定要取消吗？',
      success: function (res) {
        if (res.confirm) {
          //确定要删除则请求删除接口
          common.httpG(wxurl + 'dingdan/update_st', { order_id: order_id, st: "cancel" }, function (obj) {
            wx.showToast({
              title: '订单取消成功',
            })
            that.getList();
          });
        }
      }
    });

  },
  //评价
  tapPingjia: function (e) {

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
    var page = Number(this.data.page);
    //console.log(page+1);
    var totalPage = this.data.totalPage;
    var that = this;
    var orders = this.data.orders;
    if (page >= totalPage) {
      this.setData({
        dxHidden: false,
      });
      return;
    }
    //console.log(schools);
    //get ads
    common.httpG(wxurl + 'dingdan', { "page": page + 1 }, function (obj) {
      var new_list = obj.data.data;
      for (var i = 0; i < new_list.length; i++) {
        orders.push(new_list[i]);
      }
      //console.log('new',schools);
      that.setData({
        orders: orders,
        page: obj.data.current_page
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})