Page({
  upload() {
    const ctx = wx.createCanvasContext('myCanvas')
    const imageWidth = 124
    const imageHeight = 220
    const column = 3
    const row = 3
    const that = this
    wx.chooseImage({
      success: res => {
        res.tempFilePaths.forEach((image, index) => {
          console.log(index)
          const c = index % column
          const r = Number.parseInt(index / row)
          console.log(c, r)
          console.log(image)
          ctx.drawImage(image, c * imageWidth, r * imageHeight, imageWidth, imageHeight)
        })
        ctx.draw(false, () => {
          let that = this;
          let screen_width = wx.getSystemInfoSync().windowWidth
          let screen_height = wx.getSystemInfoSync().windowHeight
    
          let unit = screen_width / 375;
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: screen_width,
            height: screen_height,
            destWidth: unit * 1800, // 设置大一点清晰度会高
            destHeight: unit * 3200,
            canvasId: 'myCanvas',
            success: (res) => {
              that.setData({
                shareImgPath: res.tempFilePath,
                is_show: false
              })
              if (!res.tempFilePath) {
                wx.showModal({
                  title: '提示',
                  content: '图片绘制中，请稍后重试',
                  showCancel: false
                })
              }
              // resolve()
            },
            fail: function (err) {
              // reject()
            }
          })
        })
      }
    })
    
  },
  //  长按canvas图片的时候保存图片
  saveImageToPhotosAlbum() {
    
    //画板路径保存成功后，调用方法吧图片保存到用户相册
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImgPath,
      //保存成功失败之后，都要隐藏画板，否则影响界面显示。
      success: (res) => {

        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        // completeShare().then(res => {
        //  
        // })
      },
      fail: (err) => {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})
