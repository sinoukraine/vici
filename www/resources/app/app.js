window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT3 = 'DD/MM/YYYY HH:mm:ss';
window.COM_TIMEFORMAT4 = 'YYYY-MM-DD';

const API_DOMIAN1 = "https://api.m2mglobaltech.com/";
const API_DOMIAN2 = "https://vici19.quiktrak.co/";

const API_DOMAIN3 = "https://app.phonetrack.co/";
const API_DOMAIN4 = "https://maps.google.com/";
const API_DOMIAN7 = "https://nominatim.sinopacific.com.ua/";
const API_DOMIAN8 = "https://nominatim.openstreetmap.org/";

/*const API_DOMIAN1 = "https://api.m2mglobaltech.com/QuikTrak/V1/";
const API_DOMIAN2 = "https://api.m2mglobaltech.com/Quikloc8/V1/";
const API_DOMIAN3 = "https://api.m2mglobaltech.com/QuikProtect/V1/Client/";

const API_DOMIAN5 = "https://ss.sinopacific.com.ua/";
const API_DOMIAN6 = "https://nomad.sinopacific.com.ua/";
const API_DOMIAN7 = "https://nominatim.sinopacific.com.ua/";
const API_DOMIAN8 = "https://nominatim.openstreetmap.org/";
const API_DOMIAN9 = "https://upload.quiktrak.co/";*/

const API_URL = {};

API_URL.REGISTRATION = API_DOMIAN2 + 'Contact/Register';
API_URL.PREREGISTRATION = API_DOMIAN2 + 'Contact/PreRegister';
//API_URL.LOGIN = API_DOMIAN2 + 'Contact/Login';
API_URL.LOGIN = API_DOMIAN2 + 'Contact/Login';
API_URL.REFRESH_TOKEN = API_DOMIAN2 + 'Contact/Auth';
//API_URL.UPLOAD_LINK = API_DOMIAN2 + 'Position/Upload';
API_URL.UPLOAD_LINK = 'http://test.m2mdata.co:5000/' + 'Position/Upload';



//API_URL.LOGIN = API_DOMIAN1 + 'QuikTrak/V1/User/Auth';
API_URL.LOGOUT = API_DOMIAN1 + 'QuikTrak/V1/User/Logoff2';
API_URL.EDIT_ACCOUNT = API_DOMIAN1 + 'QuikTrak/V1/User/Edit';
API_URL.NEW_PASSWORD = API_DOMIAN1 + 'QuikTrak/V1/User/Password';

API_URL.VERIFY_BY_EMAIL = API_DOMIAN1 + "QuikProtect/V1/Client/VerifyCodeByEmail";
API_URL.FORGOT_PASSWORD = API_DOMIAN1 + "QuikProtect/V1/Client/ForgotPassword";

API_URL.VERIFY_DEVICE = API_DOMIAN1 + 'Common/V1/Activation/Verify';
//API_URL.UPLOAD_LINK = API_DOMIAN1 + 'QuikTrak/V1/Device/UploadGPS2';//http://194.247.12.103:5000/Position/Upload


API_URL.SHARE_POSITION = API_DOMAIN4 + 'maps';
API_URL.ADD_NEW = API_DOMAIN3 + 'vici.activation/activate';
//API_URL.REGISTER = API_DOMAIN3 + 'vici.activation/';
API_URL.REGISTER = API_DOMAIN3 + 'vici.activation/register';

API_URL.GET_ALL_POSITIONS = API_DOMIAN1 + "QuikTrak/V1/Device/GetPosInfos2";

//API_URL.REFRESH_TOKEN = API_DOMIAN1 + "User/RefreshToken";

API_URL.SET_COVID19_STATUS = API_DOMIAN1 + "PhoneProtect/V1/Client/SetNCoV19";
API_URL.GET_COVID19_STATUS = API_DOMIAN1 + "PhoneProtect/V1/Client/GetNCoV19";


//https://api.m2mglobaltech.com/QuikProtect/V1/Client/

Framework7.request.setup({
    timeout: 40*1000
});

const AppEvents = new Framework7.Events();
//const AppEvents = new Framework7.Events();
//const AssetUpdateEvents = new Framework7.Events();

let bgGeo;
let UpdateAssetsPosInfoTimer = false;
let POSINFOASSETLIST = {};
let push;
// Dom7
let $$ = Dom7;

// Theme
let theme = 'md';
if (Framework7.device.ios) {
    theme = 'ios';
}

let htmlTemplate = $$('script#loginScreenTemplate').html();
let compiledTemplate = Template7.compile(htmlTemplate);
//let withContext = compiledTemplate(dealerData);
$$('#app').append(compiledTemplate({RegisterUrl: API_URL.REGISTER}));

