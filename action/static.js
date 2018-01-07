
const fs = require('fs');
const url = require('url')
const path = require('path');

const staticPath = path.resolve(__dirname,'../static');
const mineTypeMap = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'application/javascript',
    '.ttf':'application/x-font-ttf',
    '.woff':'pplication/x-font-woff',
}
const defaultPath = '/home.html';

module.exports = function(req,res){

    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;

    if(pathname === '/'){
        pathname = defaultPath;
    }

    let realPath = path.resolve(staticPath,'.'+pathname);


    //保证读的文件是在staticPath文件夹下
    if(realPath.indexOf(staticPath) !== 0){
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end()
        return;
    }

    fs.access(realPath,fs.constants.R_OK,function(err,stats){
        if(err){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end()
            return;
        }

        fs.readFile(realPath,function(err,data){
            if(err){
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end()
                return;
            }

            let ext = path.extname(pathname);

            res.statusCode = 200;
            res.setHeader('Content-Type', mineTypeMap[ext] || 'application/octet-stream');
            res.end(data)
        })
    })

}