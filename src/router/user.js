const {loginCheck} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleUserRouter = (req, res) => {
    // 请求方式
    const method = req.method

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username,password} = req.body
        const result = loginCheck(username,password)
        if(result){
            return  new SuccessModel(result)
        }else{
            return new ErrorModel("登陆失败")
        }
    }

}
module.exports = handleUserRouter