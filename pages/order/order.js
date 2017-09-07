// pages/order/order.js

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
    order:{},
    orderGood:[],
    address:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     var that = this;
    var order_id = options.order_id;//取上个页面的参数

    //请求服务器，取得订单数据
      this.gerOrder(order_id);
  },
  gerOrder:function(order_id){
    var that = this;
    common.httpG(wxurl + 'dingdan/read', {order_id:order_id}, function (obj) {
      that.setData({
         order:obj.data.order,
         orderGood:obj.data.order_goods,
         address:obj.data.address,
      });

    });

  },
  //立即支付
  tapPayNow: function (e) {
    if (this.data.address==null) {
      wx.showToast({
        title: '请添加地址',
      })
      return;
    }
    wx.showLoading({
      title: '请求支付中...',
    })
    var order_id;
    order_id = e.target.dataset.order_id;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
    wx.request({
      url: wxurl + 'pay/pay_now',
      data: {
        order_id: order_id,
        user_name: user_name
      },
      success: function (res) {
        if (res.data.code == 0) {
             wx.hideLoading();
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,//签名,
            'success': function (res) {
              //更改订单状态为已支付
             console.log('payok',res)
              wx.request({
                url: wxurl + 'dingdan/update_st',
                data: {
                  order_id: order_id,
                  st:'paid'
                },
                success: function (res) {
                  console.log(res.data.msg);
                }
              })
              wx.redirectTo({
                url: '/pages/orders/orders',
              })
            },
            'fail': function (res) {
              console.log(res)
            }
          })
        }else{
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
          })
        }

      }
    })
  },
  //
  chooseAdress_: function () {
    var order_id = this.data.order.id;
    var that = this;
    var user_name = wx.getStorageSync('user_name');
    if (!user_name) {
      app.register();
      user_name = wx.getStorageSync('user_name')
    }
    wx.chooseAddress({
      success: function (res) {
        var provinceName = res.provinceName;
        var cityName = res.cityName;
        var countyName = res.countyName;
        var info = res.detailInfo;
        var mobile = res.telNumber;
        var true_name = res.userName;
        var pcd = provinceName + ' ' + cityName + ' ' + countyName;
        //请求添加地址
        common.httpP(wxurl + 'address/save', {
          order_id: order_id,
          true_name: true_name,
          mobile: mobile,
          pcd: pcd,
          info: info,
          user_name: user_name,
        },function(obj){
          common.httpG(wxurl + 'address/read',
            {
              address_id: obj.data
            },
            function (obj) {
              that.setData({
                address: obj.data
              });
            }
          );
        });

      },//如果拒绝或是不改
      fail: function (res) {
        if (res.errMsg == 'chooseAddress:cancel') {
          return;
        }
        wx.openSetting({
          success: function (res) {
            if (res.authSetting["scope.address"] == true) {
              that.chooseAdress_()
            } else {
              console.log('没有同意地址选框')
            }
          }
        })
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
      //页面显示是请求默认收货地址

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