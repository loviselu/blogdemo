const url = require('url');
const qs = require('querystring');
const blog = require('../db/blog')

function returnJSON(res,code,data){

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        code:code,
        data:data
    }))

}

module.exports = function(req,res){

    let urlObj = url.parse(req.url);
    let method = req.method;
    let query = qs.parse(urlObj.query) || {};

    //list all
    if(method === "GET" && !query.id){

        blog.findAll().then(result=>{
            returnJSON(res,0,result)
        }).catch(err=>{
            console.log(err);
            returnJSON(res,-2,null)
        })
    
    //get one
    }else if(method === "GET" && query.id){
        blog.findById(query.id).then(result=>{
            returnJSON(res,0,result)
        }).catch(err=>{
            console.log(err);
            returnJSON(res,-2,null)
        })
    }
}