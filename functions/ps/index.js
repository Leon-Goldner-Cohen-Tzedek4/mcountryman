// 云函数入口文件
const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  console.log(event)
  const file = event.file
  const buffer = new Buffer.from(file, 'base64')
  console.log(buffer)
  console.log('开始上传')


  let Duplex = require('stream').Duplex

  let stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  console.log(stream)

  console.log('接收的内容')
  console.log('文件路径')
  const result = await axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: {
      image_file: stream,
      size: 'auto'
    },
    headers: {
      'X-Api-Key': 'wkMhcc4TRNFpxjL79Kf8mMU1'
    }
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
