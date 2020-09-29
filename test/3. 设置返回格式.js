const http = require('http')
const queryString = require('querystring')
const server = http.createServer((req, res) => {
    // 请求方式
    const method = req.method
    // 请求路由
    const url = req.url
    // 请求路径
    const path = url.split('?')[0]
    // GET请求参数
    const query = queryString.parse(url.split('?')[1])

    // 设置返回格式为 JSON、
    res.setHeader('Content-type','application/json')

    // 返回数据
    const resData = {
        method,url,path,query
    }
    if(method==='GET'){
        res.end(JSON.stringify(resData))
    }
    if(method==='POST'){
        let postData = ''
        req.on('data',chunk => {
            postData+=chunk.toString()
        })
        req.on('end',()=>{
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
    }
})
server.listen(8000, (req, res) => {
    console.log("服务启动了：http://127.0.0.1:8000")
})