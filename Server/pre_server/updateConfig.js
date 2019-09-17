var _IosUpdateInfo ={
   //是否处于审核状态
   isReview: false,
   //是否需要重新安装
   forceUpdate:false,
   //更新地址
   forceUpdateUrl:"",
   //客户端版本号
   version:"",
   //登陆服务器地址
   loginServerAdder:""
};
var _androidUpdateInfo  ={
    //是否处于审核状态
    isReview: false,
    //是否需要重新安装
    forceUpdate:false,
    //更新地址
    forceUpdateUrl:"",
    //客户端版本号
    version:"",
    //登陆服务器地址
    loginServerAdder:""
};
var _H5UpdateInfo={
    //是否处于审核状态
    isReview: false,
    //是否需要重新安装
    forceUpdate:false,
    //更新地址
    forceUpdateUrl:"",
    //客户端版本号
    version:"",
    //登陆服务器地址
    loginServerAdder:""
};
//获取在线配置
module.exports.GetUpDataInfo=function(data,http)
{
    var UpdataInfo={
        isSuccess:_isSuccess,
        isReview : false,
        forceUpdate : false,
        forceUpdateUrl : _forceUpdateUrl,
        version : "1.0.0",
        loginServerAdder:"",
    };
    return UpdataInfo;
};
//动态更新在线配置
module.exports.SetUpdateInfo=function(data,http)
{
    if(data.platform == "ios")
    {
        _IosUpdateInfo.isReview = data.isReview;
        _IosUpdateInfo.forceUpdate = data.forceUpdate;
        _IosUpdateInfo.forceUpdateUrl = data.forceUpdateUrl;
        _IosUpdateInfo.version = data.version;
        _IosUpdateInfo.loginServerAdder=data.loginServerAdder;
    }
    else if(data.platform == "android")
    {
        _androidUpdateInfo.isReview = data.isReview;
        _androidUpdateInfo.forceUpdate = data.forceUpdate;
        _androidUpdateInfo.forceUpdateUrl = data.forceUpdateUrl;
        _androidUpdateInfo.version = data.version;
        _androidUpdateInfo.loginServerAdder=data.loginServerAdder;
    }
    else if(data.platform == "h5")
    {
        _H5UpdateInfo.isReview = data.isReview;
        _H5UpdateInfo.forceUpdate = data.forceUpdate;
        _H5UpdateInfo.forceUpdateUrl = data.forceUpdateUrl;
        _H5UpdateInfo.version = data.version;
        _H5UpdateInfo.loginServerAdder=data.loginServerAdder;
    }
    //保存到DB

};
//加载在线配置
module.exports.LoadUpdateInfo=function(){

};
