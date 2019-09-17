var mysql = require('mysql');
var pool = null;
pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'qpgameuserdb'
});


var querySql = function (sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

// module.exports.connectMySqlDB= function()
// {


// };
module.exports.loadAllUserInfo = function () {

};
var loadUserInfo_accounts = async function (accounts, psw) {
  var sql = "select  UserID,GaemID,Accounts,LogonPass,Nullity,FaceID,VipLevel,UserType,AreaCode,ToKen,RegisterDate,RegisterIP,RegisterMachine,NickName from accountsinfo ";
  sql += " where  Accounts=? and LogonPass=?";
  var resultData = await querySql(sql, [accounts, psw]);
  if (resultData.length == 0) {
    return null;
  }
  //构造用户信息
  var UserData = {};
  UserData.UserID = resultData[0].UserID;
  UserData.GameID = resultData[0].GaemID;
  UserData.Accounts = resultData[0].Accounts;
  UserData.LogonPass = resultData[0].LogonPass;
  UserData.Nullity = resultData[0].Nullity;
  UserData.FaceID = resultData[0].FaceID;
  UserData.VipLevel = resultData[0].VipLevel;
  UserData.UserType = resultData[0].UserType;
  UserData.AreaCode = resultData[0].AreaCode;
  UserData.ToKen = resultData[0].ToKen;
  UserData.RegisterDate = resultData[0].RegisterDate;
  UserData.RegisterIP = resultData[0].RegisterIP;
  UserData.RegisterMachine = resultData[0].RegisterMachine;
  UserData.NickName = resultData[0].NickName;
  console.log("mysql get data");
  console.log(UserData);
  return UserData;
};
var loadSysConfig = async function(VipLevel)
{
  var sql = "select ServerAdder,Port from qpserverinfodb.SysServerAdder where vipLevel=? and Nullity=0";
  var resultData = await querySql(sql, [VipLevel]);
  if (resultData.length == 0) {
    return null;
  }
  var sysConfig = {};
  sysConfig.ServerAdder = resultData[0].ServerAdder;
  sysConfig.Port = resultData[0].Port;
  return  sysConfig;
}
module.exports.RegisterUser = function (UserRegInfo) {
  //1.查询账号是否已经被注册
  // var sql ="select UserID from accountsinfo where Accounts='"+UserRegInfo.Accounts+"'";
  // MySql_client.query(sql,function(error,result){
  //   if(err){
  //     console.log('[SELECT ERROR] - ',err.message);
  //     return;
  //   }
  //    console.log('--------------------------SELECT----------------------------');
  //    console.log(result);
  //    console.log('------------------------------------------------------------\n\n');  
  // });
};
module.exports.loadUserInfo_accounts = loadUserInfo_accounts;
module.exports.loadSysConfig = loadSysConfig;
