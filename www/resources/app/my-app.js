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
var imeiTimer = 0;
var bgGeo;

if( navigator.userAgent.match(/Windows/i) ){    
    inBrowser = 1;
}

document.addEventListener("deviceready", onDeviceReady, false ); 

//function onPlusReady(){   
function onDeviceReady(){ 
   
     //fix app images and text size
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);    
    }
    if (StatusBar) {
        StatusBar.styleDefault();
    } 

    if (!inBrowser) {
        if(getUserinfo().MinorToken) {
            login();    
        }
        else {
            logout();
        } 
    }

    document.addEventListener("backbutton", backFix, false); 

    
    sutupGeolocationPlugin();

    checkTelephonyPermissions();


}

function checkTelephonyPermissions(){
	if (window.plugins.sim) {
		window.plugins.sim.hasReadPermission(function(state){
			if (!state) {
				window.plugins.sim.requestReadPermission(function(){
					//App.alert('Permission granted');
					getSimInfo();	
			    }, function(){
			    	App.alert('Permission denied');
			    });	
			}else{
				getSimInfo();				
			}			
    	});	
	}else{
		App.alert('Sim Plugin not supported');
	}
}

function getSimInfo(){
	window.plugins.sim.getSimInfo(function(info){
	    var IMEI = false;
		if (info.deviceId) {
			//localStorage.tracker_imei = info.deviceId;
            IMEI = info.deviceId;
		}else{
			if (info.cards && info.cards.length) {
				if (info.cards[0] && info.cards[0].deviceId) {
					//localStorage.tracker_imei = info.cards[0].deviceId;
                    IMEI = info.cards[0].deviceId;
                }else if(info.cards[1] && info.cards[1].deviceId){
					//localStorage.tracker_imei = info.cards[1].deviceId;
                    IMEI = info.cards[1].deviceId;
                }else{
					App.alert('Unable to get device IMEI');
				}
			}else{
				App.alert('Unable to get sim card list');
			}						
		}	

		if (IMEI) {
            trackerSaveConfig({IMEI: IMEI});
			setRegLink(IMEI);
            if (bgGeo){
                bgGeo.setConfig({
                    params: { IMEI: IMEI },
                })
            }
		}	

	}, function(err){
		App.alert('Unable to get sim info');
	});	
}


function sutupGeolocationPlugin(){
    bgGeo = window.BackgroundGeolocation;

    var savedConfig = trackerGetSavedConfig();
    var config = {
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
        //locationUpdateInterval: localStorage.tracker_interval ? localStorage.tracker_interval : 60 * 1000,
        //url: 'https://sinopacificukraine.com/test/phonetrack/locations.php',
        url: API_URL.UPLOAD_LINK_TEST,
        maxDaysToPersist: 3,
        autoSync: true,
        autoSyncThreshold: 5,
        batchSync: true,
        maxBatchSize: 50,
        stopOnTerminate: false,
        startOnBoot: true,
        speedJumpFilter: 200,
        //forceReloadOnSchedule: true,
        forceReloadOnBoot: true,
        scheduleUseAlarmManager: true,
    };

    if  (savedConfig.IMEI){
        config.params = {
            IMEI: savedConfig.IMEI
        }
    }
    if  (savedConfig.Interval){
        config.locationUpdateInterval = savedConfig.Interval;
    }
    if  (savedConfig.Schedule && savedConfig.Schedule.length){
        config.schedule = savedConfig.Schedule;
    }

      // 2. Execute #ready method:
    bgGeo.ready(config, function(state) {    // <-- Current state provided to #configure callback
        //alert(JSON.stringify(savedConfig));
        if (savedConfig.ScheduleState && savedConfig.ScheduleState == true){
            bgGeo.requestPermission().then((status) => {
                bgGeo.startSchedule();
            }).catch((status) => {
                App.alert('Tracking permission denied');
                trackerSaveConfig({ScheduleState: false});
            });
        }else{
            bgGeo.stopSchedule(function() {
                bgGeo.stop();
            });
        }
    });



}

function backFix(event){
    var page=App.getCurrentView().activePage;        
    if(page.name=="index"){ 
        App.confirm(LANGUAGE.PROMPT_MSG015, function () {        
            navigator.app.exitApp();
        });
    }else{
        mainView.router.back();
    } 
}


function setRegLink(imei){
    if (imei) {
        $$('#regLink').attr('href','http://activation.phonetrack.co/register.php?imei='+imei);
    }else{
        $$('#regLink').attr('href','http://activation.phonetrack.co/register.php?imei=');
    }  
}
// Initialize your app


