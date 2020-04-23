window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT3 = 'DD/MM/YYYY HH:mm:ss';
window.COM_TIMEFORMAT4 = 'YYYY-MM-DD';
window.COM_TIMEFORMAT5 = 'DD-MM-YYYY';
window.COM_TIMEFORMAT6 = 'MMMM DD YYYY, HH:mm'; //calendar set value
window.COM_TIMEFORMAT7 = 'MM dd yyyy, HH::mm'; //calendar display value


const API_DOMIAN1 = "https://api.m2mglobaltech.com/";
const API_DOMIAN2 = "https://vici19.quiktrak.co/";
const API_DOMIAN5 = "http://194.247.12.103:9038/";


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

API_URL.PREREGISTRATION = API_DOMIAN5 + 'Person/PreRegister';
API_URL.REGISTRATION = API_DOMIAN5 + 'Person/Register';
API_URL.PRE_FORGOT_PWD = API_DOMIAN5 + 'Person/PreForgotPassword';
API_URL.FORGOT_PWD = API_DOMIAN5 + 'Person/ForgotPassword';
API_URL.LOGIN = API_DOMIAN5 + 'Person/Login';
API_URL.REFRESH_TOKEN = API_DOMIAN5 + 'Person/Auth';
API_URL.CHANGE_PASSWORD = API_DOMIAN5 + 'Person/ChangePassword';
API_URL.GET_NOTIFICATIONS = API_DOMIAN5 + 'Person/QueryMessage';
API_URL.GET_NOTIFICATION_CONTENT = API_DOMIAN5 + 'Person/QueryMessageContent';
API_URL.TEST_SUBMIT = API_DOMIAN5 + 'Test/Submit';
API_URL.GET_TEST_INFO = API_DOMIAN5 + 'Person/QueryState';
API_URL.UPLOAD_LINK = API_DOMIAN5 + 'Position/Upload';


//API_URL.UPLOAD_LINK = API_DOMIAN2 + 'Position/Upload';
//API_URL.UPLOAD_LINK = 'https://test.m2mdata.co:5000/Position/Upload';


//API_URL.NOTIFY_TEST = API_DOMIAN2 + 'Contact/SubmitDiagnose';

API_URL.GET_INFECTED_BOUNDS = API_DOMIAN2 + 'Position/QueryGeoInfectedBounds';


API_URL.SHARE_POSITION = API_DOMAIN4 + 'maps';


Framework7.request.setup({
    timeout: 40*1000
});

const AppEvents = new Framework7.Events();
//const AppEvents = new Framework7.Events();
//const AssetUpdateEvents = new Framework7.Events();

