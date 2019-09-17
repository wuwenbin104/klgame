'use strict';
const express = require('express');
const db = require('./../Utils/Redisdb');
const app = express();
//用户登录
app.post('/UserLogin', require('body-parser').json(), function (req, res) {
    if (req.is('application/json') != false) {
        db.loadUserInfo(req.body.Accounts, req.body.Psw).then(
            function (DBloginResult) {
                OnUserLogin(DBloginResult, res);
            }
        );
    }
    else {
        res.status(400).send('Bad Request');
    }
});
app.get('/UserLogin', function (req, res) {
    db.loadUserInfo("a3", "a4").then(function (DBloginResult) {
        OnUserLogin(DBloginResult, res);
    });

});

var OnUserLogin = function (DBloginResult, rsp) {
    var loginResult = {};
    if (DBloginResult != null && DBloginResult.Nullity == 0) {
        var UserData = {};
        loginResult.status = 0;
        loginResult.HallAdder = DBloginResult.ServerAdder;
        loginResult.HallProt = DBloginResult.Port;
        //登录成功
        UserData.UserID = DBloginResult.UserID;
        UserData.GameID = DBloginResult.GameID;
        UserData.FaceID = DBloginResult.FaceID;
        UserData.VipLevel = DBloginResult.VipLevel;
        UserData.UserType = DBloginResult.UserType;
        UserData.AreaCode = DBloginResult.AreaCode;
        UserData.ToKen = DBloginResult.ToKen;
        UserData.NickName = DBloginResult.NickName;
        loginResult.UserData = UserData;
       
    }
    else if (DBloginResult != null && DBloginResult.Nullity == 1) {
        loginResult.status = 2;
        loginResult.Message = "账号已冻结"
    }
    else {
        //登录失败
        loginResult.status = 1;
        loginResult.Message = "账号或密码错误"
        console.log("login fail");
    }
    rsp.send(JSON.stringify(loginResult));
}
app.listen(3002);
