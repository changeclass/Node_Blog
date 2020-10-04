const {
    getList,
    getDetail,
    newBlog,
    updataBlog,
    delBlog
} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    // 请求方式
    const method = req.method
    const id = req.query.id
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {

        const data = getDetail(id)
        return new SuccessModel(data)
    }
    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
       const result = updataBlog(id,req.body)
        if(result){
            return  new SuccessModel(result)
        }else{
            return new ErrorModel("更新失败")
        }
    }
    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if(result){
            return  new SuccessModel(result)
        }else{
            return new ErrorModel("删除失败")
        }
    }
}
module.exports = handleBlogRouter