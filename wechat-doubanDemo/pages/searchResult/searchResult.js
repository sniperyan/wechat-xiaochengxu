// pages/searchResult/searchResult.js
var fetch = require('../../comm/js/fetch')
var searchByTagUrl = 'https://api.douban.com/v2/movie/search?tag='
Page({
    /**
     * showLoading 只用于第一页的loading状态判断
     * windowHeight： 获取窗口高度，用于给scroll-view加高度,竖向滚动时不加高度没法触发事件
     */
    data: {
        films: [],
        hasMore: true,
        showLoading: true,
        start: 0,
        url: '',
        keyword: '',
        windowHeight: 0
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            url: options.url,
            keyword: options.keyword
        })
        fetch.search.call(this)
    },
    scrolltolower: function () {
        fetch.search.call(this)
    },
    onPullDownRefresh: function() {
        this.setData({
            films: [],
            hasMore: true,
            showLoading: true,
            start: 0
        })
        fetch.search.call(this)
    },
    detailTap: function (e) {
        //一个film的tap事件 filmList   filmItem catchtap处理函数，
        // bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。
        //id 通过data-id在wxml中绑定，具体参照官方api
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: "../filmDetail/filmDetail?id=" + id
        })
    },
    tagTap: function (e) {
        //一个film tag 的 tap事件
        var tag = e.currentTarget.dataset.tag
        wx.navigateTo({
            url: '../searchResult/searchResult?url=' + encodeURIComponent(searchByTagUrl) + '&keyword=' + tag
        })
    },
    scrollEventHandle: function () {
        //页面相关事件处理函数--监听页面滚动
        console.log('scrollEventHandle')
    },
    scrolltolowerEventHandle: function () {
        //页面相关事件处理函数--滚动到页面底部
        fetch.search.call(this)
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight*2
                })
            }
        })
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})