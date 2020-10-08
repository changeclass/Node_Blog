const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
const {access} = require('./src/utils/log')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


// 获取cookie的过期时间
const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log("d.toGMTString(): ", d.toGMTString())
    return d.toGMTString()
}
// session数据
const SESSION_DATA = {}

// 处理 post data
const getPostData = (req) => {
    return new Promise(((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }

            resolve(JSON.parse(postData))
        })
    }))
}
const serverHandle = (req, res) => {
    // 记录日志 access log
    access(`${req.method} --- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    //  处理请求路径
    // 请求地址
    const url = req.url
    // 获取path
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        req.cookie[key] = arr[1].trim()
    })
    // 解析 session （使用 redis）
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData

        // 处理Blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpries()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理User路由
        const userResult = handleUserRouter(req, res)

        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExpries()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未命中 返回404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })

}
module.exports = serverHandle