const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

// 统一登陆验证的函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('未登陆'))
    }
}

const handleBlogRouter = (req, res) => {
    // 请求方式
    const method = req.method
    const id = req.query.id
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if (req.query.isadmin) {
            // 管理员验证
            const loginCheckRult = loginCheck(req)
            if (loginCheckRult) {
                // 未登陆
                return loginCheckRult
            }
            // 强行查询自己的博客
            author = req.session.username
        }
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }
        const result = updataBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel(val)
            } else {
                return new ErrorModel('更新博客失败')
            }
        })

    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheck
        }
        const author = req.session.username
        const result = delBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel("删除失败")
            }
        })
    }
}
module.exports = handleBlogRouter