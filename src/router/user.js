const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
// 获取cookie的过期时间
const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log("d.toGMTString(): ",d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    // 请求方式
    const method = req.method
    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        // const {username, password} = req.query

        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 操作Cookie
                res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookieExpries()}`)
                return new SuccessModel("登陆成功")
            } else {
                return new ErrorModel("登陆失败")
            }
        })
    }
    // 登陆验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('未登陆'))
    }
}
module.exports = handleUserRouter