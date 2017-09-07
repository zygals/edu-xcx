// 评价列表页

var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:imgurl,
    page: 1,
    totalPage: 0,
    dxHidden: true,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
 getList:function(){
   var that = this;
   var user_name = wx.getStorageSync('user_name');
   if (!user_name) {
     app.register();
     user_name = wx.getStorageSync('user_name')
   }
   common.httpG(wxurl + 'fankui/index', { user_name: user_name }, function (obj) {
     that.setData({
       list: obj.data.data,
       page: obj.data.current_page,
       totalPage: obj.data.total / obj.data.per_page,
     });
   });
 },
 delrow: function (e) {
   var that = this;
   var order_id = e.currentTarget.dataset.order_id;
   var good_id = e.currentTarget.dataset.good_id; 
   //console.log(e)
   wx.showModal({
     title: '要删除吗？',
     content: '要删除这条评价吗？',
     success: function (res) {
       if (res.confirm) {
         common.httpG(wxurl + 'fankui/delete', { order_id: order_id, good_id: good_id }, function (obj) {
           that.getList();
         });
       }
     }
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
    var page = Number(this.data.page);
    //console.log(page+1);
    var totalPage = this.data.totalPage;
    var that = this;
    var list = this.data.list;
  
    if (page >= totalPage) {
      this.setData({
        dxHidden: false,
      });
      return;
    }
    //console.log(schools);
    //get ads
    common.httpG(wxurl + 'fankui/index', { "page": page + 1 }, function (obj) {
      var new_list = obj.data.data;
      for (var i = 0; i < new_list.length; i++) {
        list.push(new_list[i]);
      }
      //console.log('new',schools);
      that.setData({
        list: list,
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