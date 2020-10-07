const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端 第一个参数表示端口 第二个参数表示地址
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)

// 如果发生错误
redisClient.on('err',err=>{
    console.error(err)
})

function set(key,val){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}
function get(key){
    return new Promise(((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            // 如果没有此值
            if(val===null){
                resolve(null)
                return
            }
            // 如果是JSON格式对象那么转为JSON在返回，否则直接返回
            try {
                resolve(JSON.parse(val))
            }catch (ex){
                resolve(val)
            }
        })
    }))
}
module.exports = {
    set,get
}