let GeoSearchControl = window.GeoSearch.GeoSearchControl;
let OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider;
let MapProvider = new OpenStreetMapProvider();

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
    id: 'com.viciapp.zaf',
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
            logoSquare: 'resources/images/logo-square.jpg',
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



                    document.addEventListener("resume", function () {
                        AppEvents.emit('appResume');
                    }, false);
                    document.addEventListener("pause", function () {
                        AppEvents.emit('appPause');
                    }, false);
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
            let ret= false;
            try{ret=JSON.parse(str);}catch(e){return false;}return ret;
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
            let additionalData = self.methods.getFromStorage('additionalData');

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
            if (!self.methods.isObjEmpty(notifications)){
                self.methods.setInStorage({name:'notifications', data:notifications});
            }
            if (!self.methods.isObjEmpty(additionalData)){
                self.methods.setInStorage({name:'additionalData', data:additionalData});
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
                PhoneNumber: account.val() ? account.val().trim() : localStorage.ACCOUNT,
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

                        //self.data.Token = result.data.data.contactInfo.token;
                        self.data.Token = result.data.data.token;

                        self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.data
                        });

                        AppEvents.emit('signedIn', result.data.data);

                        self.methods.getNotifications({}, function (notificatios) {
                            if(notificatios && notificatios.length){
                                let counter = self.methods.getFromStorage('additionalData').newNotificationCounter;
                                if (!counter) counter=0;
                                counter = parseInt(counter,10) + notificatios.length;
                                self.methods.setInStorage({name:'additionalData', data:{ newNotificationCounter: counter}});
                                AppEvents.emit('newNotificationCountChanged', counter)
                            }
                        });

                        if(result.data.data.testState > 0){
                            self.methods.getTestInfo({token: result.data.data.token, id: result.data.data.testID}, function (testIno) {

                            });
                        }



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
                            window.loginDone = 1;
                            //self.dialog.alert(localStorage.PUSH_DEVICE_TOKEN);
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
        getTestInfo: function(params = {}, callback){
            let self = this;

            let data = {
                Token: self.data.Token,
            };

            self.progressbar.show('gray');
            self.request.promise.post(API_URL.GET_TEST_INFO, data, 'json')
                .then(function (result) {
                    console.log(result.data);

                    if(result.data.majorCode && result.data.majorCode === '000'){
                        /*if (Array.isArray(result.data.data) && result.data.data.length) {
                            //adding 1 sec to las message time to not receive it again
                            //let lastMessageTime = moment(result.data.data[ result.data.data.length-1].time, window.COM_TIMEFORMAT2).add(1,'seconds').format(window.COM_TIMEFORMAT2);
                            let lastMessageTime = moment.unix(result.data.data[ result.data.data.length-1].time).add(1,'seconds').format(window.COM_TIMEFORMAT2);

                            self.methods.setInStorage({name: 'additionalData', data: {lastNotificationTime: lastMessageTime}});
                            result.data.data = self.methods.formatNotifications(result.data.data);
                            let needUpdate = false;
                            for (let i = result.data.data.length - 1; i >= 0; i--) {
                                if(parseInt(result.data.data[i].templateID) === 2) needUpdate=true;
                                result.data.data[i].customId = self.utils.id();
                                list.push(result.data.data[i]);
                            }
                            self.methods.setInStorage({name:'notifications', data: list});
                            if(needUpdate) self.methods.getNewData();
                        }*/
                        //AppEvents.emit('covidStatusChanged', result.data.data);
                    }
                    if(callback instanceof Function){
                        callback(result.data.data);
                    }
                })
                .finally(function () {
                    self.utils.nextTick(()=>{
                        self.progressbar.hide();
                    }, 500);
                })
                .catch(function (err) {
                    console.log(err);

                    if(callback instanceof Function){
                        callback({});
                    }
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                });

        },
        getNotifications: function(params = {}, callback){
            let self = this;
            let lastMgsTimestamp = self.methods.getFromStorage('additionalData').lastNotificationTime;

            let data = {
                Token: self.data.Token,
                From: lastMgsTimestamp ? lastMgsTimestamp : '',
            };

            if(params.showLoader){
                self.progressbar.show('gray');
            }
            self.request.promise.post(API_URL.GET_NOTIFICATIONS, data, 'json')
                .then(function (result) {
                    console.log(result.data);
                    let list = [];
                    if(result.data.majorCode && result.data.majorCode === '000'){
                        if (Array.isArray(result.data.data) && result.data.data.length) {
                            //adding 1 sec to las message time to not receive it again
                            //let lastMessageTime = moment(result.data.data[ result.data.data.length-1].time, window.COM_TIMEFORMAT2).add(1,'seconds').format(window.COM_TIMEFORMAT2);
                            let lastMessageTime = moment.unix(result.data.data[ result.data.data.length-1].time).add(1,'seconds').format(window.COM_TIMEFORMAT2);

                            self.methods.setInStorage({name: 'additionalData', data: {lastNotificationTime: lastMessageTime}});
                            result.data.data = self.methods.formatNotifications(result.data.data);
                            let needUpdate = false;
                            for (let i = result.data.data.length - 1; i >= 0; i--) {
                                if(parseInt(result.data.data[i].templateID) === 2) needUpdate=true;
                                result.data.data[i].customId = self.utils.id();
                                list.push(result.data.data[i]);
                            }
                            self.methods.setInStorage({name:'notifications', data: list});
                            if(needUpdate) self.methods.getNewData();
                        }
                    }
                    if(callback instanceof Function){
                        callback(list);
                    }
                })
                .finally(function () {
                    self.utils.nextTick(()=>{
                        self.progressbar.hide();
                    }, 500);

                })
                .catch(function (err) {
                    console.log(err);

                    if(callback instanceof Function){
                        callback([]);
                    }
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                });
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
                        }else {
                            ret = {};
                        }
                        break;
                    case 'additionalData':
                        str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.ADDIITIONALDATA");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
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
                        let notifications = self.methods.getFromStorage(params.name);
                        if (!self.methods.isObjEmpty(notifications)) {
                            if (self.methods.isObjEmpty(notifications[localStorage.ACCOUNT])) {
                                notifications[localStorage.ACCOUNT] = [];
                            }
                        }else{
                            notifications = {};
                            notifications[localStorage.ACCOUNT] = [];
                        }
                        if (Array.isArray(params.data)) {
                            /*for (let i = 0; i < params.data.length; i++) {
                                notifications[localStorage.ACCOUNT].unshift(params.data[i]);
                            }*/
                            notifications[localStorage.ACCOUNT] = params.data.concat(notifications[localStorage.ACCOUNT]);
                        }
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS", JSON.stringify(notifications));
                        break;
                    case 'additionalData':
                        let flags = self.methods.getFromStorage(params.name);
                        const keys = Object.keys(params.data);
                        for (const key of keys) {
                            flags[key] = params.data[key];
                        }
                        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ADDIITIONALDATA", JSON.stringify(flags));
                        break;

                    default:
                        self.dialog.alert('There is no function associated with this name - '+params.name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(params);
            }
        },

        formatNotifications: function(messageList){
            let self = this;
            if (Array.isArray(messageList)) {
                for (let i = 0; i < messageList.length; i++) {
                    //messageList[i].customTime = moment(messageList[i].time, window.COM_TIMEFORMAT2).add(self.data.UTCOFFSET,'minutes').format(window.COM_TIMEFORMAT);
                    messageList[i].customTime = moment.unix(messageList[i].time).format(window.COM_TIMEFORMAT);
                    messageList[i].customContent = self.methods.isJsonString(messageList[i].content);

                    messageList[i].customTitle = LANGUAGE.PROMPT_MSG082;
                    messageList[i].customSubtitle = LANGUAGE.PROMPT_MSG083;
                    switch (messageList[i].templateID) {
                        case 1:
                            messageList[i].customTitle = LANGUAGE.PROMPT_MSG080;
                            messageList[i].customSubtitle = LANGUAGE.PROMPT_MSG081;
                            break;
                        case 2:
                            messageList[i].customTitle = LANGUAGE.PROMPT_MSG085;
                            messageList[i].customSubtitle = LANGUAGE.PROMPT_MSG085;
                            if(messageList[i].customContent){
                               // let diagnoseInfoDescr = Helper.Methods.getDiagnoseInfoDescr({state: messageList[i].customContent.State });
                               // messageList[i].customSubtitle = diagnoseInfoDescr.text;
                                if(messageList[i].customContent.time){
                                    messageList[i].customContent.customTime = moment.unix(messageList[i].customContent.time).format(window.COM_TIMEFORMAT);
                                }
                            }
                            break;
                    }
                }
            }
            return messageList;
        },
        deleteNotifications: function(deleteList,deleteAll){
            let self = this;
            let pushList = self.methods.getFromStorage('notifications');
            let user = localStorage.ACCOUNT;
            if (deleteList && deleteList.length) {
                if (pushList && pushList[user] && pushList[user].length) {
                    for (let i = 0; i < deleteList.length; i++) {
                        let index = pushList[user].map(function(e) { return e.customId; }).indexOf(deleteList[i]);
                        pushList[user].splice(index, 1);
                    }
                    localStorage.setItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS", JSON.stringify(pushList));
                }
            }else if(deleteAll){
                if (pushList && pushList[user] && pushList[user].length) {
                    pushList[user] = [];
                    localStorage.setItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS", JSON.stringify(pushList));
                    let virtualList = self.virtualList.get('.notificationList');
                    if (virtualList) {
                        virtualList.deleteAllItems();
                    }
                }
            }
        },
        updateNotification: function(id, data){
            let self = this;
            let pushList = self.methods.getFromStorage('notifications');
            let user = localStorage.ACCOUNT;

            if (pushList && pushList[user] && pushList[user].length) {
                let index = pushList[user].map(function(e) { return e.customId; }).indexOf(id);
                pushList[user][index] = data;
                localStorage.setItem("COM.QUIKTRAK.PHONETRACK.NOTIFICATIONS", JSON.stringify(pushList));
            }
        },

        showAddressMap: function(params, callback){
            let self = this;
            let mapPopup = '';
            self.popup.create({
                backdrop: true,
                closeByBackdropClick: false,
                //animate: false,
                content: `
                        <div class="popup popup-map" >
                            <div class="view">
                                <div class="page">
                                    <div class="navbar">
                                        <div class="navbar-bg"></div>
                                        <div class="navbar-inner">
                                            <div class="left">
                                                <a href="#" class="link popup-close" data-popup=".popup-map">
                                                    <i class="f7-icons">close</i>
                                                </a>
                                            </div>
                                            <div class="title">${ LANGUAGE.COM_MSG060 }</div>  
                                            <div class="right">
                                                <a href="#" class="link applyAddress" >
                                                     <i class="f7-icons icon-apply"></i>
                                                </a>
                                            </div>                              
                                        </div>
                                    </div>                                    
                                    <div class="page-content bg-color-lightgray" >
                                        <div id="mapPopup" class="map"></div>
                                    </div>
                                </div>
                            </div>
                        </div>`,
                on: {
                    open: function (popup) {
                        mapPopup = Helper.Methods.createMap({ target: 'mapPopup', latLng: [9.675228, -171.364896], zoom: 2 });
                        let positionMarker = L.marker([0, 0], { icon: Helper.MarkerIcon[0] });
                        let searchControl = new GeoSearchControl({
                            provider: MapProvider,           // required
                            style: 'bar',                   // optional: bar|button  - default button
                            autoClose: true,
                            keepResult: true,
                            searchLabel: LANGUAGE.INFORM_ABOUT_MSG00,
                            marker: {
                                icon: Helper.MarkerIcon[0],
                                draggable: false, //true, //false,
                            },
                            popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
                        });
                        mapPopup.addControl(searchControl);
                        searchControl.searchElement.elements.input.addEventListener("click", function(){ this.focus(); });

                        let onMapClick = function(e){
                            if(!mapPopup.hasLayer(positionMarker)){
                                mapPopup.addLayer(positionMarker);
                            }
                            positionMarker.setLatLng(e.latlng);

                            self.progressbar.show('gray');
                            Helper.Methods.getAddressByGeocoder(e.latlng,function(address, additionalData){
                                self.progressbar.hide();
                                console.log(address);
                                console.log(additionalData)
                            });
                        };

                        mapPopup.on('click', onMapClick);

                        popup.$el.find('.applyAddress').on('click', function () {
                            if(callback instanceof Function){
                                callback({displayAddress: 'testing'});
                                popup.close();
                            }
                        });

                    },
                    closed: function(popup){
                        if(mapPopup){
                            mapPopup.clearLayers();
                            mapPopup.remove();
                        }
                        //self.MapTrackReport.removeLayer(self.ReportMarker);
                        //self.MapTrackReport.remove();
                        popup.$el.remove();
                        popup.destroy();
                    },
                }
            }).open();
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
        showToast: function(text){
            this.toast.create({
                position: 'center',
                text: text,
                closeTimeout: 1000,
                destroyOnClose: true,
            }).open();
        },


        displayNewNotificationArrived: function(message){
            let self = this;
            let formattedMsgList = self.methods.formatNotifications([message]);
          /*  console.log(message);
            console.log(formattedMsgList);
            self.dialog.alert(JSON.stringify(message));
            self.dialog.alert(JSON.stringify(formattedMsgList));*/
            self.notification.create({
                title: self.name,
                titleRightText: LANGUAGE.COM_MSG062, //now
                subtitle: formattedMsgList[0].customTitle ? formattedMsgList[0].customTitle : (message.templateID === 1) ? LANGUAGE.PROMPT_MSG080 : LANGUAGE.PROMPT_MSG082,
                text: formattedMsgList[0].customSubtitle ? formattedMsgList[0].customSubtitle : (message.templateID === 1) ? LANGUAGE.PROMPT_MSG081 : LANGUAGE.PROMPT_MSG083,
                closeOnClick: true,
                closeButton: true,
                on: {
                    click: function () {
                        self.view.main.router.navigate('/notifications/');
                        /*if(mainView.router.currentRoute.name && mainView.router.currentRoute.name === 'notification'){
                            mainView.router.navigate('/notification/',{context: { AlertData: message }, reloadCurrent: true, ignoreCache: true, });
                        }else {
                            mainView.router.navigate('/notification/',{context: { AlertData: message } });
                        }*/
                    },
                },
            }).open();

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
        getNewData: function(){
            let self = this;

            self.methods.getPlusInfo();
            let data = {
                Token: self.data.Token,
                PushToken: localStorage.PUSH_DEVICE_TOKEN ? localStorage.PUSH_DEVICE_TOKEN : '',
            };

            self.request.promise.post(API_URL.REFRESH_TOKEN, data, 'json')
                .then(function (result) {
                    //alert(JSON.stringify(result.data));
                    console.log(result.data);
                    if(result.data && result.data.majorCode === '000') {
                        self.data.Token = result.data.data.token;
                        self.methods.setInStorage({
                            name: 'userInfo',
                            data:  result.data.data
                        });
                        let userStatusDescr = Helper.Methods.getPersonStatusDescription(result.data.data.state);
                        let testStateDescr = Helper.Methods.getTestTypeStateDescription(result.data.data.testState);
                        AppEvents.emit('covidStatusChanged', {
                            userState: result.data.data.state,
                            userStateText: userStatusDescr.text,
                            userStateTextColor: userStatusDescr.textColor,
                            testNumber: result.data.data.testNumber,
                            testState: result.data.data.testState,
                            testStateText: testStateDescr.text,
                            testStateTextColor: testStateDescr.textColor,
                            testStateTime: result.data.data.testStateTime,
                            testType: result.data.data.testType,
                            testTypeText: Helper.Methods.getTestTypeName(result.data.data.type),
                        });
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
                distanceFilter: 10,
                allowIdenticalLocations: true,
                //distanceFilter: 0,
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

            bgGeo.onHttp(function(response){
                console.log("[http] response: ", response.success, response.status, response.responseText);
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
               // self.dialog.alert(data.registrationId);
                console.log(data.registrationType);
                if (localStorage.PUSH_DEVICE_TOKEN !== data.registrationId) {
                    // Save new registration ID
                    localStorage.PUSH_DEVICE_TOKEN = data.registrationId;
                    // Post registrationId to your app server as the value has changed
                    setTimeout(function() {
                        self.methods.refreshToken(data.registrationId);
                        //self.methods.getNewData(true);
                    },3000);
                }
            });

            push.on('error', function(e) {
                //console.log("push error = " + e.message);
                // alert("push error = " + JSON.stringify(e));
                alert("push error = " + e.message);
            });

            push.on('notification', function(data) {
                //alert(JSON.stringify(data));
                if (localStorage.ACCOUNT && localStorage.PASSWORD) {

                    //console.log(data)
                    self.methods.getNewData();
                    //if user using app and push notification comes
                    if (data && data.additionalData && data.additionalData.foreground) {
                        // if application open, show popup

                        self.methods.displayNewNotificationArrived(data.additionalData.payload);
                    } else if (data && data.additionalData && data.additionalData.payload) {
                        //if user NOT using app and push notification comes
                        self.preloader.show();
                        if(window.loginTimer) return;
                        window.loginTimer = setInterval(function() {
                            if (window.loginDone) {
                                clearInterval(window.loginTimer);
                                window.loginTimer = false;
                                setTimeout(function() {
                                    self.view.main.router.navigate('/notifications/');
                                    self.preloader.hide();
                                }, 1000);
                            }
                        }, 1000);
                    }
                }

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
                        localStorage.PUSH_DEVICE_TOKEN = '';
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

            if (self.data.Token && newDeviceToken) {
                let data = {
                    Token: self.data.Token,
                    PushToken: newDeviceToken,
                    /*PhoneNumber: localStorage.ACCOUNT,
                    Password: localStorage.PASSWORD*/
                };
                self.request.promise.post(API_URL.REFRESH_TOKEN, data, 'json')
                    .then(function (result) {
                        /*if(result.data.MajorCode === '000') {

                        }*/
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
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without opening any other app
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
$$('body').on('change keyup input click', '.only_numbers', function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

$$('body').on('click', '.panicButton', function(){
    app.methods.clickOnPanicButton();
});
