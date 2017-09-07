//test.js  
//获取应用实例  

var common = require("../../utils/util.js");
var app = getApp()  ;
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;

Page({  
  data: {  
     imgurl:imgurl,
     ads:[],
     shoolRecTop:[],
     shoolRecBottom: [],
     bookRec:[],
     articleRec:[],
  },  
  getAds:function(){
    var that = this;
    //get ads
    common.httpG(wxurl + 'index/index', {}, function (obj) {
      that.setData({
        ads: obj.data.data,
      });
    });
  },
  getSchoolRec:function(){
    var that = this;
    common.httpG(wxurl + 'index/school_rec', {}, function (obj) {
      that.setData({
        shoolRecTop: obj.data.list_school_rec_top.data,
        shoolRecBottom: obj.data.list_school_rec_bottom.data,
      });
    });
  },
  getBookRec:function(){
    var that = this;
    common.httpG(wxurl + 'index/book_rec', {}, function (obj) {
      that.setData({
        bookRec: obj.data,
      });
    });

  },
  getArticleRec:function(){
    var that = this;
    common.httpG(wxurl + 'index/article_new', {}, function (obj) {
      that.setData({
        articleRec: obj.data,

      });
    });
  },
  onLoad: function () {

    var that = this;
    //get ads
    this.getAds();
    //get chool_rec
    this.getSchoolRec();
    //get book_rec
    this.getBookRec();
    //get book_rec
    this.getArticleRec();

  }  ,

})  