// 博客列表
const getList = (author, keyword) => {
    // 返回假数据，但格式正确
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1601799298039,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1601799329721,
            author: '李四'
        }
    ]
}
// 博客详情
const getDetail = (id) => {
    // 返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1601799298039,
        author: '张三'
    }
}
// 新建博客
const newBlog = (blogData = {}) => {
    // blogData是一个博客对象，
    return {
        id: 3 // 表示新建博客的数据表ID
    }
}
// 更新博客
const updataBlog = (id, blogData = {}) => {
    // id为更新博客的ID
    // blogData为更新的对象
    return true
}
// 删除博客
const delBlog = (id)=>{
    // id 就是要删除博客的 ID
    return true
}
module.exports = {
    getList, getDetail, newBlog, updataBlog,delBlog
}