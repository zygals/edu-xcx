//咨询列表页
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
    dxHidden: true,
    page: 1,
    totalPage: 1,
    cate_article: [],
    articles: [],
    cate_article_id: 0,
    school_id: 0
  },
  getListArticle: function () {
    var that = this;
    var cate_article_id = this.data.cate_article_id;
    var school_id = this.data.school_id;

    common.httpG(wxurl + 'article/index', { cate_article_id: cate_article_id, school_id: school_id }, function (obj) {
      that.setData({
        articles: obj.data.data,
        page: obj.data.current_page,
        totalPage: obj.data.total / obj.data.per_page,
      });
    });
  },
  //取所有分类
  getListCateArticle: function () {
    var that = this;
    //get ads
    common.httpG(wxurl + 'cate_article/index', {}, function (obj) {
      that.setData({
        cate_article: obj.data.data,
      });
    });

  },
  //点击分类事件
  tapGetListByCateId: function (e) {
    this.setData({
      dxHidden: true,
    });

    var cate_article_id = e.target.dataset.cate_article_id;

    this.setData({
      cate_article_id: cate_article_id,
    });
    this.getListArticle();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var school_id = options.school_id;
    var school_name = options.school_name;
    this.setData({
      school_id: school_id,
    });
    wx.setNavigationBarTitle({
      title: school_name + '-咨讯'
    });
    this.getListArticle()
    this.getListCateArticle()
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
    var school_id = this.data.school_id;
    var cate_article_id = this.data.cate_article_id;
    //console.log(page+1);
    var totalPage = this.data.totalPage;
    var that = this;
    var articles = this.data.articles;

    if (page >= totalPage) {
      this.setData({
        dxHidden: false,
      });
      return;
    }
    //console.log(schools);
    //get ads
    common.httpG(wxurl + 'article/index', { "page": page + 1, cate_article_id: cate_article_id, school_id: school_id }, function (obj) {
      var new_list = obj.data.data;
      for (var i = 0; i < new_list.length; i++) {
        articles.push(new_list[i]);
      }
      //console.log('new',schools);
      that.setData({
        articles: articles,
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