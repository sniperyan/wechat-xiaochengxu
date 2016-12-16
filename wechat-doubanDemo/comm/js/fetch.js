var config = require('./config')
var message = require('../../component/message/message')
module.exports = {
    //获取电影列表
    fetchFilms: function (url, cb) {
        var that = this
        var {hasMore, start, showLoading, films} = that.data
        if (hasMore) {
            wx.showToast({
                title: '玩命加载中...',
                icon: 'loading',
                duration: 10000
            })
            wx.request({
                url: url,
                data: {
                    city: config.city,
                    start: start,
                    count: config.count
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    /**
                     * 小程序的文档没问题，是豆瓣的这个api很奇葩，我试了下必须这么写，不然会报400的错
                     * {"msg":"Invalid request","code":999,"request":"GET \/v2\/in_theaters"}
                     */
                    "Content-Type": "application/json,application/json"
                },
                success: function (res) {
                    if (res.data.subjects.length === 0) {
                        that.setData({

                            hasMore: false

                        })
                    } else {
                        that.setData({

                            films: films.concat(res.data.subjects),
                            start: start + res.data.subjects.length,
                            showLoading: false

                        })
                    }
                    wx.stopPullDownRefresh()
                    typeof cb == 'function' && cb(res.data)

                },
                fail: function () {
                    that.setData({
                        showLoading: false

                    })
                    message.show.call(that, {
                        content: '网络开小差了',
                        icon: 'warning',
                        duration: 3000

                    })
                },
                complete: function () {
                    // complete
                    wx.hideToast()
                }
            })
        }

    },
    //获取电影详情
    fetchFilmDetail: function (url, id, cb) {
        var that = this;
        wx.showToast({
            title: '玩命加载中...',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: url + id,
            method: 'GET',
            header: {
                "Content-Type": "application/json,application/json"
            },
            success: function (res) {
                that.setData({
                    filmDetail: res.data,
                    showLoading: false,
                    showContent: true
                })
                wx.setNavigationBarTitle({
                    title: res.data.title
                })
                wx.stopPullDownRefresh()
                typeof cb == 'function' && cb(res.data)
            },
            fail: function () {
                that.setData({
                    showLoading: false
                })
                message.show.call(that, {
                    content: '网络开小差了',
                    icon: 'warning',
                    duration: 3000
                })
            },
            complete: function () {
                // complete
                wx.hideToast()
            }
        })

    },
    //获取人物详情
    fetchPersonDetail:function (url, id, cb) {
        var that = this;
        wx.showToast({
            title: '玩命加载中...',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: url + id,
            method: 'GET',
            header: {
                "Content-Type": "application/json,application/json"
            },
            success: function (res) {
                console.log('success')
                that.setData({
                    personDetail: res.data,
                    showLoading: false,
                    showContent: true
                })
                wx.setNavigationBarTitle({
                    title: res.data.name
                })
                wx.stopPullDownRefresh()
                typeof cb == 'function' && cb(res.data)
            },
            fail: function () {
                console.log('fail')
                that.setData({
                    showLoading: false
                })
                message.show.call(that, {
                    content: '网络开小差了',
                    icon: 'warning',
                    duration: 3000
                })
            },
            complete: function () {
                // complete
                wx.hideToast()
            }
        })

    },
    search: function(cb){
        var that = this
        var {url,hasMore, start, showLoading, keyword,films} = that.data
        url = decodeURIComponent(url)
        if (hasMore) {
            wx.showToast({
                title: '玩命加载中...',
                icon: 'loading',
                duration: 10000
            })
            wx.request({
                url: url + keyword,
                data: {
                    start: start,
                    count: config.count
                },
                method: 'GET',
                header: {
                    "Content-Type": "application/json,application/json"
                },
                success: function(res){
                    if(res.data.subjects.length === 0){
                        that.setData({
                            hasMore: false,
                            showLoading: false
                        })
                    }else{
                        that.setData({
                            films: films.concat(res.data.subjects),
                            start: start + res.data.subjects.length,
                            showLoading: false
                        })
                        wx.setNavigationBarTitle({
                            title: keyword
                        })
                    }
                    wx.stopPullDownRefresh()
                    typeof cb == 'function' && cb(res.data)
                },
                fail: function() {
                    that.setData({
                        showLoading: false
                    })
                    message.show.call(that,{
                        content: '网络开小差了',
                        icon: 'warning',
                        duration: 3000
                    })
                },
                complete: function () {
                    // complete
                    wx.hideToast()
                }
            })
        }
    }
}