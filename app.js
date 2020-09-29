const serverHandle = (req,res)=>{
    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')

    const resData = {
        name:'XiaoKang',
        site:'xiaokang.me',
        env:process.env.NODE_ENV
    }
    res.end(Json.stringify(resData))
}
module.exports = serverHandle