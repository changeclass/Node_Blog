// 复制文件

const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname,'data.txt')
const fileName2 = path.resolve(__dirname,'data-back.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

// 连接管道
readStream.pipe(writeStream)

// 监听每次读取数据
readStream.on('data',chunck=>{
    console.log(chunck.toString())
})

// 监听读取完成
readStream.on('end',()=>{
    console.log('copy done')
})