const redis = require('redis')

// 创建客户端 第一个参数表示端口 第二个参数表示地址
const redisClient = redis.createClient(6379,'127.0.0.1')

// 如果发生错误
redisClient.on('err',err=>{
    console.error(err)
})
// 测试 建立一个键为myname值为zhangsan的记录 最后一个参数为回调函数，redis.print表示打印执行结果
redisClient.set('myname','zhangsan',redis.print)
// 获取键为myname的值
redisClient.get('myname',(err,val)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('val: ',val)
    // 退出链接
    redisClient.quit()
})