const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    // 请求的方式
    console.log(req.method)
    // 请求的地址
    const url = req.url
    console.log("url:", url)
    // 将请求的参数转换为对象
    req.query = queryString.parse(url.split('?')[1])
    console.log('req.query:', req.query)
    // 对客户端返回
    res.end(JSON.stringify(req.query))

})
server.listen(8000, (req, res) => {
    console.log("服务启动了：http://127.0.0.1:8000")
})