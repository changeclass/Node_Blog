const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST'){
        console.log('req content-type:',req.headers['content-type'])
        // 接收数据
        let postData = ''
        // 随时触发，只有有数据传输就会触发
        req.on('data',chunk => {
            postData+=chunk.toString()
        })
        // 数据接收完毕时触发
        req.on('end',()=>{
            console.log('postData:',postData)
            res.end('hello world')
        })
    }

})
server.listen(8000, (req, res) => {
    console.log("服务启动了：http://127.0.0.1:8000")
})