// Init App
let app = new Framework7({
    id: 'com.sinopacific.phonetrack',
    root: '#app',
    name: 'ViCi',
    theme: theme,
    view: {
        stackPages: true,
    },
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
    },
    notification:{
        //title: self.name,
        icon: '<img src="resources/images/favicon.png" class="icon-notification" alt="" />',
        closeTimeout: 3000,
    },
    data: function () {
        return {
            logoDialog: 'resources/images/logo.jpg',
            MaxMapPopupWidth: 280,
            UTCOFFSET: moment().utcOffset(),
            Covid19Status: LANGUAGE.COM_MSG041, //untested
            Covid19StatusType: 1,
        };
    },
    on: {
        routerAjaxStart: function () {
            this.progressbar.show('gray');
        },
        routerAjaxComplete: function () {
            this.progressbar.hide();
        },
        init: function () {
            let self = this;

                if(window.hasOwnProperty("cordova")){
                    window.permissions = cordova.plugins.permissions;

                    //fix app images and text size
                    if (window.MobileAccessibility) {
                        window.MobileAccessibility.usePreferredTextZoom(false);
                    }
                    if (StatusBar) {
                        StatusBar.styleDefault();
                    }

                    self.methods.handleAndroidBackButton();
                    self.methods.handleKeyboard();

                    self.methods.setupPush();
                    self.methods.setGeolocationPlugin();



                   /* document.addEventListener("resume", function () {
                        AppEvents.emit('appResume');
                    }, false);
                    document.addEventListener("pause", function () {
                        AppEvents.emit('appPause');
                    }, false);*/
                }



            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.login();
            }
            else {
                self.methods.logout();
            }
        }
    },
    methods: {
        capitalize: function(s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            try{let ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        isObjEmpty: function(obj) {
            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (let key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        hideKeyboard: function() {
            document.activeElement.blur();
            $$("input").blur();
        },
        guid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        getPlusInfo: function () {
            let uid = this.methods.guid();
            if (window.device) {
                if (!localStorage.PUSH_MOBILE_TOKEN) {
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                }
                localStorage.PUSH_APP_KEY = BuildInfo.packageName;
                localStorage.PUSH_APPID_ID = BuildInfo.packageName;
                localStorage.DEVICE_TYPE = device.platform;
            } else {
                if (!localStorage.PUSH_MOBILE_TOKEN)
                    localStorage.PUSH_MOBILE_TOKEN = uid;
                if (!localStorage.PUSH_APP_KEY)
                    localStorage.PUSH_APP_KEY = uid;
                if (!localStorage.PUSH_DEVICE_TOKEN)
                    localStorage.PUSH_DEVICE_TOKEN = uid;
                //localStorage.PUSH_DEVICE_TOKEN = "75ba1639-92ae-0c4c-d423-4fad1e48a49d"
                localStorage.PUSH_APPID_ID = 'android.app.quiktrak.eu.vici';
                localStorage.DEVICE_TYPE = "android.app.quiktrak.eu.vici";
            }
        },
        clearUserInfo: function(){
            let self = this;

            let deviceToken = localStorage.PUSH_DEVICE_TOKEN;
            //let mobileToken = localStorage.PUSH_MOBILE_TOKEN;
            let notifications = self.methods.getFromStorage('notifications');
            //let mapSettings = self.methods.getFromStorage('mapSettings');
            //let trackingConfig = self.methods.getFromStorage('trackingConfig');
            let panicConfig = self.methods.getFromStorage('panicConfig');
            let emList = self.methods.getFromStorage('emergencyList');

            localStorage.clear();

            //self.methods.unregisterPush();
            /*if (notifications) {
                localStorage.setItem("COM.QUIKTRAK.NEW.NOTIFICATIONS", JSON.stringify(notifications));
            }*/
            /*if (mapSettings) {
                self.methods.setInStorage({ name: 'mapSettings', data: mapSettings });
            }*/
            if (deviceToken) {
                localStorage.PUSH_DEVICE_TOKEN = deviceToken;
            }
            /*if (mobileToken) {
                localStorage.PUSH_MOBILE_TOKEN = mobileToken;
            }*/

            /*if (UpdateAssetsPosInfoTimer) {
                clearInterval(UpdateAssetsPosInfoTimer);
            }*/
            /*if (!self.methods.isObjEmpty(trackingConfig)){
                self.methods.setInStorage({name:'trackingConfig', data:trackingConfig});
            }*/
            if (!self.methods.isObjEmpty(panicConfig)){
                self.methods.setInStorage({name:'panicConfig', data:panicConfig});
            }
            if (!self.methods.isObjEmpty(emList)){
                self.methods.setInStorage({name:'emergencyList', data:emList});
            }


            /*let data = {
                MinorToken: self.data.MinorToken,
                deviceToken: deviceToken,
                mobileToken: mobileToken,
            };
            self.request.promise.get(API_URL.LOGOUT, data, 'json')
                .then(function (result) {
                    //console.log(result);
                });*/
            self.utils.nextTick(()=>{
                AppEvents.emit('signedOut');
                mainView.router.back('/',{force: true});
            }, 1000);
        },
        logout: function(){
            let self = this;
            if (localStorage.ACCOUNT) {
                $$("input[name='username']").val(localStorage.ACCOUNT);
            }

            self.methods.clearUserInfo();

            self.loginScreen.open('.login-screen');
        },
        login: function(){
            let self = this;
            /*if(window.hasOwnProperty("cordova")){
                self.methods.setupPush();
            }*/
            self.methods.getPlusInfo();

            let account = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                //account: account.val() ? account.val() : localStorage.ACCOUNT,
                PhoneNumber: account.val() ? account.val().replace('+', '').trim() : localStorage.ACCOUNT.replace('+', '').trim(),
                Password: password.val() ? password.val() : localStorage.PASSWORD,
                PushToken: localStorage.PUSH_DEVICE_TOKEN ? localStorage.PUSH_DEVICE_TOKEN : '',
                /*appKey: localStorage.PUSH_APP_KEY ? localStorage.PUSH_APP_KEY : '',
                mobileToken: localStorage.PUSH_MOBILE_TOKEN ? localStorage.PUSH_MOBILE_TOKEN : '',
                deviceToken: localStorage.PUSH_DEVICE_TOKEN ? localStorage.PUSH_DEVICE_TOKEN : '',
                deviceType: localStorage.DEVICE_TYPE ? localStorage.DEVICE_TYPE : '',*/
            };

            //alert(JSON.stringify(data));

            self.dialog.progress();
            self.request.promise.post(API_URL.LOGIN, data, 'json')
                .then(function (result) {
                    //alert(JSON.stringify(result.data));
                    console.log(result.data);
                    if(result.data && result.data.majorCode === '000') {
                        if(account.val()) {
                            localStorage.ACCOUNT = account.val().trim().toLowerCase();
                            localStorage.PASSWORD = password.val();
                        }
                        password.val(null);

                        self.data.Token = result.data.data.Token;

                        self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.data
                        });

                        AppEvents.emit('signedIn', result.data.data);

                        /*self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.Data.User
                        });
                        self.data.MinorToken = result.data.Data.MinorToken;
                        self.data.MajorToken = result.data.Data.MajorToken;

                        let assetListObj = self.methods.setAssetList({list: result.data.Data.Devices});

                        AppEvents.emit('signedIn', result.data.Data.User);

                        UpdateAssetsPosInfoTimer = setInterval(function(){
                            self.methods.getAssetListPosInfo(assetListObj, 1);  // '1' - means update
                        }, 30*1000);*/

                        self.utils.nextFrame(()=>{
                            //self.methods.getAssetListPosInfo(assetListObj);
                            self.loginScreen.close();
                        });

                        self.utils.nextFrame(()=>{
                            self.loginScreen.close();
                            self.dialog.close();
                            self.dialog.alert(localStorage.PUSH_DEVICE_TOKEN);
                        });

                    }else {
                        self.utils.nextFrame(()=>{
                            self.dialog.close();
                            self.dialog.alert(LANGUAGE.PROMPT_MSG013);
                            self.loginScreen.open('.login-screen');
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    self.dialog.close();
                    self.loginScreen.open('.login-screen');
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                    window.loginDone = 1;
                });
        },
        afterLogin: function(data){

        },
        getFromStorage: function(name){
            let ret = [];
            let str = '';
            if (name) {
                switch (name){
                    case 'userInfo':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.USERINFO");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'trackingConfig':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG");
                        if(str) {
                            ret = JSON.parse(str);
                        }else {
                            ret = {};
                        }
                        break;

                    case 'panicConfig':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.PANICCONFIG");
                        if(str) {
                            ret = JSON.parse(str);
                        }else {
                            ret = {};
                        }
                        break;

                    case 'emergencyList':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.EMERGENCYLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'notifications':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    default:
                        self.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(name);
            }
            return ret;
        },
        setInStorage: function(params){
            let self = this;
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'userInfo':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.USERINFO", JSON.stringify(params.data));
                        break;

                    case 'trackingConfig':
                        if (!this.methods.isObjEmpty(params.data)){
                            let savedConfig = this.methods.getFromStorage('trackingConfig');
                            const keys = Object.keys(params.data);
                            for (const key of keys) {
                                savedConfig[key] = params.data[key];
                            }
                            localStorage.setItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG", JSON.stringify(savedConfig));
                        }
                        break;

                    case 'panicConfig':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.PANICCONFIG", JSON.stringify(params.data));
                        break;

                    case 'emergencyList':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.EMERGENCYLIST", JSON.stringify(params.data));
                        break;
                    case 'notifications':
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS", JSON.stringify(params.data));
                        break;

                    default:
                        self.dialog.alert('There is no function associated with this name - '+params.name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(params);
            }
        },
        customNotification: function(params){
            let self = this;
            self.notification.create({
                title: self.name,
                //titleRightText: 'now',
                subtitle: params.title ? params.title : '',
                text: params.text ? params.text : '',
                closeTimeout: params.hold ? params.hold : 3000,
                closeOnClick: true,
                //closeButton: true,
                on: {
                    close: function (notification) {
                        //notification.$el.remove();
                        if(params.callback instanceof Function){
                            params.callback();
                        }
                    }
                },

            }).open();
        },
        customDialog: function(params){
            let self = this;
            let modalTex = '';
            let buttons = !params.buttons ? [{ text: LANGUAGE.COM_MSG017 }] : params.buttons;
            if (params.title) {
                modalTex += '<div class="custom-modal-title text-color-red">'+ params.title +'</div>';
            }
            if (params.text) {
                modalTex += '<div class="custom-modal-text">'+ params.text +'</div>';
            }
            self.dialog.create({
                title: '<div class="custom-modal-logo-wrapper"><img class="custom-modal-logo" src="'+ self.data.logoDialog +'" alt=""/></div>',
                text: modalTex,
                verticalButtons: buttons.length > 2,
                buttons: buttons
            }).open();
        },

        setAssetList: function(params={}){
            let self = this;
            let ret = '';

            if (params.list && params.list.length) {
                let ary = {};
                for(let i = 0; i < params.list.length; i++) {
                    let index = 0;
                    ary[params.list[i][1]] = {
                        Id: params.list[i][index++],
                        IMEI: params.list[i][index++],
                        Name: params.list[i][index++],
                        TagName: params.list[i][index++],
                        Icon: params.list[i][index++],
                        Unit: params.list[i][index++],
                        InitMileage: params.list[i][index++],
                        InitAcconHours: params.list[i][index++],
                        State: params.list[i][index++],
                        ActivateDate: params.list[i][index++],
                        PRDTName: params.list[i][index++],
                        PRDTFeatures: params.list[i][index++],
                        PRDTAlerts: params.list[i][index++],
                        Describe1: params.list[i][index++],
                        Describe2: params.list[i][index++],
                        Describe3: params.list[i][index++],
                        Describe4: params.list[i][index++],
                        Describe5: params.list[i][index++],
                        _FIELD_FLOAT1: params.list[i][index++],
                        _FIELD_FLOAT2: params.list[i][index++],
                        _FIELD_FLOAT7: params.list[i][index++],
                        Describe7: params.list[i][index++],
                        AlarmOptions: params.list[i][index++],
                        _FIELD_FLOAT8: params.list[i][index++],
                        StatusNew: params.list[i][index++],
                        _FIELD_INT2: params.list[i][index++],
                        GroupCode: params.list[i][index++],
                        Registration: params.list[i][index++],
                        StockNumber: params.list[i][index++],
                        MaxSpeed: params.list[i][index++],
                        MaxSpeedAlertMode: params.list[i][index++],
                    };
                    if (POSINFOASSETLIST && POSINFOASSETLIST[params.list[i][1]]) {
                        POSINFOASSETLIST[params.list[i][1]].StatusNew =  ary[params.list[i][1]].StatusNew;
                    }
                }
                ret = ary;
                localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST", JSON.stringify(ary));
            }else if(params.device){
                let list = self.methods.getFromStorage('assetList');

                if (POSINFOASSETLIST[params.device.IMEI]) {
                    POSINFOASSETLIST[params.device.IMEI].Name = list[params.device.IMEI].Name = params.device.name;
                    POSINFOASSETLIST[params.device.IMEI].TagName = list[params.device.IMEI].TagName = params.device.tag;
                    POSINFOASSETLIST[params.device.IMEI].Registration = list[params.device.IMEI].Registration = params.device.registration;
                    POSINFOASSETLIST[params.device.IMEI].Unit = list[params.device.IMEI].Unit = params.device.speedUnit;
                    POSINFOASSETLIST[params.device.IMEI].InitMileage = list[params.device.IMEI].InitMileage = params.device.initMileage;
                    POSINFOASSETLIST[params.device.IMEI].InitAcconHours = list[params.device.IMEI].InitAcconHours = params.device.initAccHours;
                    POSINFOASSETLIST[params.device.IMEI].Describe1 = list[params.device.IMEI].Describe1 = params.device.attr1;
                    POSINFOASSETLIST[params.device.IMEI].Describe2 = list[params.device.IMEI].Describe2 = params.device.attr2;
                    POSINFOASSETLIST[params.device.IMEI].Describe3 = list[params.device.IMEI].Describe3 = params.device.attr3;
                    POSINFOASSETLIST[params.device.IMEI].Describe4 = list[params.device.IMEI].Describe4 = params.device.attr4;
                    POSINFOASSETLIST[params.device.IMEI].GroupCode = list[params.device.IMEI].GroupCode = params.device.groupCode;

                    if (params.device.stockNumber) {
                        POSINFOASSETLIST[params.device.IMEI].StockNumber = list[params.device.IMEI].StockNumber = params.device.stockNumber;
                    }
                    if (params.device.icon) {
                        POSINFOASSETLIST[params.device.IMEI].Icon = list[params.device.IMEI].Icon = params.device.icon;
                    }
                    if (params.device.MaxSpeed) {
                        POSINFOASSETLIST[params.device.IMEI].MaxSpeed = list[params.device.IMEI].MaxSpeed = params.device.MaxSpeed;
                    }


                    ret = list[params.device.IMEI];
                }else{
                    list[params.device.IMEI].Name = params.device.name;
                    list[params.device.IMEI].TagName = params.device.tag;
                    list[params.device.IMEI].Registration = params.device.registration;
                    list[params.device.IMEI].Unit = params.device.speedUnit;
                    list[params.device.IMEI].InitMileage = params.device.initMileage;
                    list[params.device.IMEI].InitAcconHours = params.device.initAccHours;
                    list[params.device.IMEI].Describe1 = params.device.attr1;
                    list[params.device.IMEI].Describe2 = params.device.attr2;
                    list[params.device.IMEI].Describe3 = params.device.attr3;
                    list[params.device.IMEI].Describe4 = params.device.attr4;
                    list[params.device.IMEI].GroupCode = params.device.groupCode;

                    if (params.device.stockNumber) {
                        list[params.device.IMEI].StockNumber = params.device.stockNumber;
                    }
                    if (params.device.icon) {
                        list[params.device.IMEI].Icon = params.device.icon;
                    }
                    if (params.device.MaxSpeed) {
                        list[params.device.IMEI].MaxSpeed = params.device.MaxSpeed;
                    }
                }

                localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST", JSON.stringify(list));

            }else if(params.objects){
                localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST", JSON.stringify(params.objects));
            }

            //console.log(ary);
            return ret;
        },
        getAssetListPosInfo: function(listObj, update= false, callback = false){
            let self = this;
            //console.log(self)
            let codes = '';
            let keys = Object.keys(listObj);
            let assetList = [];
            for (const key of keys) {
                codes += listObj[key].Id+',';
                assetList.push(listObj[key]);
            }
            if (codes) {
                codes = codes.slice(0, -1);
            }


            let url = self.utils.serializeObject({MinorToken: self.data.MinorToken, MajorToken: self.data.MajorToken});

            url = API_URL.GET_ALL_POSITIONS + '?' + url;

            let data = {
                codes: codes,
            };
            self.request.promise.post(url, data, 'json')
                .then(function (result) {
                    if(result.data.MajorCode === '000') {
                        if (!self.methods.isObjEmpty(result.data.Data)) {
                            let posData = '';
                            let imei = '';
                            let protocolClass = '';
                            let deviceInfo = '';

                            if (!update) {
                                for (let i = result.data.Data.length - 1; i >= 0; i--) {
                                    posData = result.data.Data[i];
                                    imei = posData[1];
                                    protocolClass = posData[2];
                                    deviceInfo = listObj[imei];

                                    if (!self.methods.isObjEmpty(deviceInfo) && deviceInfo.IMEI === imei){
                                        POSINFOASSETLIST[imei] = Protocol.ClassManager.get(protocolClass, deviceInfo);
                                        POSINFOASSETLIST[imei].initPosInfo(posData);
                                    }
                                }
                            }else{
                                for (let i = result.data.Data.length - 1; i >= 0; i--) {
                                    posData = result.data.Data[i];
                                    imei = posData[1];

                                    if (!self.methods.isObjEmpty(POSINFOASSETLIST[imei]) && !POSINFOASSETLIST[imei].posInfo.positionTime || !self.methods.isObjEmpty(POSINFOASSETLIST[imei]) && posData[5] >= POSINFOASSETLIST[imei].posInfo.positionTime._i ) {
                                        POSINFOASSETLIST[imei].initPosInfo(posData);
                                    }
                                }
                            }
                            AppEvents.emit('positionUpdateReceived');
                        }
                    }
                    /*if (!update) {
                        self.dialog.close();
                        AppEvents.emit('signedIn', assetList);
                    }*/
                    if (callback instanceof Function) {
                        callback();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    window.loginDone = 1;
                    /*if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }*/
                });
        },

        clickOnPanicButton: function () {
            let self = this;

            self.panel.close();

            let panicConfig = self.methods.getFromStorage('panicConfig');
            let emergencyList = self.methods.getFromStorage('emergencyList');
            if ( self.methods.isObjEmpty(panicConfig) ){
                self.dialog.confirm(LANGUAGE.PROMPT_MSG022, LANGUAGE.PANIC_BUTTON_MSG00, function () {
                    mainView.router.navigate('/timing-settings/');
                });
                return;
            }
            if(!panicConfig.State){
                self.dialog.confirm(LANGUAGE.PROMPT_MSG026, LANGUAGE.PANIC_BUTTON_MSG00, function () {
                    mainView.router.navigate('/timing-settings/');
                });
                return;
            }

            self.progressbar.show('red');
            if(!self.methods.isObjEmpty(panicConfig.SMSTo)){
                bgGeo.getCurrentPosition({
                    timeout: 30,          // 30 second timeout to fetch location
                    persist: true,        // Defaults to state.enabled
                    maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
                    desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
                    samples: 3,           // How many location samples to attempt.
                }, function(location){
                    //alert(JSON.stringify(location));
                    self.progressbar.hide();
                    if(self.methods.isObjEmpty(location)){
                        self.methods.customDialog({text:LANGUAGE.TRACKING_PLUGIN_MSG05});
                        if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                            self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                        }
                        return;
                    }
                    let pBattery = parseInt(location.battery.level * 100) + '%';
                    let pSpeed = '0m/s';
                    if (location.coords.speed > 0){
                        pSpeed = parseFloat(location.coords.speed).toFixed(2) + 'm/s';
                    }
                    let pHeading = Helper.Methods.getDirectionCardinal(location.coords.heading);


                    let message = `${ LANGUAGE.PROMPT_MSG015 } https://www.google.com/maps?q=${ location.coords.latitude },${ location.coords.longitude }. ${ LANGUAGE.PROMPT_MSG016 } ${ pBattery }, ${ LANGUAGE.PROMPT_MSG017 } ${ pSpeed }, ${ LANGUAGE.PROMPT_MSG018 } ${ pHeading }`;
                    let numbers = [];
                    for (let i = 0; i < panicConfig.SMSTo.length; i++) {
                        numbers.push( emergencyList.find( ({ Id }) => Id === panicConfig.SMSTo[i] ).Phone );
                    }

                    SMSHelper.checkSMSPermission({
                        number: numbers,
                        message: message,
                        callback: !self.methods.isObjEmpty(panicConfig.CallTo) ? function () {
                            self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                        } : false
                    });

                },function(errorCode){
                    self.progressbar.hide();
                    self.methods.customDialog({text:errorCode});
                    let errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG04;
                    switch (errorCode) {
                        case 0:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG00;
                            break;
                        case 1:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG01;
                            break;
                        case 2:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG02;
                            break;
                        case 408:
                            errorMsg = LANGUAGE.TRACKING_PLUGIN_MSG03;
                            break;
                    }
                    self.methods.customDialog({text:errorMsg});

                    if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                        self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
                    }
                });

            }else if(!self.methods.isObjEmpty(panicConfig.CallTo)){
                self.progressbar.hide();
                self.methods.customNotification({text: LANGUAGE.PROMPT_MSG028});
                self.methods.callToPhone(emergencyList.find( ({ Id }) => Id === panicConfig.CallTo.toString() ).Phone);
            }
        },
        callToPhone: function(phone){
            window.open('tel:'+phone, '_system');
        },

        getNewData: function(noPosInfoUpdate = false, emitDataUpdated = false){
            let self = this;
            self.methods.getPlusInfo();

            let data = {
                account: localStorage.ACCOUNT,
                password: localStorage.PASSWORD,

                appKey: localStorage.PUSH_APP_KEY,
                mobileToken: localStorage.PUSH_MOBILE_TOKEN,
                deviceToken: localStorage.PUSH_DEVICE_TOKEN,
                deviceType: localStorage.DEVICE_TYPE,
            };

            self.request.promise.get(API_URL.LOGIN, data, 'json')
                .then(function (result) {
                    if(result.data && result.data.MajorCode === '000') {
                        self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.Data.User
                        });
                        self.data.MinorToken = result.data.Data.MinorToken;
                        self.data.MajorToken = result.data.Data.MajorToken;
                    }
                })
                .catch(function (err) {
                    console.log(err);

                });
        },
        setGeolocationPlugin: function(){
            if(!window.BackgroundGeolocation){
                return;
            }

            bgGeo = window.BackgroundGeolocation;
            let self = this;

            //let savedConfig = self.methods.getFromStorage('trackingConfig'); //trackerGetSavedConfig();
            let config = {
                //reset: true,
                reset: false,
                foregroundService: true,
                notification: {
                    priority: bgGeo.NOTIFICATION_PRIORITY_MAX
                },
                debug: false,
                logLevel: bgGeo.LOG_LEVEL_VERBOSE, //bgGeo.LOG_LEVEL_ERROR,
                desiredAccuracy: bgGeo.DESIRED_ACCURACY_HIGH,
                //distanceFilter: 10,
                allowIdenticalLocations: true,
                distanceFilter: 0,
                url: API_URL.UPLOAD_LINK,
                maxDaysToPersist: 5,
                autoSync: true,
                //autoSyncThreshold: 2,
                batchSync: true,
                maxBatchSize: 50,
                stopOnTerminate: false,
                startOnBoot: true,
                speedJumpFilter: 200,
                //forceReloadOnSchedule: true,
                forceReloadOnBoot: true,
                scheduleUseAlarmManager: true,
            };

            // 2. Execute #ready method:
            bgGeo.ready(config, function(state) {    // <-- Current state provided to #configure callback
                /*self.dialog.alert(JSON.stringify(state));
                if (savedConfig.ScheduleState && savedConfig.ScheduleState === true){
                    bgGeo.requestPermission().then((status) => {
                        bgGeo.startSchedule();
                    }).catch((status) => {
                        self.$app.methods.customDialog({text: LANGUAGE.TRACKING_PLUGIN_MSG06});
                        self.$app.methods.setInStorage({name:'trackingConfig', data: {ScheduleState: false}});
                    });
                }else{
                    bgGeo.stopSchedule(function() {
                        bgGeo.stop();
                    });
                }*/
            });
        },
        setupPush: function() {
            let self = this;
            if(!window.PushNotification){
                return;
            }
            push = PushNotification.init({
                "android": {
                    //"senderID": "264121929701"
                    //icon: 'notification',
                    //iconColor: 'blue'
                },
                "browser": {
                    pushServiceURL: 'https://push.api.phonegap.com/v1/push'
                },
                "ios": {
                    "sound": true,
                    "vibration": true,
                    "badge": true
                },
                "windows": {}
            });

            /*push.on('registration', function(data) {
                alert('reg = ' + JSON.stringify(data));
                console.log('registration event: ' + data.registrationId);
                // alert('registered '+ data.registrationId);
                /!*if (localStorage.PUSH_DEVICE_TOKEN !== data.registrationId) {
                    // Save new registration ID
                    localStorage.PUSH_DEVICE_TOKEN = data.registrationId;
                    // Post registrationId to your app server as the value has changed
                    setTimeout(function() {
                        self.methods.refreshToken(data.registrationId);
                        self.methods.getNewData(true);
                    },1000);
                }*!/
            });*/

            push.on('registration', data => {
                self.dialog.alert(data.registrationId);
                console.log(data.registrationType);
            });

            push.on('error', function(e) {
                //console.log("push error = " + e.message);
                // alert("push error = " + JSON.stringify(e));
                alert("push error = " + e.message);
            });

            push.on('notification', function(data) {
                alert(JSON.stringify(data));
                /*if (localStorage.ACCOUNT && localStorage.PASSWORD) {
                    //if user using app and push notification comes
                    if (data && data.additionalData && data.additionalData.foreground) {
                        // if application open, show popup
                        let alertData = self.methods.formatNewNotifications([data.additionalData])[0];
                        self.methods.displayNewNotificationArrived(alertData);
                    } else if (data && data.additionalData && data.additionalData.payload) {
                        //if user NOT using app and push notification comes
                        self.preloader.show();
                        window.loginTimer = setInterval(function() {
                            if (window.loginDone) {
                                clearInterval(window.loginTimer);
                                setTimeout(function() {
                                    let alertData = self.methods.formatNewNotifications([data.additionalData])[0];
                                    if(mainView.router.currentRoute.name && mainView.router.currentRoute.name === 'notification'){
                                        mainView.router.navigate('/notification/',{context: { AlertData: alertData }, reloadCurrent: true, ignoreCache: true, });
                                    }else {
                                        mainView.router.navigate('/notification/',{context: { AlertData: alertData } });
                                    }

                                    self.preloader.hide();
                                }, 1000);
                            }
                        }, 1000);
                    }
                }*/

                if (self.device && self.device && self.device.ios) {
                    push.finish(
                        () => {
                            console.log('processing of push data is finished');
                        },
                        () => {
                            console.log(
                                'something went wrong with push.finish for ID =',
                                data.additionalData.notId
                            );
                        },
                        data.additionalData.notId
                    );
                }
            });

            if　 (!localStorage.ACCOUNT && push) {
                push.clearAllNotifications(
                    () => {
                        console.log('success');
                    },
                    () => {
                        console.log('error');
                    }
                );
            }
        },
        unregisterPush: function(){
            if(push){
                push.unregister(
                    () => {
                        // alert('unregistered');
                        console.log('success');
                    },
                    () => {
                        // alert('fail to unregister');
                        console.log('error');
                    });
            }

        },
        refreshToken: function(newDeviceToken) {
            let self = this;

            if (self.data.Token && newDeviceToken && localStorage.ACCOUNT && localStorage.PASSWORD) {
                let data = {
                    Token: self.data.Token,
                    PushToken: newDeviceToken,
                    PhoneNumber: localStorage.ACCOUNT,
                    Password: localStorage.PASSWORD
                };
                self.request.promise.post(API_URL.REFRESH_TOKEN, data, 'json')
                    .then(function (result) {
                        if(result.data.MajorCode === '000') {

                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else {
                console.log('not loggined');
            }
        },

           /* if (localStorage.PUSH_MOBILE_TOKEN && self.data.MajorToken && self.data.MinorToken && newDeviceToken) {
                let data = {
                    MajorToken: self.data.MajorToken,
                    MinorToken: self.data.MinorToken,
                    MobileToken: localStorage.PUSH_MOBILE_TOKEN,
                    DeviceToken: newDeviceToken,
                };
                self.request.promise.post(API_URL.REFRESH_TOKEN, data, 'json')
                    .then(function (result) {
                        if(result.data.MajorCode === '000') {

                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else {
                console.log('not loggined');
            }*/

        /*
          This method prevents back button tap to exit from app on android.
          In case there is an opened modal it will close that modal instead.
          In case there is a current view with navigation history, it will go back instead.
          */
        handleAndroidBackButton: function () {
            let f7 = this;
            const $ = f7.$;
            if (f7.device.electron) return;

            document.addEventListener('backbutton', function (e) {
                if ($('.actions-modal.modal-in').length) {
                    f7.actions.close('.actions-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.dialog.modal-in').length) {
                    f7.dialog.close('.dialog.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.sheet-modal.modal-in').length) {
                    f7.sheet.close('.sheet-modal.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popover.modal-in').length) {
                    f7.popover.close('.popover.modal-in');
                    e.preventDefault();
                    return false;
                }
                if ($('.popup.modal-in').length) {
                    if ($('.popup.modal-in>.view').length) {
                        const currentView = f7.views.get('.popup.modal-in>.view');
                        if (currentView && currentView.router && currentView.router.history.length > 1) {
                            currentView.router.back();
                            e.preventDefault();
                            return false;
                        }
                    }
                    f7.popup.close('.popup.modal-in');
                    e.preventDefault();
                    return false;
                }
               /* if ($('.login-screen.modal-in').length) {
                    f7.loginScreen.close('.login-screen.modal-in');
                    e.preventDefault();
                    return false;
                }*/

                if($('.searchbar-enabled').length){
                    f7.searchbar.disable();
                    e.preventDefault();
                    return false;
                }

                const currentView = f7.views.current;
                if (currentView && currentView.router && currentView.router.history.length > 1) {
                    currentView.router.back();
                    e.preventDefault();
                    return false;
                }

                if ($('.panel.panel-in').length) {
                    f7.panel.close('.panel.panel-in');
                    e.preventDefault();
                    return false;
                }

                if (currentView && currentView.router && currentView.router.url === '/') {
                    f7.dialog.confirm(LANGUAGE.PROMPT_MSG021, function() {
                        if(navigator){
                            navigator.app.exitApp();
                        }
                    });
                    e.preventDefault();
                    return false;
                }
            }, false);
        },
        /*
        This method does the following:
          - provides cross-platform view "shrinking" on keyboard open/close
          - hides keyboard accessory bar for all inputs except where it required
        */
        handleKeyboard: function () {
            let f7 = this;
            if (!window.Keyboard || !window.Keyboard.shrinkView || f7.device.electron) return;
            let $ = f7.$;
            window.Keyboard.shrinkView(false);
            window.Keyboard.disableScrollingInShrinkView(true);
            window.Keyboard.hideFormAccessoryBar(true);
            window.addEventListener('keyboardWillShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidShow', () => {
                f7.input.scrollIntoView(document.activeElement, 0, true, true);
            });
            window.addEventListener('keyboardDidHide', () => {
                if (document.activeElement && $(document.activeElement).parents('.messagebar').length) {
                    return;
                }
                window.Keyboard.hideFormAccessoryBar(false);
            });
            window.addEventListener('keyboardHeightWillChange', (event) => {
                let keyboardHeight = event.keyboardHeight;
                if (keyboardHeight > 0) {
                    // Keyboard is going to be opened
                    document.body.style.height = `calc(100% - ${keyboardHeight}px)`;
                    $('html').addClass('device-with-keyboard');
                } else {
                    // Keyboard is going to be closed
                    document.body.style.height = '';
                    $('html').removeClass('device-with-keyboard');
                }

            });
            $(document).on('touchstart', 'input, textarea, select', function (e) {
                let nodeName = e.target.nodeName.toLowerCase();
                let type = e.target.type;
                let showForTypes = ['datetime-local', 'time', 'date', 'datetime'];
                if (nodeName === 'select' || showForTypes.indexOf(type) >= 0) {
                    window.Keyboard.hideFormAccessoryBar(false);
                } else {
                    window.Keyboard.hideFormAccessoryBar(true);
                }
            }, true);
        },

    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    }
});


let mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',
    name: 'view-main'
});

let SMSHelper = {
    sendSms: function(data) {
        //CONFIGURATION
        let options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without opening any other app
            }
        };

        sms.send(data.number, data.message, options, function () {
            app.methods.customNotification({text: LANGUAGE.PROMPT_MSG027});
            if (data.callback instanceof Function) {
                data.callback();
            }

        }, function (e) {
            alert('Message Failed:' + e);
            if (data.callback instanceof Function) {
                data.callback();
            }
        });
    },
    checkSMSPermission: function(data=false) {
        let self = this;

        let success = function (status) {
            if (status.hasPermission) {
                if(data){
                    self.sendSms(data);
                }
            }
            else {
                self.requestSMSPermission(data, self.sendSms);
            }
        };
        let error = function (e) { alert('Something went wrong:' + e); };
        window.permissions.hasPermission(window.permissions.SEND_SMS, success, error);
    },
    requestSMSPermission: function(data=false, callback) {
        let self = this;

        let success = function (status) {
            if ( !status.hasPermission ) {
                window.permissions.requestPermission(window.permissions.SEND_SMS, function() {
                    //alert('[OK] Permission accepted');
                    if (data){
                        callback(data);
                    }
                }, function(error) {
                    alert('[WARN] Permission not accepted')
                    // Handle permission not accepted
                });
            }
        };
        let error = function (e) { alert('Something went wrong:' + e); };
        window.permissions.hasPermission(window.permissions.SEND_SMS, success, error);
    }
};

$$('body').on('submit', '[name="login-form"]', function (e) {
    e.preventDefault();
    //preLogin();
    app.methods.hideKeyboard();
    app.methods.login(this);
    return false;
});

$$('body').on('click', '.password-toggle', function(){
    let password = $$(this).siblings("input");
    if(password.prop("type") == "text"){
        password.prop("type", "password");
    }else{
        password.prop("type", "text");
    }
    $$(this).toggleClass('text-color-gray');
});

$$('body').on('click', '.panicButton', function(){
    app.methods.clickOnPanicButton();
});