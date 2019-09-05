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
module.exports.SetUpdateInfo=function(data,http)
{
    if(data.platform == "ios")
    {
        _IosUpdateInfo.version = data.version;
        _IosUpdateInfo.isReview = data.isReview;
        _IosUpdateInfo.forceUpdate = data.forceUpdate;
        _IosUpdateInfo.forceUpdateUrl = data.forceUpdateUrl;
        _IosUpdateInfo.version = data.version;
        _IosUpdateInfo.loginServerAdder=data.loginServerAdder;
    }
};