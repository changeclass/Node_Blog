const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName,(err,data)=>{
    if (err){
        console.error(err)
        return
    }
    // data 是二进制类型
    console.log(data.toString())
})

// 写入文件
const content = '这是写入的内容\n'
const opt = {
    flag: 'a'
}
fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
    }
})

