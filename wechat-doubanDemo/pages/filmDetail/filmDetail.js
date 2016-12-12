// pages/filmDetail/filmDetail.js
var fetch = require('../../comm/js/fetch')
var url = 'https://api.douban.com/v2/movie/subject/'
var searchByTagUrl = 'https://api.douban.com/v2/movie/search?tag='
Page({
    data: {
        filmDetail: {},
        showLoading: true,
        showContent: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var id = options.id
        this.setData({
            id: options.id
        })
        fetch.fetchFilmDetail.call(this, url, id)
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
    },
    onPullDownRefresh: function () {
        //页面相关事件处理函数--监听用户下拉动作
        this.onLoad({
            id:this.data.id
        })

    },
    /**
     * 为何这里用重定向？
     * @param e
     * 微信小程序页面的路径层级只能有5层(getCurrentPages()会显示6个页面)，如果两个页面的交互可以来回的跳转，
     * 使用navigateTo会使页面路径超过5层，此时，页面跳转将会失效
     * wx.redirectTo(OBJECT)会关闭当前页面，跳转到应用内的某个页面。所以使用重定向，页面的层级不会增加
     *
     * 这种限制可能是微信小程序内存的一种优化
     */
    personTap: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.redirectTo({
            url: '../personDetail/personDetail?id=' + id
        })
    },
    tagTap: function (e) {
        var tag = e.currentTarget.dataset.tag
        wx.navigateTo({
            url: '../searchResult/searchResult?url=' + encodeURIComponent(searchByTagUrl) + '&keyword=' + tag
        })
    }
})