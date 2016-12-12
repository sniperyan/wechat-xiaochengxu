// pages/personDetail/personDetail.js
var fetch = require('../../comm/js/fetch')
var url = 'https://api.douban.com/v2/movie/celebrity/'
Page({
    data: {
        personDetail: {},
        showLoading: true,
        showContent: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var id = options.id
        this.setData({
            id: options.id
        })
        fetch.fetchPersonDetail.call(this, url, id)
    },
    viewFilmDetail: function (e) {
        var data = e.currentTarget.dataset;
        console.log(data)
        wx.redirectTo({
            url: '../filmDetail/filmDetail?id=' + data.id
        })
    },
    onPullDownRefresh: function () {
        this.onLoad({
            id:this.data.id
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})