Page({
  upload() {
    const ctx = wx.createCanvasContext('myCanvas')
    const imageWidth = 124
    const imageHeight = 220
    const column = 3
    const row = 3
    wx.chooseImage({
      success(res) {
        res.tempFilePaths.forEach((image, index) => {
          console.log(index)
          const c = index % column
          const r = Number.parseInt(index / row)
          console.log(c, r)
          console.log(image)
          ctx.drawImage(image, c * imageWidth, r * imageHeight, imageWidth, imageHeight)
        })
        ctx.draw()
      }
    })
  }
})
