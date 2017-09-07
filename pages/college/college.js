// pages/articles/articles.js
var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schools:[],
    imgurl: imgurl,
    page:1,
    totalPage: 0,
    dxHidden:true,
  },
   getSchools:function(title){
     var that = this;
     if(title==undefined){
       title='';
     }
     //get ads
     common.httpG(wxurl + 'school', {title:title}, function (obj) {
       that.setData({
         schools: obj.data.data,
         page: obj.data.current_page,
         totalPage: obj.data.total / obj.data.per_page,
       });
     });
   },
   //搜索
   submitSearch:function(e){
     //console.log(e.detail.value.title);
     var title = e.detail.value.title;
     this.getSchools(title);
   },
   inputConfirm:function(e){
     var title = e.detail.value;
     this.getSchools(title);
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //请求所有文章
      var that = this;
      this.getSchools();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    var page = Number(this.data.page);
    //console.log(page+1);
    var totalPage = this.data.totalPage;
    var that = this;
    var schools = this.data.schools;
    console.log(page,totalPage);
    if (page >= totalPage){
      this.setData({
        dxHidden:false,
      });
        return;
    }
    //console.log(schools);
    //get ads
    common.httpG(wxurl + 'school', {"page":page+1}, function (obj) {
      var new_list = obj.data.data;
      for(var i=0;i<new_list.length;i++){
        schools.push(new_list[i]);
      }
      //console.log('new',schools);
      that.setData({
        schools: schools,
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