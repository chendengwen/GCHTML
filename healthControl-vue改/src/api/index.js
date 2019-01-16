const baseURL1 = "http://test-hmmobile.kmhealth360.com";
//const baseURL1 = "http://mobile.hmtest.kmhealthcloud.cn:8165";
const baseUrl2 = "http://testdrugstore.kmhealth360.com";

let api = {
  phone:  baseUrl2 + "/api/customer/VerificationCode?phone=",   //获取验证码
  phoneVf: baseUrl2 + "/api/customer/BindWechatPhone",    //上传验证码,绑定手机
  bingPhone: baseUrl2 + "/api/customer/GetIsBindPhone",   //是否绑定手机
  getWebTokenApi: baseUrl2 + "/api/WeiXin/GetWebAccessToken",    //获取微信token

  getReport: baseUrl2 + "/api/customer/GetHealthEvaluate",  //获取报告信息
  getToken: baseUrl2 + "/api/WeiXin/GetMobileToken", //获取token
  DataIntegrationApi: baseUrl2 + "/api/customer/DataIntegration",   //整合档案


  BloodSugarReport: baseURL1 + "/api/DailyMonitor/GetBloodSugarReport", //血糖报告
  BloodPressureReport: baseURL1 + "/api/DailyMonitor/GetBloodPressureReport", //血糖报告

  BloodPressureApi: baseURL1 + "/api/DailyMonitor/GetBloodPressureRecord",    //获取血压信息
  BloodSugarApi: baseURL1 + "/api/DailyMonitor/GetBloodSugarRecord",    //获取血糖信息
  HeartRateApi: baseURL1 + "/api/DailyMonitor/GetHeartRateRecord",    //获取心率信息
  StepApi: baseURL1 + "/api/DailyMonitor/GetStepReocrd",    //获取步数信息
  BloodOxygenApi: baseURL1 + "/api/DailyMonitor/GetBloodOxygenRecord",    //获取血氧信息
  VitalCapacityApi: baseURL1 + "/api/DailyMonitor/GetVitalCapacityRecord",    //获取肺活量信息

  SaveBloodPressureApi: baseURL1 + "/api/DailyMonitor/SaveBloodPressure",   //保存血压POST
  SaveBloodSugarApi: baseURL1 + "/api/DailyMonitor/SaveBloodSugar",   //保存血糖POST
  SaveHeartRateApi: baseURL1 + "/api/DailyMonitor/SaveHeartRate",   //保存心率POST
  SaveStepRecordApi: baseURL1 + "/api/DailyMonitor/SaveStepRecord",   //保存步数POST
  SaveBloodOxygenRecordApi: baseURL1 + "/api/DailyMonitor/SaveBloodOxygenRecord",   //保存血氧POST
  SaveVitalCapacityRecordApi: baseURL1 + "/api/DailyMonitor/SaveVitalCapacityRecord",   //保存肺活量POST

  HealthTypeApi: baseURL1 + "/api/HealthType",   //获取疾病类型

  FamilyHistoryApi: baseURL1 + "/api/FamilyHistory",  //提交家族史病
  PersonDesease: baseURL1 + "/api/PersonDesease",   //疾病史

  SavePersonSmokeApi: baseURL1 + "/api/LifeStyle/SavePersonSmoke",  //保存吸烟数据
  SavePersonDrinkApi: baseURL1 + "/api/LifeStyle/SavePersonDrink",   //保存饮酒数据
  SavePersonEatHabitApi: baseURL1 + "/api/LifeStyle/SavePersonEatHabit",  //保存饮食习惯
  SavePersonSportApi: baseURL1 + "/api/LifeStyle/SavePersonSport",        //保存运动信息

  GetPersonSmokeApi: baseURL1 + "/api/LifeStyle/GetPersonSmoke",    //获取吸烟信息
  GetPersonDrinkApi: baseURL1 + "/api/LifeStyle/GetPersonDrink",    //获取饮酒信息
  GetPersonEatHabitApi: baseURL1 + "/api/LifeStyle/GetPersonEatHabit",   //获取饮食习惯信息
  GetPersonSportApi: baseURL1 + "/api/LifeStyle/GetPersonSport",    //获取运动信息

  GetPersonInfoApi: baseURL1 + "/api/Person/GetPersonInfo",   //获取个人基本信息
  SavePerson: baseURL1 + "/api/Person",   //保存个人基本信息

  GetHealthInfoComplete: baseURL1 + "/api/Person/GetHealthInfoComplete",   //获取健康史完整度
  GetLifeComplete: baseURL1 + "/api/Person/GetLifeComplete",     //获取生活习惯完整度

  GetWeChatPersonCompleteApi: baseURL1 + "/api/Person/GetWeChatPersonComplete"   //获取微信公众号首页信息的完整度

};

export default api;