var App = new Framework7({
    swipePanel: 'left',   
    swipeBackPage: false,
    material: true,
    //pushState: true,       
    allowDuplicateUrls: true,    
    sortable: false,    
    modalTitle: 'PhoneTrack',
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

var StreetViewService = null;
var updateAssetsPosInfoTimer = null;

var API_DOMIAN1 = "https://api.m2mglobaltech.com/PhoneProtect/V1/";
var API_DOMIAN2 = "https://api.m2mglobaltech.com/QuikTrak/V1/";
var API_DOMIAN3 = "http://api.m2mglobaltech.com/PhoneTrack/V1/";
var API_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=";
var API_URL = {};

API_URL.URL_GET_LOGIN = API_DOMIAN2 + "User/Auth?username={0}&password={1}&appKey={2}&mobileToken={3}&deviceToken={4}&deviceType={5}";
API_URL.URL_GET_LOGOUT = API_DOMIAN2 + "User/Logoff2?MajorToken={0}&MinorToken={1}&username={2}&mobileToken={3}";
API_URL.URL_EDIT_ACCOUNT = API_DOMIAN2 + "User/Edit?MajorToken={0}&MinorToken={1}&FirstName={2}&SubName={3}&Mobile={4}&Phone={5}&EMail={6}";
API_URL.URL_RESET_PASSWORD = API_DOMIAN2 + "User/Password?MinorToken={0}&oldpwd={1}&newpwd={2}";
//API_URL.URL_EDIT_DEVICE = API_DOMIAN2 + "Device/Edit?MinorToken={0}&Code={1}&name={2}&speedUnit={3}&initMileage={4}&initAccHours={5}&attr1={6}&attr2={7}&attr3={8}&attr4={9}&tag={10}&icon={11}";
API_URL.URL_EDIT_DEVICE = API_DOMIAN2 +  "Device/Edit?MinorToken={0}&Code={1}&name={2}&speedUnit={3}&initMileage={4}&initAccHours={5}&attr1={6}&attr2={7}&attr3={8}&attr4={9}&tag={10}&icon={11}&MajorToken={12}&registration=&MaxSpeed=&stockNumber=";
API_URL.URL_GET_ALL_POSITIONS = API_DOMIAN2 + "Device/GetPosInfos?MinorToken={0}";
//API_URL.URL_GET_NEW_NOTIFICATIONS = API_DOMIAN2 +"Device/Alarms?MinorToken={0}&deviceToken={1}";
API_URL.URL_PHOTO_UPLOAD = "http://upload.quiktrak.co/image/Upload";

API_URL.URL_ADD_NEW_DEVICE = API_DOMIAN1 + 'Client/Activation';
API_URL.URL_ADD_NEW_DEVICE2 = 'http://activation.phonetrack.co/activate.php?imei={0}&account={1}';
API_URL.URL_REGISTER = API_DOMIAN1 + 'Client/Registration';
API_URL.URL_DEACTIVATE = API_DOMIAN1 + 'Client/Deactivate';

//API_URL.UPLOAD_LINK = API_DOMIAN3 + 'Client/UploadGPS';
//API_URL.UPLOAD_LINK = API_DOMIAN2 + 'Device/UploadGPS';
API_URL.UPLOAD_LINK = API_DOMIAN2 + 'Device/UploadGPS2';

API_URL.UPLOAD_LINK_TEST = 'https://sinopacificukraine.com/test/phonetrack/locations.php';


API_URL.URL_TRACKING_IP = "194.247.12.43";
API_URL.URL_TRACKING_PORT = "50001"; 
/*API_URL.URL_TRACKING_IP = "test.m2mdata.co";
API_URL.URL_TRACKING_PORT = "20771";*/

//http://api.m2mglobaltech.com/PhoneProtect/V1/Client/Activation
//http://api.m2mglobaltech.com/PhoneProtect/V1/Client/Registration

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
        var height = 88;         
        return height; //display the image with 50px height
    },
    // Display the each item using Template7 template parameter
    renderItem: function (index, item) {

        var ret = '';

            var assetImg = getAssetImg(item, {'assetList':true});

                ret +=  '<li class="item-content" data-imei="' + item.IMEI + '" data-imsi="' + item.IMSI + '" data-name="' + item.Name + '" data-id="' + item.Id + '">';
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

        
        return ret;
    },
});

