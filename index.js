/**
 * Created by 罗志伟 on 2016/10/25.
 */
//console.log("node.js 是前端使用的最好的后端语言");
'use strict';//javaScript 严格模式
var http = require('http');//request 表示引入 http是node.js 的负责网络请求的模块
//https 是加密的http请求协议
var https = require('https');
//引入文件处理模块
var fs = require('fs');
//创建文件，将helloworld写入文件
fs.writeFile('a.text','hello world',function(err){
    console.log("保存成功");
});
//引入路径模块
var path = require('path');
//cheerio 可以将一个html（dom）片段在服务器端环境运行起来一个jquery的效果，直接使用 jquery获得元素的方法获得内容
var cheerio = require('cheerio');


//请求某个网页
https.get('https://movie.douban.com/top250?start=0',function(res){
    //console.log(res);
    var html = '';
    var movies = [];
    //设置返回结果的字符集
    res.setEncoding('utf-8');
    //data发生在有数据到达的时候 执行回调 chunk 里面就是到达的数据
    res.on('data',function(chunk){
        html = html + chunk;
    });
    res.on('end',function(){
        //cheerio 将 load方法 ，将html变成dom可查询状态
       var $ = cheerio.load(html);
        //获取所有的item each方法
        $('.item').each(function(index,object){
            var picUrl = $('.pic img',this).attr('src');
            console.log(picUrl);

            downloadImg('./img/',picUrl);

        });


        //fs.writeFile('a.text',html,function(err){
        //    console.log('保存成功');
        //});
    })
});
//下载图片保存到img的目录下
function downloadImg(imgDir,url){
    https.get(url,function(res){
        var data = '';
        res.setEncoding('binary');
        res.on('data',function(chunk){
            data+=chunk;
        });
        res.on('end',function(){
            fs.writeFile(imgDir+path.basename(url),data,'binary',function(err){

                if(err){
                    console.log('下载失败');
                }else{
                    console.log('下载成功');
                }
            })
        })
    })
}
//生成器函数
//function *doSpider(x){
//
//}