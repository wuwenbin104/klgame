'use strict';
//前置服务器，用户从这里获取需要连接的登陆服务器信息
const express = require('express');

const app = express();

//获取当前版本的信息
app.post('/GetVersionInfo',require('body-parser').json(),function(req,res){
    if(req.is('application/json') != false)
    {
        var returnData = require("./updateConfig").GetUpDataInfo(req.body,res);
        console.log(returnData);
    }
    else{
        res.status(400).send('Bad Request');
    }
});
app.post('/SetUpdateConfig',require('body-parser').json(),function(req,res){
    if(req.is('application/json') != false)
    {
        require("./updateConfig").SetUpdateInfo(req.body,res);
        
    }
    else{
        res.status(400).send('Bad Request');
    }
});
app.listen(3001);