var cameraButtons = [
    {
        text: LANGUAGE.PHOTO_EDIT_MSG01,
        onClick: function () {
            //getImage();
        }
    },
    {
        text: LANGUAGE.PHOTO_EDIT_MSG02,
        onClick: function () {
           // galleryImgs();
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

$$(document).on('submit', '.login-form', function (e) {    
    e.preventDefault();     
    login();
    return false;
});

$$(document).on('click', '.bTrackingStart', function(){
    bgGeo.start().then(function() {
        App.alert('BackgroundGeolocation tracking started');
        console.log('- BackgroundGeolocation tracking started');
    });
});

$$(document).on('click', '.bTrackingStop', function(){
    bgGeo.stop().then(function() {
        App.alert('BackgroundGeolocation tracking stopped');
        console.log('- BackgroundGeolocation tracking started');
    });
});

$$(document).on('click', '.bTrackingStatus', function(){
    bgGeo.ready(
        {}, 
        function(state) {    // <-- Current state provided to #configure callback       
            if (state.enabled) {
                App.alert('Tracking enabled');
            }else{
                App.alert('Tracking disabled');
            }
        }
    );
});

$$(document).on('click', '.bTrackingState', function(){
    bgGeo.ready(
        {},
        function(state) {    // <-- Current state provided to #configure callback
            alert(JSON.stringify(state));
        }
    );
});

$$(document).on('click', '.bTrackingStatusScheduler', function(){
    bgGeo.ready(
        {},
        function(state) {    // <-- Current state provided to #configure callback
            if (state.schedulerEnabled) {
                App.alert('Scheduler enabled');
            }else{
                App.alert('Scheduler disabled');
            }
        }
    );
});


$$(document).on('click', '.getIMEI', function(){
    var savedConfig = trackerGetSavedConfig();
    if (savedConfig.IMEI) {
        App.alert('Your Imei is: '+savedConfig.IMEI);
    }else{
        checkTelephonyPermissions();
    }    
});

$$(document).on('click', '.bTrackingSendLog', function(){
    bgGeo.logger.emailLog('s.dimi.d@gmail.com').then((success) => {
        alert('SUCCESS');
    }).catch((error) => {
        alert('ERROR: '+ error);
    });
});


/*$$(document).on('click', '.getSimInfo', function(){
	if (window.plugins.sim) {
		window.plugins.sim.getSimInfo(function(info){
			 App.alert('Sim info: ', JSON.stringify(info) );
	    }, function(err){
	    	App.alert('Unable to get sim info: '+ JSON.stringify(err) );
	    });	
	}else{
		App.alert('Sim Plugin not supported');
	}
		
});

$$(document).on('click', '.hasReadPermission', function(){
	if (window.plugins.sim) {
		window.plugins.sim.hasReadPermission(function(info){
			App.alert('Has permission:'+ JSON.stringify(info) );
    	});	
	}else{
		App.alert('Sim Plugin not supported');
	}
	
	
});

$$(document).on('click', '.requestReadPermission', function(){
	if (window.plugins.sim) {
		window.plugins.sim.requestReadPermission(function(){
			App.alert('Permission granted');
	    }, function(){
	    	App.alert('Permission denied');
	    });	
	}else{
		App.alert('Sim Plugin not supported');
	}
			
});*/
	


	 
	
	 
	

$$('body').on('change keyup input click', '.only_numbers', function(){
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

$$(document).on('change', '.leaflet-control-layers-selector[type="radio"]', function(){    
    if (TargetAsset.IMEI) {        
        var span = $$(this).next();        
        var switcherWrapper = span.find('.mapSwitcherWrapper');
        if (switcherWrapper && switcherWrapper.hasClass('satelliteSwitcherWrapper')) {
            window.PosMarker[TargetAsset.IMEI].setIcon(Protocol.MarkerIcon[1]);
        }else{
            window.PosMarker[TargetAsset.IMEI].setIcon(Protocol.MarkerIcon[0]);
        }
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
        if (typeof navigator !== "undefined" && navigator.app) {
            navigator.app.loadUrl(href, { openExternal: true });
        } else {
            window.open(href, '_blank');
        }
    }
    return false;
});



$$('body').on('click', '.menuAsset', function () {
    var parrent = $$(this).closest('.item-content');
    var savedConfig = trackerGetSavedConfig();
    //var caption = parrent.data('imei');    
    
    TargetAsset.IMEI = !parrent.data('imei')? '' : parrent.data('imei');   
    TargetAsset.IMSI = !parrent.data('imsi')? '' : parrent.data('imsi'); 
    TargetAsset.Name = !parrent.data('name')? '' : parrent.data('name');
    TargetAsset.ID = !parrent.data('id')? '' : parrent.data('id');
    TargetAsset.ASSET_IMG = '';      

    var disabled = true;
    var imei = savedConfig.IMEI;
    if (imei && imei.length !== 16){
        imei = imei.padStart(16,'0');
    }
    if (imei == TargetAsset.IMEI) {
        disabled = false;
    }
    

    var tracking =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-tracking color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG02 +
                        '</div>'+
                    '</div>';

    var timing =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-timing color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG03 +
                        '</div>'+
                    '</div>';

    var settings =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-settings color-dealer "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text">'+
                            LANGUAGE.HOME_MSG04 +
                        '</div>'+
                    '</div>';

    var assetDelete =  '<div class="action_button_wrapper">'+
                        '<div class="action_button_block action_button_media">'+
                            '<i class="f7-icons icon-delete color-red "></i>'+
                        '</div>'+
                        '<div class="action_button_block action_button_text color-red">'+
                            LANGUAGE.HOME_MSG05 +
                        '</div>'+
                    '</div>';

    
    
                    
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
        {
            text: timing,
            disabled: disabled,
            onClick: function () {               
                loadTimingPage();
            },  
        },
        {
            text: settings,           
            onClick: function () {
                loadAssetEditPage();               
            },  
        },
        {
            text: assetDelete,           
            onClick: function () {
                App.confirm(LANGUAGE.PROMPT_MSG010+' - '+TargetAsset.Name+'?', function () {        
                   //removeAllNotifications();
                   //deleteAsset(TargetAsset.IMEI);
                   App.alert(LANGUAGE.PROMPT_MSG020);
                });
               
               
            },  
        },
       
    ];
    App.actions(buttons);
});

App.onPageInit('user.profile', function (page) {     
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
        JSON.request(url, function(result){ 
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

App.onPageInit('user.password', function (page) {     
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
                JSON.request(url, function(result){ 
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

App.onPageInit('asset.add', function (page) { 
    $$('.saveAssetAdd').on('click', function(){
        var device = {
            IMEI: $$(page.container).find('input[name="IMEI"]').val(),
            Name: $$(page.container).find('input[name="Name"]').val(),
            Describe1: '',
            Describe2: '',
            Describe3: '',
            Describe4: '',
            Account: localStorage.ACCOUNT,
            Password: localStorage.PASSWORD,
        };

        if (device.IMEI) {
            App.showPreloader();
            JSON.requestPost(API_URL.URL_ADD_NEW_DEVICE,device, function(result){ 
                    App.hidePreloader();
                    console.log(result);                  
                    if (result.MajorCode == '000') {
                        console.log('here1');
                        //TargetAsset.ASSET_IMG = '';
                        //updateAssetList(device);
                        App.showPreloader();
                        setTimeout(login, 1500);
                                        
                    }else{
                        switch (result.MinorCode){
                            case '1004':
                                App.alert(LANGUAGE.PROMPT_MSG018);
                                break;

                            case '1005':
                                App.alert(LANGUAGE.PROMPT_MSG019);
                                break;

                            default:
                                App.alert(LANGUAGE.PROMPT_MSG013);
                        }
                    } 
                    
                },
                function(){ App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02); }
            );        
        }else{
            App.alert(LANGUAGE.PROMPT_MSG002);
        }
              

    });
});

App.onPageInit('asset.edit', function (page) { 
    $$('.upload_photo, .asset_img img').on('click', function (e) {        
        App.actions(cameraButtons);        
    }); 

    var selectUnitSpeed = $$('select[name="Unit"]');
    if (selectUnitSpeed) {
        selectUnitSpeed.val(selectUnitSpeed.data("set"));
    }    

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

        var inputUnit = $$(page.container).find('input[name="Unit"]');
        if (inputUnit.length > 0) {
            device.Unit = inputUnit.val();
        }

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
        JSON.request(url, function(result){ 
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
    var panoButton = $$(page.container).find('.pano_button');
    var lat = panoButton.data('lat');
    var lng = panoButton.data('lng');
    var latlng = new google.maps.LatLng(lat, lng);

    var data = {
        'posTime':posTime,
        //'posMileage':posMileage,
        //'posSpeed':posSpeed,
        'posAddress':posAddress,
        'routeButton':routeButton,
        'panoButton':panoButton,
    };

    $$('.refreshTrack').on('click', function(){   
        updateAssetData(data);          
    });
    
    StreetViewService.getPanorama({location:latlng, radius: 50}, processSVData);

    panoButton.on('click', function(){             
        var params = {
            'lat': $$(this).data('lat'),
            'lng': $$(this).data('lng'),
        };
        showStreetView(params);        
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
    console.log(page.context);
    var selectInterval = $$(page.container).find('#trackingInterval');
    var applyUserTiming = $$('body').find('.applyUserTiming');

    selectInterval.val(selectInterval.data("set"));

    var snapSlider = document.getElementById('timeOfDay');
    var startTimeMinutes = $$(page.container).find('#startTime');
    var endTimeMinutes = $$(page.container).find('#endTime');
    var dayOfWeek = $(page.container).find('#dayOfWeek');
    var trackingStateEl = $$(page.container).find('input[name="tracking-enabled"]');
    var trackingServerEl = $$(page.container).find('[name="trackingServer"]');

    var dayOfWeekset = dayOfWeek.data('set').toString();
    var dayOfWeekArr = [];

    if (dayOfWeekset && dayOfWeekset.indexOf(',') != -1) {
        dayOfWeekArr = dayOfWeekset.split(',');
    }else if(dayOfWeekset){
        dayOfWeekArr = [dayOfWeekset];
    }
    if (dayOfWeekArr.length > 0) {
        $.each(dayOfWeekArr, function(i, v){
            dayOfWeek.find("option[value='" + v + "']").prop("selected", true);
        });
    }

    if(window.device) {
        checkTelephonyPermissions(); 
    }

    noUiSlider.create(snapSlider, {
        start: [parseInt(startTimeMinutes.data('set')), parseInt(endTimeMinutes.data('set'))],
        connect: true,
        step: 5,
        range: {
            'min': 0,
            'max': 1439
        }
    });

    var snapValues = [
         document.getElementById('startTime'),
         document.getElementById('endTime')
    ];

    snapSlider.noUiSlider.on('update', function( values, handle ) {
        var calculated = values[handle];     
        var h = calculated / 60 ^ 0;        
        if (h) {
            var m = calculated % 60;
            if (m < 10) m = '0' + m;
            if (h < 10) h = '0' + h;
            calculated = h + ':' + m;
        } else {
            calculated = '00:' + parseInt(calculated);
        }
        snapValues[handle].innerHTML = calculated;
        $$(snapValues[handle]).data('set',values[handle]);
    });

    /*trackingStateEl.on('change', function () {
        console.log(this.checked);
    });*/

    applyUserTiming.on('click', function(){
        //alert('click');
        var interval = parseInt(selectInterval.val()) * 1000;
        var daysOfWeekArray = dayOfWeek.val();
        var valid = true;
        var schedule = [];
        var startTimeText = startTimeMinutes.text();
        var endTimeText = endTimeMinutes.text();
        var scheduleState = trackingStateEl.prop('checked');
        var trackingServerVal = parseInt(trackingServerEl.val());
        var trackingServer = API_URL.UPLOAD_LINK_TEST;

        if (trackingServerVal === 2){
            trackingServer = API_URL.UPLOAD_LINK
        }



        if (!daysOfWeekArray || daysOfWeekArray.length === 0) {   
        	valid = false;        	
        }

        if (!valid && state) {
            App.alert('Set tracking days, please');
            return;
        }

        $.each(daysOfWeekArray, function(key,val){
            schedule.push(val + ' ' + startTimeText + '-' + endTimeText);
        });

        var trackerConfig = {
            DayOfWeek: !dayOfWeek.val() ? '' :  dayOfWeek.val().toString(),
            StartTime: startTimeMinutes.data('set'),
            EndTime: endTimeMinutes.data('set'),
            Interval: interval,
            ScheduleState: scheduleState,
            Schedule: schedule,
            IMEI: page.context.IMEI
        };
        trackerSaveConfig(trackerConfig);

        //console.log(schedule);

        if (!bgGeo) {
            App.alert('Tracking not supported');
            return;
        }
        bgGeo.setConfig({
            distanceFilter: 0,            // Must be 0 or locationUpdateInterval is ignored!
            locationUpdateInterval: interval,  // Get a location every 5 seconds
            schedule: schedule,
            url: trackingServer,
            params: {
                IMEI: trackerConfig.IMEI,
            }
        }, function (state) {
            //alert(JSON.stringify(state));
            if (scheduleState){
                bgGeo.requestPermission().then((status) => {
                    bgGeo.startSchedule(function() {
                        App.alert('Tracking schedule started');
                        mainView.router.back();
                    });
                }).catch((status) => {
                    App.alert('Tracking permission denied');
                    console.log('[requestPermission] REJECTED', status);
                    trackerSaveConfig({ScheduleState: false});
                });

            }else{
                bgGeo.stopSchedule(function() {
                    App.alert('Tracking schedule stopped');
                    // You must explicitly stop tracking if currently enabled
                    bgGeo.stop();
                    mainView.router.back();
                });
            }
        });



        /*var serverURL = API_URL.UPLOAD_LINK;
        if  (trackingServerEl.val() == '2'){
            serverURL = API_URL.UPLOAD_LINK_TEST
        }*/


        /*if (trackingStateEl.prop('checked')){
            bgGeo.setConfig({
                url: serverURL,
                distanceFilter: 0,            // Must be 0 or locationUpdateInterval is ignored!
                locationUpdateInterval: interval,  // Get a location every 5 seconds
                params: {
                    IMEI: localStorage.tracker_imei,
                }
            });
            bgGeo.start().then(function() {
                App.alert('Geolocation tracking started');
                localStorage.tracker_state = true;
            });
        }else{
            bgGeo.stop().then(function() {
                localStorage.tracker_state = false;
                App.alert('Geolocation tracking stopped');
            });
        }*/


    

    });

    
    

});

function trackerGetSavedConfig() {
    var ret = {};
    var str = localStorage.getItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG");
    if (str){
        ret = JSON.parse(str);
    }
    return ret;
}

function trackerSaveConfig(config={}) {
    if (!isObjEmpty(config)){
        var savedConfig = trackerGetSavedConfig();
        const keys = Object.keys(config)
        for (const key of keys) {
            savedConfig[key] = config[key];
        }
        localStorage.setItem("COM.QUIKTRAK.PHONETRACK.TRACKERCONFIG", JSON.stringify(savedConfig));
    }
}

function clearUserInfo(){
    
   
    //var appId = !localStorage.PUSH_APPID_ID? '' : localStorage.PUSH_APPID_ID;
    //var deviceToken = !localStorage.PUSH_DEVICE_TOKEN? '' : localStorage.PUSH_DEVICE_TOKEN;
    var userName = !localStorage.ACCOUNT? '' : localStorage.ACCOUNT;
    var userInfo = getUserinfo();
    var MinorToken = userInfo.MinorToken;      
    var MajorToken = userInfo.MajorToken;
    var mobileToken = !localStorage.PUSH_MOBILE_TOKEN? '' : localStorage.PUSH_MOBILE_TOKEN;
    var savedConfig = trackerGetSavedConfig();
    //var pushList = getNotificationList();

    window.PosMarker = {};
    TargetAsset = {};

    if (virtualAssetList) {
        virtualAssetList.deleteAllItems();
    }
    
    localStorage.clear(); 

    if (!isObjEmpty(savedConfig)){
        trackerSaveConfig(savedConfig);
    }
    
    if(mobileToken){         
        JSON.request(API_URL.URL_GET_LOGOUT.format(MajorToken, MinorToken, userName, mobileToken), function(result){ console.log(result); });  
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
    JSON.request(urlLogin, function(result){
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
    var savedConfig = trackerGetSavedConfig();

    var href = API_URL.URL_ADD_NEW_DEVICE2.format(savedConfig.IMEI,localStorage.ACCOUNT);

    if (typeof navigator !== "undefined" && navigator.app) {
        navigator.app.loadUrl(href, { openExternal: true });
    } else {
        window.open(href, '_blank');
    }

        setTimeout(function(){
            App.modal({
                //title: LANGUAGE.PROMPT_MSG016,
                text: LANGUAGE.PROMPT_MSG008, //LANGUAGE.PROMPT_MSG017
                buttons: [
                    {
                        text: LANGUAGE.COM_MSG19,
                        onClick: function() {
                            //myApp.alert('You clicked first button!')
                            login();
                            
                        }
                    },
                    {
                        text: LANGUAGE.COM_MSG20,
                        onClick: function() {
                            //mainView.router.back();
                            //afterRechergeCredits();
                        }
                    },
                ]
            });
        }, 3000);
    
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
        var url = 'resources/templates/asset.edit.html';
        if (asset.PRDTName == "PHONE Tracker") {
            url = 'resources/templates/asset.edit2.html';
        }
        mainView.router.load({
        url: url,
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

    var assetList = getAssetList();  
    var asset = assetList[TargetAsset.IMEI];
    
    var phone = !asset.TagName ? '' : asset.TagName;
    var name = !asset.Name ? '' : asset.Name;

    var savedConfig = trackerGetSavedConfig();

    var currentInterval = !savedConfig.Interval ? 20 : parseInt(savedConfig.Interval) / 1000;
    var dayOfWeek = !savedConfig.DayOfWeek ? '' : savedConfig.DayOfWeek;
    var startTimeMinutes = !savedConfig.StartTime ? 540 : savedConfig.StartTime;
    var endTimeMinutes = !savedConfig.EndTime ? 1080 : savedConfig.EndTime;
    var scheduleState = !savedConfig.ScheduleState || savedConfig.ScheduleState === 'false' ? false : true

    console.log(savedConfig);

    mainView.router.load({
        url:'resources/templates/user.timing.html',
        context:{
            Name: name,
            Phone: phone,
            IMEI: savedConfig.IMEI,
            Interval: currentInterval,  
            DayOfWeek: dayOfWeek,
            StartTime: startTimeMinutes,
            EndTime: endTimeMinutes,
            TrackingState: scheduleState,
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
            App.alert(JSON.stringify(p));       
            App.alert("Lat: "+localStorage.tracker_lat+" Lng: "+localStorage.tracker_lng);             
        }, function(e) {
            //App.alert('Geolocation error: ' + e.message);
            App.alert(JSON.stringify(e));
        }, {provider:'baidu'});
    }        

    return  latlng;
}

function loadPageTrack() {

    var asset = POSINFOASSETLIST[TargetAsset.IMEI];
        //console.log(asset);
    if (asset && parseFloat(asset.posInfo.lat) !== 0 && parseFloat(asset.posInfo.lng) !== 0) {            
            
        /*var marker = L.icon({
            iconUrl: 'resources/images/marker.svg',                       
            iconSize:     [50, 50], // size of the icon                        
            iconAnchor:   [25, 49], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor    
        });*/

        window.PosMarker[TargetAsset.IMEI] = L.marker([asset.posInfo.lat, asset.posInfo.lng], {icon: Protocol.MarkerIcon[0]}); 
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
                Lat: latlng.lat,
                Lng: latlng.lng,
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

       /* var marker = L.icon({
            iconUrl: 'resources/images/marker.svg',                       
            iconSize:     [50, 50], // size of the icon                        
            iconAnchor:   [25, 49], // point of the icon which will correspond to marker's location                        
            popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor    
        });   */

        window.PosMarker.ME = L.marker([myPosition.lat, myPosition.lng], {icon: Protocol.MarkerIcon[0]}); 
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

function processSVData(data, status) {
    var SVButton = $$(document).find('.pano_button');
    var parrent = SVButton.closest('.pano_button_wrapper');
    
    if (SVButton) {
        if (status === 'OK') {
            parrent.removeClass('disabled');
        } else {
            parrent.addClass('disabled');
            console.log('Street View data not found for this location.');
        }
    }        
}

function showStreetView(params){ 
    var dynamicPopup = '<div class="popup">'+
                              '<div class="float_button_wrapper back_button_wrapper close-popup"><i class="f7-icons">close</i></div>'+
                              '<div class="pano_map">'+
                                '<div id="pano" class="pano" ></div>'+                        
                              '</div>'+
                            '</div>';            
    App.popup(dynamicPopup);

    var panoramaOptions = {
            position: new google.maps.LatLng(params.lat, params.lng),
            pov: {
                heading: 0,
                pitch: 0
            },
            linksControl: false,
            panControl: false,
            enableCloseButton: false,
            addressControl: false
    };
    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);      
}


function showMap(){    
    var asset = TargetAsset.IMEI;   
    var latlng = [POSINFOASSETLIST[asset].posInfo.lat, POSINFOASSETLIST[asset].posInfo.lng];
    MapTrack = Protocol.Helper.createMap({ target: 'map', latLng: latlng, zoom: 15 });        
    window.PosMarker[TargetAsset.IMEI].addTo(MapTrack); 

    if (!StreetViewService) {
        StreetViewService = new google.maps.StreetViewService();
    }  
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

function updateAssetList(asset){
    var list = getAssetList();    
    if (!list[asset.IMEI]) {
        list[asset.IMEI] = {};
    }
    if (!POSINFOASSETLIST[asset.IMEI]) {
        POSINFOASSETLIST[asset.IMEI] = {};
    }
       
    POSINFOASSETLIST[asset.IMEI].IMEI = list[asset.IMEI].IMEI = asset.IMEI;
    POSINFOASSETLIST[asset.IMEI].Name = list[asset.IMEI].Name = asset.Name;
    POSINFOASSETLIST[asset.IMEI].TagName = list[asset.IMEI].TagName = asset.Tag;
    POSINFOASSETLIST[asset.IMEI].Unit = list[asset.IMEI].Unit = asset.Unit;
    POSINFOASSETLIST[asset.IMEI].InitMileage = list[asset.IMEI].InitMileage = asset.Mileage;
    POSINFOASSETLIST[asset.IMEI].InitAcconHours = list[asset.IMEI].InitAcconHours = asset.Runtime;
    POSINFOASSETLIST[asset.IMEI].Describe1 = list[asset.IMEI].Describe1 = asset.Describe1;
    POSINFOASSETLIST[asset.IMEI].Describe2 = list[asset.IMEI].Describe2 = asset.Describe2;
    POSINFOASSETLIST[asset.IMEI].Describe3 = list[asset.IMEI].Describe3 = asset.Describe3;
    POSINFOASSETLIST[asset.IMEI].Describe4 = list[asset.IMEI].Describe4 = asset.Describe4; 
    if (asset.Icon) {
        POSINFOASSETLIST[asset.IMEI].Icon = list[asset.IMEI].Icon = asset.Icon +'?'+ new Date().getTime();
    }
    
    localStorage.setItem("COM.QUIKTRAK.PHONETRACK.ASSETLIST", JSON.stringify(list));
}

function setAssetListPosInfo(listObj){    
    var userInfo = getUserinfo();   

    var url = API_URL.URL_GET_ALL_POSITIONS.format(userInfo.MinorToken); 
    JSON.request(url, function(result){  
            App.hidePreloader();   
            console.log(result);                       
            if (result.MajorCode == '000') {
                var data = result.Data;    

                if(data && data.length > 0){
                    $.each( data, function( key, value ) {  
                        var posData = value;
                        var imei = posData[1];
                        var protocolClass = posData[2];
                        var deviceInfo = listObj[imei];            
                        console.log(deviceInfo);  
                        
                        POSINFOASSETLIST[imei] = Protocol.ClassManager.get(protocolClass, deviceInfo);
                        POSINFOASSETLIST[imei].initPosInfo(posData); 
                        
                    });
                }              
                
                console.log(POSINFOASSETLIST);
                             
            } else{
                console.log(result);
            }
            init_AssetList(); 
            initSearchbar(); 
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
            if (updateAssetsPosInfoTimer) {
                clearInterval(updateAssetsPosInfoTimer);
            }
            updateAssetsPosInfoTimer = setInterval(function(){
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
    JSON.request(url, function(result){ 
            //console.log(result);                     
            if (result.MajorCode == '000') {
                var data = result.Data;  
                var posData = ''; 
                var imei = '';   
                if (data){
                    $.each( data, function( key, value ) {  
                        posData = value;
                        imei = posData[1];  
                        if (POSINFOASSETLIST && POSINFOASSETLIST[imei]) {
                            POSINFOASSETLIST[imei].initPosInfo(posData);      
                        }                  
                                      
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
    App.showProgressbar(container, 'gray');

    JSON.request(url, function(result){ 
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

function deleteAsset(IMEI){
    if (IMEI) {
        var data = {
            IMEI : IMEI,
        }
        App.showPreloader();
        JSON.request(API_URL.URL_DEACTIVATE, data, function(result){
                console.log(result);
            },
            function(){ 
                App.hidePreloader(); App.alert(LANGUAGE.COM_MSG02);
            }
        );
    }
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
            if (data.panoButton) {
                data.panoButton.data('lat',latlng.lat);
                data.panoButton.data('lng',latlng.lng);
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

        JSON.request(url, function(result){
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

function isObjEmpty(obj) {
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
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
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
                //alert(JSON.stringify(localurl));
                //GetBase64Code(localurl);
                toDataURLBase64(
                    localurl,
                    function(dataUrl) {
                        //alert(dataUrl);

                        mainView.router.load({
                            url: 'resources/templates/asset.edit.photo.html',
                            context: {
                                imgSrc: dataUrl
                            }
                        });
                    }
                );
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
            //alert(JSON.stringify(e.files[0]));

            //GetBase64Code(e.files[0]);

            toDataURLBase64(
                e.files[0],
                function(dataUrl) {
                    //alert(dataUrl);
                    mainView.router.load({
                        url: 'resources/templates/asset.edit.photo.html',
                        context: {
                            imgSrc: dataUrl
                        }
                    });
                }
            );

        }, function ( e ) {
            //outSet( "CANCEL SELECT" );

            //alert('canceled');
            //alert(JSON.stringify(e));
        },{filter:"image",multiple:true, maximum:1});
    }else{
        console.log('Plus not found');        
    }
        
}

function GetBase64Code(path) //image path
{
    alert(path);
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
       
        alert('IMAGEЈ'+base4);
    },function(e){
        alert('ERRORЈ'+JSON.stringify(e));
    });
}

/*function toDataURLBase64(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
}*/




function toDataURLBase64(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}





