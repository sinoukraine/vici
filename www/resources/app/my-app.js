$hub = null;
window.NULL = null;
window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';

function setUserinfo(user){localStorage.setItem("COM.QUIKTRAK.PHONETRACK.USERINFO", JSON.stringify(user));}
function getUserinfo(){var ret = {};var str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.USERINFO");if(str) {ret = JSON.parse(str);} return ret;}
function isJsonString(str){try{var ret=JSON.parse(str);}catch(e){return false;}return ret;}
function toTitleCase(str){return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});}

function guid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

//userCode = minorToken 
//code = majorToken 

/*function getPlusInfo(){
    if(window.plus) {
        window.uuid = plus.device.uuid;
        var info = plus.push.getClientInfo();
        localStorage.PUSH_MOBILE_TOKEN = info.token;
        localStorage.PUSH_APPID_ID = info.appid;
        localStorage.PUSH_APP_KEY = info.appkey;
        localStorage.PUSH_DEVICE_TOKEN = info.clientid;
        localStorage.DEVICE_TYPE = plus.os.name? plus.os.name : "UNKNOWN";
    }else{
        var uid = guid();
            if(!localStorage.PUSH_MOBILE_TOKEN)
            localStorage.PUSH_MOBILE_TOKEN = uid;
            if(!localStorage.PUSH_APP_KEY)
            localStorage.PUSH_APP_KEY = uid;
            if(!localStorage.PUSH_DEVICE_TOKEN)
            localStorage.PUSH_DEVICE_TOKEN = uid;
            //localStorage.PUSH_DEVICE_TOKEN = "75ba1639-92ae-0c4c-d423-4fad1e48a49d"
        localStorage.PUSH_APPID_ID = 'webapp';
        localStorage.DEVICE_TYPE = "web";        
    }
}*/


var inBrowser = 0;
var notificationChecked = 0;


if( navigator.userAgent.match(/Windows/i) ){    
    inBrowser = 1;
}

//document.addEventListener( "plusready", onPlusReady, false );
document.addEventListener("deviceready", onPlusReady, false ); 

function onPlusReady(){   
   
    //getPlusInfo();

    /*if　(!localStorage.ACCOUNT){
        plus.push.clear();
    } */

    if (!inBrowser) {
        if(getUserinfo().code) {
            login();    
        }
        else {
            logout();
        } 
    }

    //plus.key.addEventListener("backbutton", backFix, false);      
    //document.addEventListener("background", onAppBackground, false);
    //document.addEventListener("foreground", onAppForeground, false);    
    //document.addEventListener("resume", onAppReume, false);
    //document.addEventListener("pause", onAppPause, false);
    //document.addEventListener("newintent", onAppNewintent, false);  

    //plus.push.addEventListener("receive", onPushRecieve, false );
    //plus.push.addEventListener("click", onPushClick, false );

    //loadGpsUploader();

    document.addEventListener("backbutton", backFix, false); 

    navigator.geolocation.getCurrentPosition(locationOnSuccess, locationOnError);
}

// onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var locationOnSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function locationOnError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function onAppPause(){ 
    if ($hub) {
        $hub.stop();
    }
} 
function onAppReume(){ 
    //getNewNotifications(); 
    if ($hub) {
        $hub.start();
    } 
}  
function onAppBackground() {
    if ($hub) {
        $hub.stop();
    }
}
function onAppForeground() {
    //getNewNotifications();  
    if ($hub) {
        $hub.start();
    }      
}
function onAppNewintent() {
    //getNewNotifications();
    if ($hub) {
        $hub.start();
    }        
}

function backFix(event){
    var page=App.getCurrentView().activePage;        
    if(page.name=="index"){           
        var ws=plus.webview.currentWebview();
        App.confirm(LANGUAGE.PROMPT_MSG015, function () {        
            ws.close();
        });
    }else{
        mainView.router.back();
    } 
}


/*function loadGpsUploader(){
    gpsuploader = plus.gpsuploader = (function(){
        var _GPSUPLOADER = 'gpsuploader';
        var _B = plus.bridge;
        return {
            uploadGPSFunction : function (ip, port, interval, successCallback, errorCallback ) 
            {
                var success = typeof successCallback !== 'function' ? null : function(args) 
                {
                    successCallback(args);
                },
                fail = typeof errorCallback !== 'function' ? null : function(code) 
                {
                    errorCallback(code);
                };
                callbackID = _B.callbackId(success, fail);
                return _B.exec(_GPSUPLOADER, "uploadGPSFunction", [callbackID, ip, port, interval]);
            },
            endUploadGPSFunction : function (successCallback, errorCallback ) 
            {
                var success = typeof successCallback !== 'function' ? null : function(args) 
                {
                    successCallback(args);
                },
                fail = typeof errorCallback !== 'function' ? null : function(code) 
                {
                    errorCallback(code);
                };
                callbackID = _B.callbackId(success, fail);            
                return _B.exec(_GPSUPLOADER, "endUploadGPSFunction", [callbackID]);
            },
            getIMEI : function (successCallback, errorCallback ) 
            {
                var success = typeof successCallback !== 'function' ? null : function(args) 
                {
                    successCallback(args);
                },
                fail = typeof errorCallback !== 'function' ? null : function(code) 
                {
                    errorCallback(code);
                };
                callbackID = _B.callbackId(success, fail);            
                return _B.exec(_GPSUPLOADER, "getIMEI", [callbackID]);
            } 
        };
    })();

    gpsuploader.getIMEI(function(imei){            
        localStorage.tracker_imei = imei;
    });
}*/
// Initialize your app


