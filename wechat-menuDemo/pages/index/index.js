//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        navOpen1:false,
        navOpen2:false,
        navOpen3:false,
        navDisable1:false,
        navDisable2:false,
        navDisable3:false,
        nv:['衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰'],
        px:['默认排序','离我最近','价格最低','价格最高']
    },
    //事件处理函数
    tapHandler: function (e) {
        let id = e.target.dataset.id
        let {navOpen1,navOpen2,navOpen3}=this.data
        switch (id){
            case "1":
                //先设置nav1 的disable block
                this.setData({
                    navDisable1:true,
                    navDisable2:false,
                    navDisable3:false,
                })
                if(navOpen1){
                    //如果nav1已经展开，那么缩起来
                    this.setData({
                        navOpen1:false,
                        navOpen2:false,
                        navOpen3:false
                    })
                }else {
                    //如果nav1已经缩起来，那么展开
                    this.setData({
                        navOpen1:true,
                        navOpen2:false,
                        navOpen3:false
                    })
                }
                break
            case "2":
                this.setData({
                    navDisable1:false,
                    navDisable2:true,
                    navDisable3:false,
                })
                if(navOpen2){
                    this.setData({
                        navOpen1:false,
                        navOpen2:false,
                        navOpen3:false
                    })
                }else {
                    this.setData({
                        navOpen1:false,
                        navOpen2:true,
                        navOpen3:false
                    })
                }
                break
            case "3":
                this.setData({
                    navDisable1:false,
                    navDisable2:false,
                    navDisable3:true,
                })
                if(navOpen3){
                    this.setData({
                        navOpen1:false,
                        navOpen2:false,
                        navOpen3:false
                    })
                }else {
                    this.setData({
                        navOpen1:false,
                        navOpen2:false,
                        navOpen3:true
                    })
                }
                break
        }

    },
    hidebg:function () {
        this.setData({
            navOpen1:false,
            navOpen2:false,
            navOpen3:false,
            navDisable1:false,
            navDisable2:false,
            navDisable3:false,
        })
    },
    onLoad: function () {
        console.log('onLoad')
    }
})
