const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host:'localhost', // 主机 本地可使用localhost
    user:'root', // 数据库用户名
    password:'root', // 数据库用户的密码
    port:'3306', // 数据库端口号，默认3306
    database:'myblog' // 需要连接的数据库
})
// 开始连接
con.connect()
// 定义查询语句
// const sql = 'select * from users;'
const sql = 'insert into users (username,`password`,realname) values("wangwu","123","王五");'
// 创建查询对象
con.query(sql,(err,result)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(result)
    // 返回一个列表，其元素是RowDataPacket对象
})
// 关闭连接
con.end()