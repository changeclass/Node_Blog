const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')


const handleUserRouter = (req, res) => {
    // 请求方式
    const method = req.method
    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        // const {username, password} = req.query

        const result = login(username, password)
        console.log(username,password,req.body)
        return result.then(data => {
            if (data.username) {
                // 操作Session
                req.session.username = data.username
                req.session.realName = data.realName
                return new SuccessModel("登陆成功")
            } else {
                return new ErrorModel("登陆失败")
            }
        })
    }
}
module.exports = handleUserRouter