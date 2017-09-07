var common = require("../../utils/util.js");
var app = getApp();
const wxurl = app.globalData.wxurl;
const imgurl = app.globalData.imgurl;
Page({
  data: {
    imgurl: imgurl,
    dxHidden: true,
    page: 1,
    totalPage: 1,
    type_id:1,
    goods: [],
    cates:[],
    cate_id:0,
    school_id:0,

  },

  //取资料列表
  getGoods: function (title) {
    var that = this;
    var cate_id = this.data.cate_id;
    var type_id = this.data.type_id;
    var school_id = this.data.school_id;
    if (title == undefined) {
      title = '';
    }
    //get ads
    common.httpG(wxurl + 'good/index', { "type": type_id, cate_id: cate_id, school_id: school_id,title:title}, function (obj) {
      that.setData({
        goods: obj.data.data,
        page: obj.data.current_page,
        totalPage: obj.data.total / obj.data.per_page,
      });
    });
  },
//取真题所有分类
getCates:function(){
  var that = this;
  var type_id = this.data.type_id;
  //get ads
  common.httpG(wxurl + 'cate/index', { "type": type_id }, function (obj) {
    that.setData({
      cates: obj.data.data,
    });
  });

},
//点击分类事件
  tapGetGoodsByCateId:function(e){
    this.setData({
     dxHidden:true,
    });
     var cate_id = e.target.dataset.cate_id;
     this.setData({
       cate_id: cate_id,
     });
     this.getGoods();
  },
  //搜索
  submitSearch: function (e) {
    //console.log(e.detail.value.title);
    var title = e.detail.value.title;
    this.getGoods(title);
  },
  inputConfirm: function (e) {
    var title = e.detail.value;
    this.getGoods(title);
  },
  onLoad: function (options) {
    var type_id = options.type_id;
    var school_id = options.school_id;
    var school_name = options.school_name;
    if(school_name==undefined){
      school_name='';
    }else{
      school_name = school_name+'-'
    }
    this.setData({
      type_id:type_id,
      school_id: school_id,
    });
    if (type_id==1){
      wx.setNavigationBarTitle({
        title: school_name+'图书'
      });
    }else{
      wx.setNavigationBarTitle({
        title: school_name+'真题'
      });
    }
  
    //get goods
    this.getGoods();
    this.getCates();
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = Number(this.data.page);
    var cate_id = this.data.cate_id;
    var school_id = this.data.school_id;
    //console.log(page+1);
    var totalPage = this.data.totalPage;
    var that = this;
    var goods = this.data.goods;
   
    if (page >= totalPage) {
      this.setData({
        dxHidden: false,
      });
      return;
    }
    //console.log(schools);
    //get ads
    common.httpG(wxurl + 'good/index', { "page": page + 1, cate_id: cate_id, school_id: school_id}, function (obj) {
      var new_list = obj.data.data;
      for (var i = 0; i < new_list.length; i++) {
        goods.push(new_list[i]);
      }
      //console.log('new',schools);
      that.setData({
        goods: goods,
        page: obj.data.current_page
      });
    });
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
}); 