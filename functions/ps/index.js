// 云函数入口文件
const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  console.log(event)
  const file = event.file
  const buffer = new Buffer(file, 'base64')
  console.log(buffer)
  console.log('开始上传')

  var stream = require('stream')
  // 创建一个bufferstream
  var bufferStream = new stream.PassThrough()
  //将Buffer写入
  bufferStream.end(new Buffer(buffer))
  //进一步使用
  bufferStream.pipe(process.stdout)

  console.log('接收的内容')
  console.log('文件路径')
  const result = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: {
      image_file: bufferStream,
      size: 'auto'
    },
    headers: {
      'X-Api-Key': 'wkMhcc4TRNFpxjL79Kf8mMU1'
    },
    encoding: null
  })
  console.log(result)
  const body = result
  console.log('输出结果')
  console.log(body)
  const image = body.toString('base64')
  return {
    image
  }
}
