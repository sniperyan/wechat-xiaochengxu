module.exports = {
    show: function (cfg) {
        this.setData({
            message: {
                content: cfg.content,
                icon: cfg.icon,
                visiable: true
            }
        })
        if (typeof cfg.duration !== 'undefined') {
            setTimeout(() => {
                this.setData({
                    message: Object.assign(this.data.message, {
                        visiable: false
                    })
                })
            }, cfg.duration)
        }

    },
    hide: function () {
        this.setData({
            message: Object.assign(this.data.message, {
                visiable: false
            })
        })
    }

}