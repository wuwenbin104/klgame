const redis = require('redis');
const mysql = require('./../Utils/sqldb');
const { promisify } = require('util');
const client = redis.createClient(6380, "127.0.0.1");
const getAsync = promisify(client.get).bind(client);
client.on("error", function (err) {
    console.log("Error " + err);
});
var GetSysServerAdder = async function (vipLevel) {
    let key = "vip|" + vipLevel;
    let SysConfig = await getAsync(key);
    if (SysConfig == null) {
        let data = await mysql.loadSysConfig(vipLevel);
        if (data != null) {
            client.set(key, JSON.stringify(data));
            return data;
        }
    }
    else {
        let data = JSON.parse(SysConfig);
        return data;
    }
    return null;
}
//通过用户名密码加载用户信息
var loadUserInfo = async function (accounts, psw) {
    let key = "acc|"+accounts;
    let UserID = await getAsync(key);
    if (UserID == null) {
        var UserData = await mysql.loadUserInfo_accounts(accounts, psw);

        if (UserData != null) {
            var sysConfig = await GetSysServerAdder(UserData.VipLevel);
            if (sysConfig != null) {
                UserData.ServerAdder = sysConfig.ServerAdder;
                UserData.Port = sysConfig.Port;
            }
            else {
                UserData.ServerAdder = "0.0.0.0";
                UserData.Port = 0;
            }
            client.set(key, UserData.UserID);
            client.set(UserData.GameID, UserData.UserID);
            client.set(UserData.UserID, JSON.stringify(UserData));
            return UserData;
        }
    }
    else {
        let UserData_str = await getAsync(UserID);
        let UserData = JSON.parse(UserData_str);
        if (UserData.LogonPass == psw) {
            return UserData;
        }

    }
    //var result =  await client.get(key);
    //  console.log(result);
    //    client.get(key,function(err,reply){
    //     console.log(err);
    //         console.log(reply);
    //     });
    return null;
}
//UserID查用户信息
module.exports.GetUserInfo_UserID = function (UserID) {
    // return getAsync("userid_" + UserID).then(function (res) {
    //     console.log(res);
    // });
}
//账号密码查用户信息
module.exports.GetUserInfo_Accounts = function (Accounts, Password) {
    let key = Accounts + Password;
    var result = client.get(key);
    console.log(result);
}
//更新用户游戏
module.exports.updateUserScore = function (UserID, ChangeScore) {

}
//更新用户入场券
module.exports.updateUserTicket = function (UserID, ChangeTicket) {

}
module.exports.loadUserInfo = loadUserInfo;