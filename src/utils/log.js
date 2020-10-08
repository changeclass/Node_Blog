const fs = require('fs')
const path = require('path')

// 写log
function writeLog(writeStream,log){
    writeStream.write(log+'\n')
}

// 生成write Stream
function createWriteStream(fileName){
    const fullFileName = path.join(__dirname,'../','../','logs',fileName)
    return fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
}

// 将生成的writeStream流返回
const accessWriteStream = createWriteStream('access.log')

function access(log){
    writeLog(accessWriteStream,log)
}

module.exports = {
    access
}