const fs = require('fs')
const path = require('path')

const fullFileName = path.resolve(__dirname, 'files', 'a.json')

function getContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(JSON.parse(data.toString()))
        })
    })
    return promise
}


async function test() {
    var a =  await getContent(fullFileName)
    return a
}

test().then(data=>{
    console.log(data)
});