var App = new Framework7({
    swipePanel: 'left',   
    swipeBackPage: false,
    material: true,
    //pushState: true,       
    allowDuplicateUrls: true,    
    sortable: false,    
    modalTitle: 'PhoneTracker',
    precompileTemplates: true,
    template7Pages: true,
    tapHold: false, //enable tap hold events
    onAjaxStart: function(xhr){
        App.showIndicator();
    },
    onAjaxComplete: function(xhr){
        App.hideIndicator();
    }   
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = App.addView('.view-main', {
    //main: true,
    domCache: true,  
    swipeBackPage: false
});

var virtualAssetList = null;
var POSINFOASSETLIST = {};
var searchbar = null;  
var trackTimer = false;
TargetAsset = {};
var MapTrack = null;
window.PosMarker = {};

var API_DOMIAN1 = "";
var API_DOMIAN2 = "http://api.m2mglobaltech.com/QuikTrak/V1/";
var API_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=";
var API_URL = {};

API_URL.URL_GET_LOGIN = API_DOMIAN2 + "User/Auth?username={0}&password={1}&appKey={2}&mobileToken={3}&deviceToken={4}&deviceType={5}";
API_URL.URL_GET_LOGOUT = API_DOMIAN2 + "User/Logoff2?MajorToken={0}&MinorToken={1}&username={2}&mobileToken={3}";
API_URL.URL_EDIT_ACCOUNT = API_DOMIAN2 + "User/Edit?MajorToken={0}&MinorToken={1}&FirstName={2}&SubName={3}&Mobile={4}&Phone={5}&EMail={6}";
API_URL.URL_RESET_PASSWORD = API_DOMIAN2 + "User/Password?MinorToken={0}&oldpwd={1}&newpwd={2}";
API_URL.URL_EDIT_DEVICE = API_DOMIAN1 + "Device/Edit?MinorToken={0}&Code={1}&name={2}&speedUnit={3}&initMileage={4}&initAccHours={5}&attr1={6}&attr2={7}&attr3={8}&attr4={9}&tag={10}&icon={11}";

API_URL.URL_GET_ALL_POSITIONS = API_DOMIAN2 + "Device/GetPosInfos?MinorToken={0}";
//API_URL.URL_GET_NEW_NOTIFICATIONS = API_DOMIAN2 +"Device/Alarms?MinorToken={0}&deviceToken={1}";
API_URL.URL_PHOTO_UPLOAD = "http://upload.quiktrak.co/image/Upload";

API_URL.URL_TRACKING_IP = "194.247.12.43";
API_URL.URL_TRACKING_PORT = "5001";



var html = Template7.templates.template_Login_Screen();
$$(document.body).append(html); 
html = Template7.templates.template_Popover_Menu();
$$(document.body).append(html);
html = Template7.templates.template_AssetList();
$$('.navbar-fixed').append(html);


if (inBrowser) {
    if(getUserinfo().MinorToken) {
        login();    
    }
    else {
        logout();
    } 
}


virtualAssetList = App.virtualList('.assetList', {
    // search item by item
    searchAll: function (query, items) {
        var foundItems = [];        
        for (var i = 0; i < items.length; i++) {           
            // Check if title contains query string
            if (items[i].Name.toLowerCase().indexOf(query.toLowerCase().trim()) >= 0) foundItems.push(i);
        }
        // Return array with indexes of matched items
        return foundItems; 
    },       
    //List of array items
    items: [
    ],
    height: function (item) {        
        var height = 98;         
        return height; //display the image with 50px height
    },
    // Display the each item using Template7 template parameter
    renderItem: function (index, item) {

        var ret = '';
        var asset = POSINFOASSETLIST[item.IMEI];  
     
            var assetFeaturesStatus = Protocol.Helper.getAssetStateInfo(asset);
            //var assetImg = 'resources/images/svg_asset.svg';
            

            var assetImg = getAssetImg(item, {'assetList':true});                    
            
            //if (assetFeaturesStatus && assetFeaturesStatus.stats) {
                

               /* ret +=  '<li class="item-link item-content item_asset" data-imei="' + item.IMEI + '" data-id="' + item.Id + '">';                    
                ret +=      '<div class="item-media">'+assetImg+'</div>';
                ret +=      '<div class="item-inner">';
                ret +=          '<div class="item-title-row">';
                ret +=              '<div class="item-title">' + item.Name + '</div>';
                ret +=                  '<div class="item-after"><i id="signal-state'+item.IMEI+'" class="f7-icons icon-other-signal '+assetFeaturesStatus.GSM.state+'"></i><i id="satellite-state'+item.IMEI+'" class="f7-icons icon-other-satellite '+assetFeaturesStatus.GPS.state+'"></i></div>';
                ret +=          '</div>';
                ret +=          '<div id="status-state'+item.IMEI+'" class="item-subtitle '+assetFeaturesStatus.status.state+'"><i class="icon-status-fix icon-data-status-1"></i><span id="status-value'+item.IMEI+'">'+assetFeaturesStatus.status.value+'</span></div>';
                ret +=          '<div class="item-text">';
                ret +=              '<div class="row no-gutter">';                            
                                    if (assetFeaturesStatus.speed) {
                ret +=                  '<div class="col-50">';
                ret +=                     '<i class="f7-icons icon-data-speed asset_list_icon"></i>';
                ret +=                     '<span id="speed-value'+item.IMEI+'" class="">'+assetFeaturesStatus.speed.value+'</span>'; 
                ret +=                  '</div>';
                                    }
                                    
                ret +=              '</div>';
                ret +=          '</div>';
                ret +=      '</div>';                   
                ret +=  '</li>';*/


                ret +=  '<li class="item-content" data-imei="' + item.IMEI + '" data-imsi="' + item.IMSI + '" data-name="' + item.Name + '">';
                ret +=      '<div class="item-media">' + assetImg + '</div>';
                ret +=      '<div class="item-inner">';
                ret +=          '<div class="item-title-row">';
                ret +=              '<div class="item-title color-black">' + item.Name + '</div>';
                ret +=              '<div class="item-after"><a href="#" class="item-link f7-icons icon-menu2 menuAsset"></a></div>';
                ret +=          '</div>';
                ret +=          '<div class="item-subtitle">' + item.IMEI + '</div>';
                //ret +=          '<div class="item-subtitle">1234.5678.9098.765</div>';
                ret +=      '</div>';
                ret +=  '</li>';
                
            //}else{
            //    console.log('NO POSINFO for - '+item.IMEI);
            //    ret +=  '<li class="item-link item-content item_asset" data-imei="' + item.IMEI + '" data-id="' + item.Id + '" title="No data">';                    
            //    ret +=      '<div class="item-media">'+assetImg+'</div>';
            //    ret +=      '<div class="item-inner">';
            //    ret +=          '<div class="item-title-row">';
            //    ret +=              '<div class="item-title">' + item.Name + '</div>';
            //    ret +=                  '<div class="item-after"><i class="f7-icons icon-other-signal state-0"></i><i class="f7-icons icon-other-satellite state-0"></i></div>';
            //    ret +=          '</div>';
            //    ret +=          '<div class="item-subtitle state-0"><i class="icon-status-fix icon-data-status-1"></i>'+LANGUAGE.COM_MSG11+'</div>';
            //    ret +=      '</div>';                   
            //    ret +=  '</li>';
            //}
                
        
        return ret;
    },
});

var cameraButtons = [
    {
        text: LANGUAGE.PHOTO_EDIT_MSG01,
        onClick: function () {
            getImage();
        }
    },
    {
        text: LANGUAGE.PHOTO_EDIT_MSG02,
        onClick: function () {
            galleryImgs();
        }
    },
    {
        text: LANGUAGE.COM_MSG04,
        color: 'red',
        onClick: function () {
            //App.alert('Cancel clicked');
        }
    },
];

$$('.login-form').on('submit', function (e) {    
    e.preventDefault();     
    login();
    return false;
});
$$('body').on('change keyup input click', '.only_numbers', function(){
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

$$('body').on('click', '#menu li', function () {
    var page = $$(this).data('page');     
    
    var activePage = mainView.activePage;
    
    if ( typeof(activePage) == 'undefined' || (activePage && activePage.name != page)) {
        switch (page){
            case 'index':              
                toIndex();      
                break;

            case 'user.profile':
                loadProfilePage();
                break;  

            case 'user.timing':
                loadTimingPage();
                break;  
                
            case 'asset.add':
                loadAssetAddPage();
                break;

            case 'user.location':
                loadUserLocationPage();
                break;                         
                          
            case 'login':
                App.confirm(LANGUAGE.PROMPT_MSG012, LANGUAGE.MENU_MSG02, function () {        
                    logout();
                });
                break;            
        }
    }

});

$$(document).on('click', '.user_settigns_tabbar a.tab-link', function(e){
    e.preventDefault();   
    var activePage = mainView.activePage;
    var page = $$(this).data('id');
    
    if ( typeof(activePage) == 'undefined' || (activePage && activePage.name != page)) {
        switch (page){          

            case 'user.profile':
                loadProfilePage();
                break;
            case 'user.password':
                loadResetPwdPage();
                break;
        }
    }
    
    return false;
});

$$('body').on('click', 'a.external', function(event) {
    event.preventDefault();
    var href = this.getAttribute('href');
    if (href) {
        if (window.plus) {
            plus.runtime.openURL(href);            
        } else {
            window.open(href,'_blank');
        }
    }
    return false;
});



$$('body').on('click', '.menuAsset', function () {
    var parrent = $$(this).closest('.item-content');    
    //var caption = parrent.data('imei');    
    
    TargetAsset.IMEI = !parrent.data('imei')? '' : parrent.data('imei');   
    TargetAsset.IMSI = !parrent.data('imsi')? '' : parrent.data('imsi'); 
    TargetAsset.Name = !parrent.data('name')? '' : parrent.data('name');
    TargetAsset.ID = !parrent.data('id')? '' : parrent.data('id');

    

    var tracking =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-tracking color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG02 +
                        '</div>'+
                    '</div>';

    /*var timing =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-timing color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG03 +
                        '</div>'+
                    '</div>';*/

    var settings =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-settings color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG04 +
                        '</div>'+
                    '</div>';

    /*var assetDelete =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-delete color-red "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text color-red">'+
                            LANGUAGE.HOME_MSG05 +
                        '</div>'+
                    '</div>';*/

    
    
                    
    var buttons = [
        {
            text: LANGUAGE.HOME_MSG01+': '+TargetAsset.Name,
            label: true,
            color: 'dealer',
        },
        
        {
            text: tracking,  
            onClick: function () {
                loadPageTrack();
            },          
        },
        /*{
            text: timing,
            onClick: function () {
                loadTimingPage();
            },  
        },*/
        {
            text: settings,           
            onClick: function () {
                loadAssetEditPage();
               
            },  
        },
        /*{
            text: assetDelete,           
            onClick: function () {
                App.confirm(LANGUAGE.PROMPT_MSG010+' - '+TargetAsset.Name+'?', function () {        
                   //removeAllNotifications();
                });
               
               
            },  
        },*/
       
    ];
    App.actions(buttons);
});

App.onPageInit('profile', function (page) {     
    $$('.saveProfile').on('click', function(e){
        var user = {
            FirstName: $$(page.container).find('input[name="FirstName"]').val(),
            SubName: $$(page.container).find('input[name="SubName"]').val(),
            Mobile: $$(page.container).find('input[name="Mobile"]').val(),
            Phone: $$(page.container).find('input[name="Phone"]').val(),
            EMail: $$(page.container).find('input[name="EMail"]').val(),
        };
        var userInfo = getUserinfo(); 
        var url = API_URL.URL_EDIT_ACCOUNT.format(userInfo.MajorToken,
                userInfo.MinorToken,
                user.FirstName,
                user.SubName,
                user.Mobile,
                user.Phone,
                user.EMail
            ); 
        App.showPreloader();
        JSONrequest(url, function(result){ 
                console.log(result);                  
                if (result.MajorCode == '000') {                    
                    userInfo.User = {
                        FirstName: result.Data.User.FirstName,
                        SubName: result.Data.User.SubName,
                        Mobile: result.Data.User.Mobile,
                        Phone: result.Data.User.Phone,
                        EMail: result.Data.User.EMail,
                    };
                   
                    setUserinfo(userInfo);
                    
                    mainView.router.back();
                }else{
                    App.alert('Something wrong');
                }
                App.hidePreloader();
            },
            function(){ App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02); }
        ); 
    });
});

App.onPageInit('resetPwd', function (page) {     
    $$('.saveResetPwd').on('click', function(e){    
        var password = {
            old: $$(page.container).find('input[name="Password"]').val(),
            new: $$(page.container).find('input[name="NewPassword"]').val(),
            confirm: $$(page.container).find('input[name="NewPasswordConfirm"]').val()
        };
        
        if ($$(page.container).find('input[name="NewPassword"]').val().length >= 6) {
            if (password.new == password.confirm) {
                var userInfo = getUserinfo(); 
                var url = API_URL.URL_RESET_PASSWORD.format(userInfo.MinorToken,
                        encodeURIComponent(password.old),
                        encodeURIComponent(password.new)               
                    ); 
                //console.log(url);
                App.showPreloader();
                JSONrequest(url, function(result){ 
                        //console.log(result);                  
                        if (result.MajorCode == '000') { 
                            App.alert(LANGUAGE.PROMPT_MSG003, function(){
                                logout();
                            });
                        }else{
                            App.alert(LANGUAGE.COM_MSG17);
                        }
                        App.hidePreloader();
                    },
                    function(){ App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02); }
                ); 
            }else{
                App.alert(LANGUAGE.COM_MSG14);  //Passwords do not match
            }
        }else{
            App.alert(LANGUAGE.COM_MSG15); // Password should contain at least 6 characters
        }
    });
});

App.onPageInit('asset.edit', function (page) { 
    $$('.upload_photo, .user_img img').on('click', function (e) {        
        App.actions(cameraButtons);        
    }); 

    var selectUnitSpeed = $$('select[name="Unit"]');   
    selectUnitSpeed.val(selectUnitSpeed.data("set"));

    $$('.saveAssetEdit').on('click', function(){ 
                      
        var device = {
            IMEI: $$(page.container).find('input[name="IMEI"]').val(),
            Name: $$(page.container).find('input[name="Name"]').val(),
            Tag: $$(page.container).find('input[name="Tag"]').val(),
            Unit: $$(page.container).find('select[name="Unit"]').val(),
            Milage: $$(page.container).find('input[name="Milage"]').val(),
            Runtime: $$(page.container).find('input[name="Runtime"]').val(),            
            Describe1: $$(page.container).find('input[name="Describe1"]').val(),
            Describe2: $$(page.container).find('input[name="Describe2"]').val(),
            Describe3: $$(page.container).find('input[name="Describe3"]').val(),
            Describe4: $$(page.container).find('input[name="Describe4"]').val(),
            Icon: TargetAsset.ASSET_IMG,                  
        };

        
        var userInfo = getUserinfo();         
        var url = API_URL.URL_EDIT_DEVICE.format(userInfo.MinorToken,
                TargetAsset.ID,
                device.Name,
                device.Unit,
                device.Milage,
                device.Runtime,
                device.Describe1,
                device.Describe2,
                device.Describe3,
                device.Describe4,
                device.Tag,
                device.Icon
            );
    

        App.showPreloader();
        JSONrequest(url, function(result){ 
                console.log(result);                  
                if (result.MajorCode == '000') {
                    TargetAsset.ASSET_IMG = '';
                    updateAssetList(device);
                    init_AssetList();                    
                }else{
                    App.alert('Something wrong');
                }
                App.hidePreloader();
            },
            function(){ App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02); }
        );                 
    });

});

App.onPageInit('asset.edit.photo', function (page) { 
    //page.context.imgSrc = 'resources/images/add_photo_general.png';

    initCropper();
    //alert(cropper);
    
    //After the selection or shooting is complete, jump out of the crop page and pass the image path to this page
    //image.src = plus.webview.currentWebview().imgSrc;
    //image.src = "img/head-default.jpg";    

    $$('#save').on('click', function(){
        saveImg();
    });
    $$('#redo').on('click', function(){
        cropper.rotate(90);
    });
    $$('#undo').on('click', function(){
        cropper.rotate(-90);
    });
});

App.onPageInit('asset.track', function(page){
    showMap(); 

    var posTime = $$(page.container).find('.positionTime');
    //var posDir = $$(page.container).find('.position_direction');
    //var posMileage = $$(page.container).find('.position_mileage');
    //var posSpeed = $$(page.container).find('.position_speed');
    var posAddress = $$(page.container).find('.address');
    var routeButton = $$(page.container).find('.route_button');
    var data = {
        'posTime':posTime,
        //'posMileage':posMileage,
        //'posSpeed':posSpeed,
        'posAddress':posAddress,
        'routeButton':routeButton,
    };

    $$('.refreshTrack').on('click', function(){   
        updateAssetData(data);          
    });

    trackTimer = setInterval(function(){
                updateMarkerPositionTrack(data);
            }, 10000);    
});

App.onPageInit('user.location', function(page){
    showMap(); 

    var myPosition = {'lat':0,'lng':0}; //default

    $$('.refreshTrack').on('click', function(){
        myPosition = getMyPosition();   
        updateMarkerPositionMe(myPosition);     
    });

    trackTimer = setInterval(function(){
                myPosition = getMyPosition();   
                updateMarkerPositionMe(myPosition);
            }, 10000);    
});

App.onPageBeforeRemove('user.location', function(page){
    clearInterval(trackTimer);
    trackTimer = false;
});

App.onPageBeforeRemove('asset.track', function(page){
    clearInterval(trackTimer);
    trackTimer = false;
});

App.onPageInit('user.timing', function(page){
    var timingList =  $$(page.container).find('.timingList');
    var selectInterval = $$(page.container).find('#trackingInterval');
    var applyUserTiming = $$('body').find('.applyUserTiming');

    $$(timingList).on('click', '.item-link', function() {
        var type = $$(this).data('type');
        switch(type){            

            case '3':  
                var data = {
                    'Start': $$(this).data('timeStart'),
                    'End': $$(this).data('timeEnd'),
                };
                console.log(data);
                loadPageDayTime(data);             
                
                break;          

        }
    });

    applyUserTiming.on('click', function(){
        var interval = localStorage.tracker_interval = selectInterval.val();
        localStorage.tracker_ip = API_URL.URL_TRACKING_IP;
        localStorage.tracker_port = API_URL.URL_TRACKING_PORT;        
        
        if(window.gpsuploader){
            var errorFunc = function(){
                App.alert(LANGUAGE.PROMPT_MSG005);
            };
            var successFunc = function(params){
                App.alert(LANGUAGE.PROMPT_MSG006);
                mainView.router.back();
            };
            if(interval == "0"){
                successFunc = function(params){
                    App.alert(LANGUAGE.PROMPT_MSG007);
                    mainView.router.back();
                };
                gpsuploader.endUploadGPSFunction(successFunc, errorFunc);
            }
            else
            { 
                gpsuploader.uploadGPSFunction(API_URL.URL_TRACKING_IP, API_URL.URL_TRACKING_PORT, interval, successFunc, errorFunc);
            }
        }else{
            App.alert(LANGUAGE.USER_TIMING_MSG18);
        }
    });

    
    

});

App.onPageInit('user.timing.daytime', function(page){
    var daytimeList = $$(page.container).find('.daytimeList'); 
    var applyDaytime = $$(page.container).find('.applyDaytime');
    var startTime = $$(page.container).find('[name="startTime"]').val();
    var endTime = $$(page.container).find('[name="endTime"]').val();

    var startTimeArr = ['0','00'];
    var endTimeArr = ['0','00'];
    if (startTime) {
        startTimeArr = startTime.split(':');
    }
    if (endTime) {
        endTimeArr = endTime.split(':');
    }
       
    
    //startTimeArr = null;
    //endTimeArr =null;
    //pickerStartTime.setValue(startTimeArr);
    //pickerEndtTime.setValue(endTimeArr);

    var pickerStartTime = App.picker({
        input: '.startTime',
        cssClass: 'custom-picker custom-time',
        toolbarTemplate:'<div class="toolbar">'+
                          '<div class="toolbar-inner">'+
                            '<div class="left"><div class="text">'+LANGUAGE.USER_TIMING_MSG17+'</div></div>'+
                            '<div class="right">'+
                             // '<a href="#" class="link close-picker">{{closeText}}</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>',
        
        value: startTimeArr, //[today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
     
        onChange: function (picker, values, displayValues) {
            /*var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }*/
        },
     
        formatValue: function (p, values, displayValues) {
            return values[0] + ':' + values[1];
        },
     
        cols: [            
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            /*{
                divider: true,
                content: ':'
            },*/
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });

    var pickerEndtTime = App.picker({
        input: '.endTime',
        cssClass: 'custom-picker custom-time',
        toolbarTemplate:'<div class="toolbar">'+
                          '<div class="toolbar-inner">'+
                            '<div class="left"><div class="text">'+LANGUAGE.USER_TIMING_MSG18+'</div></div>'+
                            '<div class="right">'+
                              //'<a href="#" class="link close-picker">{{closeText}}</a>'+
                            '</div>'+
                          '</div>'+
                        '</div>',
        
        value: endTimeArr, // [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
     
        onChange: function (picker, values, displayValues) {
            /*var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }*/
        },
     
        formatValue: function (p, values, displayValues) {
            return values[0] + ':' + values[1];
        },
     
        cols: [            
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            /*{
                divider: true,
                content: ':'
            },*/
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });

    

    $$(daytimeList).on('click', 'li', function(event){
        event.stopPropagation();
        var input = $$(this).find('input');

        if (input) {
            var name = input.attr('name');            
            switch(name){
                case 'startTime':
                    pickerStartTime.open();
                    break;
                case 'endTime':
                    pickerEndtTime.open();
                    break;                
            }
            
        }
    });

    applyDaytime.on('click', function(){
        var start = $$(page.container).find('[name="startTime"]').val();
        var end = $$(page.container).find('[name="endTime"]').val();
        setDayTime({'start':start,'end':end});
        mainView.router.back();
    });
});

App.onPageBeforeRemove('user.timing.daytime', function(page){
    // fix to close modal calendar if it was opened and default back button pressed
    App.closeModal('.custom-picker');
});

function loadPageDayTime(data) {
    mainView.router.load({
        url:'resources/templates/user.timing.daytime.html',
        context:{
            Start:data.Start,
            End:data.End,    
        }
    });
}
function setDayTime(data){    
    var daytime = $$('body').find('[name="dayTime"]');    
    daytime.data('timeStart',data.start);
    daytime.data('timeEnd',data.end);
    
    console.log('Start: '+daytime.data('timeStart'));
    console.log('End: '+daytime.data('timeEnd'));
}

function clearUserInfo(){
    
   
    //var appId = !localStorage.PUSH_APPID_ID? '' : localStorage.PUSH_APPID_ID;
    //var deviceToken = !localStorage.PUSH_DEVICE_TOKEN? '' : localStorage.PUSH_DEVICE_TOKEN;
    var userName = !localStorage.ACCOUNT? '' : localStorage.ACCOUNT;
    var userInfo = getUserinfo();
    var MinorToken = userInfo.MinorToken;      
    var MajorToken = userInfo.MajorToken;
    var mobileToken = !localStorage.PUSH_MOBILE_TOKEN? '' : localStorage.PUSH_MOBILE_TOKEN;
    //var pushList = getNotificationList();

    window.PosMarker = {};
    TargetAsset = {}; 


    if (virtualAssetList) {
        virtualAssetList.deleteAllItems();
    }
    
    localStorage.clear(); 
    if ($hub) {
        $hub.stop();  
    }  
    
    
    //if (pushList) {
    //    localStorage.setItem("COM.QUIKTRAK.LIVE.NOTIFICATIONLIST.INSTALLER", JSON.stringify(pushList));
    //}
    
    if(mobileToken){         
        JSONrequest(API_URL.URL_GET_LOGOUT.format(MajorToken, MinorToken, userName, mobileToken), function(result){ console.log(result); });  
    }   
    $$("input[name='account']").val(userName);    

}


function logout(){  
    clearUserInfo();
    App.loginScreen();  

}

function login(){
    //getPlusInfo();
    hideKeyboard();
    
    App.showPreloader();
    var mobileToken = !localStorage.PUSH_MOBILE_TOKEN? '123' : localStorage.PUSH_MOBILE_TOKEN;
    var appKey = !localStorage.PUSH_APP_KEY? '123' : localStorage.PUSH_APP_KEY;
    var deviceToken = !localStorage.PUSH_DEVICE_TOKEN? '123' : localStorage.PUSH_DEVICE_TOKEN;
    var deviceType = !localStorage.DEVICE_TYPE? 'web' : localStorage.DEVICE_TYPE;
    var account = $$("input[name='account']");
    var password = $$("input[name='password']"); 
    //console.log(account.val()+' '+password.val());
    var urlLogin = API_URL.URL_GET_LOGIN.format(!account.val()? localStorage.ACCOUNT: account.val(), 
                                     encodeURIComponent(!password.val()? localStorage.PASSWORD: password.val()), 
                                     appKey, 
                                     mobileToken, 
                                     deviceToken, 
                                     deviceType);                                
    JSONrequest(urlLogin, function(result){
           console.log(result);
            if(result.MajorCode == '000') {
                if(!!account.val()) {
                    localStorage.ACCOUNT = account.val();
                    localStorage.PASSWORD = password.val();
                }
                account.val(null);
                password.val(null);
                setUserinfo(result.Data);
                setAssetList(result.Data.Devices);   
                updateUserData(result.Data.User);            
                               
                //webSockConnect();  
                //getNewNotifications();
                     
                App.closeModal();                
            }else{                
                App.alert(LANGUAGE.PROMPT_MSG001);
            }
            App.hidePreloader();
        },
        function(){ App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02); }
    ); 
}

function updateUserData(data) {
    var letter1 = '';
    var letter2 = '';
    if (data.FirstName) {
        letter1 = data.FirstName[0].toUpperCase();
    }
    if (data.SubName) {
        letter2 = data.SubName[0].toUpperCase();
    }
    $$('.user_f_l').html(letter1+letter2);
    $$('.user_name').html(data.FirstName+' '+data.SubName);
    $$('.user_email').html(data.EMail);
}

function hideKeyboard() {
    document.activeElement.blur();
    $$("input").blur();
}

function toIndex() {
    mainView.router.back({              
        pageName: 'index', 
        force: true
    }); 
}

function getUserImg(asset){
    //var userInfo = getUserinfo();
    var src = 'resources/images/add_photo.svg';
    if (asset && asset.Icon) {
        var pattern = /^IMEI_/i;
        if (pattern.test(asset.Icon)) {
            src = 'http://upload.quiktrak.co/Attachment/images/'+asset.Icon+'?'+ new Date().getTime();
        }
    }

    return src;
}


function loadProfilePage(){
    var userInfo = getUserinfo();  
    console.log(userInfo);
    //var UserImgSrc = getUserImg();
    mainView.router.load({
        url:'resources/templates/user.profile.html',
        context:{
            //UserImgSrc: UserImgSrc,
            FirstName: userInfo.User.FirstName,
            SubName: userInfo.User.SubName,
            Mobile: userInfo.User.Mobile,
            Phone: userInfo.User.Phone,            
            EMail: userInfo.User.EMail,           
        }
    });
}

function loadResetPwdPage(){
    mainView.router.load({
        url:'resources/templates/user.password.html',
        context:{
                     
        }
    });
}

function loadAssetAddPage(){
    var UserImgSrc = getUserImg();
    mainView.router.load({
        url:'resources/templates/asset.add.html',
        context:{
            UserImgSrc: UserImgSrc,   
        }
    });
}

function loadAssetEditPage(){
    /*var UserImgSrc = getUserImg();

    var userInfo = {
        "FirstName": "Test",
        "LastName": "User",
        "Email": "test@email.com",
        "Mobile": "380999999999",
        "IMEI": "01234567890123456",
    };

    mainView.router.load({
        url:'resources/templates/asset.edit.html',
        context:{
            UserImgSrc: UserImgSrc,  
            FirstName: userInfo.FirstName,
            LastName: userInfo.LastName,
            Email: userInfo.Email,
            Mobile: userInfo.Mobile,
            IMEI : userInfo.IMEI,
        }
    });*/



    var assetList = getAssetList();  
    var asset = assetList[TargetAsset.IMEI]; 

    var UserImgSrc = getUserImg(asset);
        

        console.log(asset);
        mainView.router.load({
        url:'resources/templates/asset.edit.html',
            context:{                
                IMEI: asset.IMEI,
                PRDTName: asset.PRDTName,
                Name: asset.Name,
                Tag: asset.TagName,
                Unit: asset.Unit,
                Milage: asset.InitMilage,
                Runtime: asset.InitAcconHours,
                Describe1: asset.Describe1,
                Describe2: asset.Describe2,
                Describe3: asset.Describe3,
                Describe4: asset.Describe4,
                UserImgSrc: UserImgSrc,
            }
        });
}

function loadTimingPage(){  
    var userInfo = getUserinfo();         

    if (!localStorage.tracker_imei) {
        if(window.gpsuploader){
            gpsuploader.getIMEI(function(imei){            
                localStorage.tracker_imei = imei;
            });
        }else{
            App.alert(LANGUAGE.USER_TIMING_MSG18);
        }     
    }
    
    var phone = !userInfo.User.Mobile ? userInfo.User.Phone : userInfo.User.Mobile;
    
    mainView.router.load({
        url:'resources/templates/user.timing.html',
        context:{
            Name: userInfo.User.FirstName+' '+userInfo.User.SubName,
            Phone: phone,
            IMEI: localStorage.tracker_imei,            
        }
    });
}

function getMyPosition(){
    var latlng = {
        'lat': 0,
        'lng': 0,
    };

    if (window.plus && plus.geolocation) {
        plus.geolocation.getCurrentPosition(function(p) {
            localStorage.tracker_lat = latlng.lat = p.coords.latitude;
            localStorage.tracker_lng = latlng.lng = p.coords.longitude;                
        }, function(e) {
            //App.alert('Geolocation error: ' + e.message);
            App.alert(JSON.stringify(e));
        });
    }        

    return  latlng;
}

function loadPageTrack() {

    var asset = POSINFOASSETLIST[TargetAsset.IMEI];
        //console.log(asset);
    if (asset && parseFloat(asset.posInfo.lat) !== 0 && parseFloat(asset.posInfo.lng) !== 0) {            
            
        var marker = L.icon({
            iconUrl: 'resources/images/marker.svg',                       
            iconSize:     [50, 50], // size of the icon                        
            iconAnchor:   [25, 49], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor    
        });

        window.PosMarker[TargetAsset.IMEI] = L.marker([asset.posInfo.lat, asset.posInfo.lng], {icon: marker}); 
        window.PosMarker[TargetAsset.IMEI].setLatLng([asset.posInfo.lat, asset.posInfo.lng]);    
        var speed = 0;
        var mileage = '-';
        if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.speed !== "undefined") {
            speed = Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
        }        
        if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.mileage !== "undefined" && asset.posInfo.mileage != '-') {
            mileage = (Protocol.Helper.getMileageValue(asset.Unit, asset.posInfo.mileage) + parseInt(asset.InitMilage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);
        }
       
        checkMapExisting();
        var templateUrl = 'resources/templates/asset.track.html';        

        var latlng = {};
        latlng.lat = asset.posInfo.lat;
        latlng.lng = asset.posInfo.lng;

        mainView.router.load({
            url:templateUrl,
            context:{
                AssetName: asset.Name,       
                IMEI: asset.IMEI,                                          
                PositionTime: asset.posInfo.positionTime.format(window.COM_TIMEFORMAT),
                //Direction: asset.posInfo.direct,
                //Mileage: mileage,
                //Speed: speed,                    
                Address: LANGUAGE.COM_MSG08,
                DirLink: API_ROUTE+latlng.lat+','+latlng.lng,
            }
        });
        

        addressFromLatLng(latlng);  
    }else{
        App.alert(LANGUAGE.PROMPT_MSG004);
    } 

}

function loadUserLocationPage(){
    var myPosition = getMyPosition();   

    if (myPosition && parseFloat(myPosition.lat) !== 0 && parseFloat(myPosition.lng) !== 0) {   

        var marker = L.icon({
            iconUrl: 'resources/images/marker.svg',                       
            iconSize:     [50, 50], // size of the icon                        
            iconAnchor:   [25, 49], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor    
        });   

        window.PosMarker.ME = L.marker([myPosition.lat, myPosition.lng], {icon: marker}); 
        window.PosMarker.ME.setLatLng([myPosition.lat, myPosition.lng]);    
        //var speed = 0;
        //var mileage = '-';
        //if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.speed !== "undefined") {
        //    speed = Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
        //}        
        //if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.mileage !== "undefined" && asset.posInfo.mileage != '-') {
        //    mileage = (Protocol.Helper.getMileageValue(asset.Unit, asset.posInfo.mileage) + parseInt(asset.InitMilage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);
        //}
       
        checkMapExisting();
        var templateUrl = 'resources/templates/user.location.html';       

       
        mainView.router.load({
            url:templateUrl,
            context:{
                //AssetName: asset.Name,       
                //IMEI: asset.IMEI,                                          
                //PositionTime: asset.posInfo.positionTime.format(window.COM_TIMEFORMAT),
                //Direction: asset.posInfo.direct,
                //Mileage: mileage,
                //Speed: speed,                    
                Address: LANGUAGE.COM_MSG08,
                //DirLink: API_ROUTE+latlng.lat+','+latlng.lng,
            }
        });        

        addressFromLatLng(myPosition);  

    }else{
        App.alert(LANGUAGE.COM_MSG18);
    }
}


function showMap(){    
    var asset = TargetAsset.IMEI;   
    var latlng = [POSINFOASSETLIST[asset].posInfo.lat, POSINFOASSETLIST[asset].posInfo.lng];
    MapTrack = Protocol.Helper.createMap({ target: 'map', latLng: latlng, zoom: 15 });        
    window.PosMarker[TargetAsset.IMEI].addTo(MapTrack);   
}
function checkMapExisting(){
    if ($$('#map')) {
        $$('#map').remove();
        MapTrack = null;
    }   
}
function addressFromLatLng(latlng) {  
    if (latlng) {
        Protocol.Helper.getAddressByGeocoder(latlng,function(address){
            $$('body').find('.address').html(address);
        });
    }
}

function setAssetList(list){    
    var ary = {};    
    for(var i = 0; i < list.length; i++) { 
        var index = 0;    
        ary[list[i][1]] = {                      
            Id: list[i][index++],
            IMEI: list[i][index++],
            Name: list[i][index++],
            TagName: list[i][index++],
            Icon: list[i][index++],
            Unit: list[i][index++], 
            InitMilage: list[i][index++],
            InitAcconHours: list[i][index++],
            State: list[i][index++],
            ActivateDate: list[i][index++],
            PRDTName: list[i][index++],
            PRDTFeatures: list[i][index++],
            PRDTAlerts: list[i][index++],
            Describe1: list[i][index++],
            Describe2: list[i][index++],
            Describe3: list[i][index++],
            Describe4: list[i][index++],
            Describe5: list[i][index++],
            _FIELD_FLOAT1: list[i][index++],
            _FIELD_FLOAT2: list[i][index++],
            _FIELD_FLOAT7: list[i][index++],
            Describe7: list[i][index++],
            AlarmOptions: list[i][index++],
        };        
    }
    setAssetListPosInfo(ary);    
    localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST", JSON.stringify(ary));
    //console.log(ary);
}

function setAssetListPosInfo(listObj){    
    var userInfo = getUserinfo();   

    var url = API_URL.URL_GET_ALL_POSITIONS.format(userInfo.MinorToken); 
    JSONrequest(url, function(result){   
            console.log(result);                       
            if (result.MajorCode == '000') {
                var data = result.Data;    

                if(data && data.length > 1){
                    $.each( data, function( key, value ) {  
                        var posData = value;
                        var imei = posData[1];
                        var protocolClass = posData[2];
                        var deviceInfo = listObj[imei];               
                        
                        POSINFOASSETLIST[imei] = Protocol.ClassManager.get(protocolClass, deviceInfo);
                        POSINFOASSETLIST[imei].initPosInfo(posData); 
                        
                    });
                }
                    
                init_AssetList(); 
                initSearchbar(); 
                //console.log(POSINFOASSETLIST);

                App.hidePreloader();               
            } else if(result.MajorCode == '100' && result.MinorCode == '1004'){
                init_AssetList(); 
                initSearchbar(); 
            } else{
                console.log(result);
            }
        },
        function(){ }
    ); 
}

function init_AssetList() {
    var assetList = getAssetList();   
    if(assetList){
        var newAssetlist = [];
        var keys = Object.keys(assetList);
        
        $.each(keys, function( index, value ) {        
            newAssetlist.push(assetList[value]);       
        });

        newAssetlist.sort(function(a,b){
            if(a.Name < b.Name) return -1;
            if(a.Name > b.Name) return 1;
            return 0;
        });
        
        mainView.router.back({
            pageName: 'index', 
            force: true
        }); 
      
        virtualAssetList.replaceAllItems(newAssetlist);       
        
        setTimeout(function(){
            var updateAssetsPosInfoTimer = setInterval(function(){
                updateAssetsPosInfo();
            }, 10000);
        }, 10000);        
    }
        
    
}

function initSearchbar(searchContainer){  
    if (!searchContainer) {
        if (searchbar) {        
            searchbar.destroy();
        }
        searchbar = App.searchbar('.searchbar', {
            searchList: '.list-block-search',
            searchIn: '.item-title',
            found: '.searchbar-found',
            notFound: '.searchbar-not-found',
            onDisable: function(s){
                //$(s.container).slideUp();
            }
        });
    }
        
}

function getAssetList(){
    var ret = null;
    var str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST");
    if(str)
    {
        ret = JSON.parse(str);              
    }
    return ret;
}

function updateAssetsPosInfo(){    
    var userInfo = getUserinfo();  
    var url = API_URL.URL_GET_ALL_POSITIONS.format(userInfo.MinorToken); 
    JSONrequest(url, function(result){ 
            //console.log(result);                     
            if (result.MajorCode == '000') {
                var data = result.Data;  
                var posData = ''; 
                var imei = '';   
                if (data){
                    $.each( data, function( key, value ) {  
                        posData = value;
                        imei = posData[1];                    
                        POSINFOASSETLIST[imei].initPosInfo(posData);                    
                    }); 
                    //updateAssetsListStats();
                }                                
            }  
        },
        function(){ }
    ); 
}

function updateAssetData(parameters){    
    var userInfo = getUserinfo();  
    var url = API_URL.URL_GET_ALL_POSITIONS.format(userInfo.MinorToken); 

    var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
    App.showProgressbar(container);

    JSONrequest(url, function(result){ 
            //console.log(result);                     
            if (result.MajorCode == '000') {
                var data = result.Data;  
                var posData = ''; 
                var imei = '';    

                $.each( data, function( key, value ) {  
                    posData = value;
                    imei = posData[1];                    
                    POSINFOASSETLIST[imei].initPosInfo(posData);                    
                }); 
                //updateAssetsListStats();     
                setTimeout(function(){
                    updateMarkerPositionTrack(parameters);
                    App.hideProgressbar();
                },500);
                         
            }  
        },
        function(){ 
            App.hideProgressbar();
        }
    ); 
}

function updateMarkerPositionTrack(data){
        var asset = POSINFOASSETLIST[TargetAsset.IMEI];
        
        if (asset) {
            window.PosMarker[TargetAsset.IMEI].setLatLng([asset.posInfo.lat, asset.posInfo.lng]);

            data.posTime.html(asset.posInfo.positionTime.format(window.COM_TIMEFORMAT));           
            //data.posMileage.html((Protocol.Helper.getMileageValue(asset.Unit, asset.posInfo.mileage) + parseInt(asset.InitMilage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit)); 
            //data.posSpeed.html(Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit));
            MapTrack.setView([asset.posInfo.lat, asset.posInfo.lng]);

            var latlng = {};
            latlng.lat = asset.posInfo.lat;
            latlng.lng = asset.posInfo.lng;

            if (data.routeButton) {
                data.routeButton.attr('href',API_ROUTE+latlng.lat+','+latlng.lng);
            }
           
            Protocol.Helper.getAddressByGeocoder(latlng,function(address){
                data.posAddress.html(address);
            });
        }
            
}

function updateMarkerPositionMe(myPosition){        
        
        if (myPosition.lat !== 0 && myPosition.lng !== 0) {
            window.PosMarker.ME.setLatLng([myPosition.lat, myPosition.lng]);

            //data.posTime.html(asset.posInfo.positionTime.format(window.COM_TIMEFORMAT));           
            //data.posMileage.html((Protocol.Helper.getMileageValue(asset.Unit, asset.posInfo.mileage) + parseInt(asset.InitMilage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit)); 
            //data.posSpeed.html(Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit));
            MapTrack.setView([asset.posInfo.lat, asset.posInfo.lng]);

            var latlng = {};
            latlng.lat = asset.posInfo.lat;
            latlng.lng = asset.posInfo.lng;

            //if (data.routeButton) {
            //    data.routeButton.attr('href',API_ROUTE+latlng.lat+','+latlng.lng);
            //}
           
            addressFromLatLng(myPosition);  
        }
            
}

function getAssetImg(params, imgFor){
    var assetImg = '';
    if (params && imgFor.assetList) {
        var pattern = /^IMEI_/i;   
        if (params.Icon && pattern.test(params.Icon)) {
            assetImg = '<img class="item_asset_img" src="http://upload.quiktrak.co/Attachment/images/'+params.Icon+'?'+ new Date().getTime()+'alt="">';
        }else if (params.Name) {
            var splitted = params.Name.split(' ');             
            if (splitted.length > 1) {
                assetImg = '<div class="item_asset_img bg-dealer color-white"><div class="text-a-c vertical-center user_f_l">'+splitted[0][0]+splitted[1][0]+'</div></div>';            
            }else{
                assetImg = '<div class="item_asset_img bg-dealer color-white"><div class="text-a-c vertical-center user_f_l">'+params.Name[0]+params.Name[1]+'</div></div>';            
            }
            
        }else if(params.IMEI){
            assetImg = '<div class="item_asset_img bg-dealer color-white"><div class="text-a-c vertical-center user_f_l">'+params.IMEI[0]+params.IMEI[1]+'</div></div>';
        }
    }else{
        assetImg = '<div class="item_asset_img bg-dealer color-white"><div class="text-a-c vertical-center user_f_l">?</div></div>';
    }
    return assetImg;
}
/*function getNewNotifications(){ 
    var userInfo = getUserinfo();    
    var MinorToken = !userInfo ? '': userInfo.MinorToken;
    var deviceToken = !localStorage.PUSH_DEVICE_TOKEN? '' : localStorage.PUSH_DEVICE_TOKEN;
    
    if (MinorToken && deviceToken) {
        var container = $$('body');
        if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
        App.showProgressbar(container);
        
        var url = API_URL.URL_GET_NEW_NOTIFICATIONS.format(MinorToken,deviceToken); 
        notificationChecked = 0;

        JSONrequest(url, function(result){
                App.hideProgressbar();            
                notificationChecked = 1;
                if(window.plus) {
                    plus.push.clear();
                }
                
                console.log(result);                       
                if (result.MajorCode == '000') {
                    var data = result.Data;  
                    if (Array.isArray(data) && data.length > 0) {
                        setNotificationList(result.Data);

                        var page = App.getCurrentView().activePage;        
                        if ( page && page.name != "notification" ) {
                            $$('.notification_button').addClass('new_not');                    
                        }else{
                            showNotification(result.Data);
                        }
                    }
                    
                }else{
                    console.log(result);
                }
                
            },
            function(){
                App.hideProgressbar();
                notificationChecked = 1;            
            }
        ); 
    }
}*/


function setNotificationList(list){ 
    var pushList = getNotificationList();    
    var user = localStorage.ACCOUNT;   
          
    if (pushList) { 
        if (!pushList[user]) {
            pushList[user] = [];
        }
    }else{
        pushList = {};
        pushList[user] = [];
    }     
    
    if (Array.isArray(list)) {
       
        for (var i = 0; i < list.length; i++) {  
            if (list[i].payload) {  
                var msg = isJsonString(list[i].payload);            
                if (!msg) {                  
                    msg = list[i].payload;    
                }

                if (msg) {                              
                    if (msg.time) {
                        var localTime  = moment.utc(msg.time).toDate();
                        msg.time = moment(localTime).format(window.COM_TIMEFORMAT);                        
                        list[i].payload = msg;

                        pushList[user].push(list[i]);                      
                    } 
                }
            }else if(list[i]){
                var msg = isJsonString(list[i]); 
                if (!msg) {                  
                    msg = list[i];    
                }
                if (msg) {                              
                    if (msg.time) {
                        var localTime  = moment.utc(msg.time).toDate();
                        msg.time = moment(localTime).format(window.COM_TIMEFORMAT);                        
                        list[i] = msg;  
                        
                        pushList[user].push(list[i]);                      
                    } 
                } 
            }                                               
        }    
    }
    localStorage.setItem("COM.QUIKTRAK.LIVE.NOTIFICATIONLIST.BW", JSON.stringify(pushList));
}

function showNotification(list){    
    var data = null;
    var isJson =''; 
    var newList = [];
    var index = parseInt($('.notification_list li').first().data('id'));
    if (list) {       
        for (var i = 0; i < list.length; i++) { 
            data = null;
            isJson =''; 
            if (list[i].payload) {
                isJson = isJsonString(list[i].payload);
                if (isJson) {
                    data = isJson;                
                }else{
                    data = list[i].payload;                
                } 
            }else{
                isJson = isJsonString(list[i]);
                if (isJson) {
                    data = isJson;                
                }else{
                    data = list[i];                
                } 
            } 
            if (data) {
                if (isNaN(index)) {                    
                    index = 0;
                }else{
                    index++;                    
                }                           
                data.listIndex = index; 
                 
                if (data.time) {
                    data.time = data.time.replace("T", " ");
                }                
                
                if (data.title) {
                    data.title = toTitleCase(data.title);
                }                 
                newList.unshift(data);                          
            }
        }
        if (virtualNotificationList && newList.length !== 0) {
            virtualNotificationList.prependItems(newList); 
        }   
    }       
}







/* ASSET EDIT PHOTO */

var cropper = null;
var resImg = null;
function initCropper(){     
    var image = document.getElementById('image'); 
    //alert(image);     
    cropper = new Cropper(image, {
        aspectRatio: 1/1,
        dragMode:'move',
        rotatable:true,
        minCropBoxWidth:200,
        minCropBoxHeight:200,
        minCanvasWidth:200,
        minCanvasHeight:200,
        minContainerWidth:200,
        minContainerHeight:200,
        crop: function(data) {
         }
    });

}
function saveImg(){
    resImg =  cropper.getCroppedCanvas({
          width: 200,
          height: 200
    }).toDataURL();
    
    $$('.asset_img img').attr('src',resImg);     

    if (TargetAsset.IMEI) { 
        $$('.assets_list li[data-imei="'+TargetAsset.IMEI+'"] .item-media img').attr('src',resImg);
    }

    var assetImg = {
        data: resImg, 
        id: 'IMEI_'+TargetAsset.IMEI
    };                  
 
    App.showPreloader();
    $.ajax({
        type: 'POST',
        url: API_URL.URL_PHOTO_UPLOAD,
        data: assetImg,
        async: true, 
        cache: false,
        crossDomain: true,
        success: function (result) {
            App.hidePreloader(); 
            //var res = JSON.stringify(result);
            //alert(res);
            result = typeof (result) == 'string' ? eval("(" + result + ")") : result;
            if (result.MajorCode == "000") {              
                /*App.alert('Result Data:'+ result.Data);*/
                TargetAsset.ASSET_IMG = result.Data;
            }else{
                App.alert('Something wrong. Photo not saved');
            }
            mainView.router.back();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
           App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02);
        }
    });

        
    
}   

//Take pictures
function getImage() {
    if(window.plus){
        var cmr = plus.camera.getCamera();
        cmr.captureImage( function (p) {
            plus.io.resolveLocalFileSystemURL( p, function ( entry ) {    
                var localurl = entry.toLocalURL();//
                GetBase64Code(localurl);
            });
        });
    }else{
        console.log('Plus not found');
    }
        
}
//Select from album
function galleryImgs(){
    if(window.plus){
        plus.gallery.pick( function(e){
            GetBase64Code(e.files[0]);
        }, function ( e ) {
            //outSet( "CANCEL SELECT" );
        },{filter:"image",multiple:true, maximum:1});
    }else{
        console.log('Plus not found');
    }
        
}

function GetBase64Code(path) //image path
{
    var bitmap = new plus.nativeObj.Bitmap("test");
    // load image
    bitmap.load(path,function(){
        var base4=bitmap.toBase64Data();        
        
        mainView.router.load({
            url: 'resources/templates/asset.edit.photo.html',
            context: {
                imgSrc: base4
            }
        });
       
        //console.log('IMAGEЈє'+base4);
    },function(e){
        //alert('ERRORЈє'+JSON.stringify(e));
    });
}

