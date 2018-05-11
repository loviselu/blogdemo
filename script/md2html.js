const fs = require('fs');
const path = require('path');
const marked = require('marked');
const blog = require('../db/blog');
const moment = require('moment');

const dir = path.resolve(__dirname,'../markdown')

const filelist = fs.readdirSync(dir) || []

// console.log(filelist)

//blog.sync();

filelist.forEach(fileName=>{

    let fileContent = new String(fs.readFileSync(path.join(dir,fileName)));
    let title = fileContent.substring(0,fileContent.search(/\r?\n/)).replace(/^#*\s*/,'');
    let content = fileContent.substr(fileContent.search(/\r?\n/));
    let dateStr = fileName.substring(0,fileName.indexOf('.'))

    var data = {
        title:title,
        content:marked(content),
        createdAt:moment(dateStr,"YYYYMMDDhhmm").toDate()
    }

    blog.create(data).then(result=>{
        console.log(`${fileName}入库成功`)
    }).catch(err=>{
        throw err
    })
})