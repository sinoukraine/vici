const Helper = {
    MarkerIcon: [
        L.icon({
            iconUrl: 'resources/images/pins/marker.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-gray.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-orange.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-red.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-green.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-blue.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-black.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
        L.icon({
            iconUrl: 'resources/images/pins/pin-yellow.svg',
            iconSize:     [60, 60], // size of the icon
            iconAnchor:   [17, 55], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
        }),
    ],
    enumTestTypes:{
        Unknown: 0,
        Virus: 1,
        AntiBody: 2,
    },
    enumTestStatus:{
        Invalid: -1,
        Unknown: 0,
        Submited: 1,
        Testing: 4,
        Negative: 16,
        Positive: 32,
    },
    enumPersonStatus:{
        Invalid: -1,
        Unknown: 0,
        Unfected: 2,
        Suspected: 4,
        Infected: 8,
        SevereCases: 16,
        Observed: 32,
        Recovered: 64,
        Death: 128,
    },
    enumPersonMessageTemplate:{
        Unknown: 0,
        InfectedArea: 1,
        TestProgress: 2,
    },



    testEnum: {
        Untested: -1,
        Submitted: 1,
        Testing: 2,
        Infected: 4,
        SeveralCases: 8,
        Recovered: 16,
        Dead: 32,
        NotInfected: 64,
        Observed: 128,
        Suspected: 256,
    },
    posInfoEnum:{
        id: 0,
        lat: 1,
        lng: 2,
        state: 3,
        time: 4,
    },
    fieldsEnum:{
        /*test from*/
        organizename: LANGUAGE.UNIT_TEST_RESULT_MSG001,
        organizestreet: LANGUAGE.UNIT_TEST_RESULT_MSG002,
        doctorfirstname: LANGUAGE.UNIT_TEST_RESULT_MSG004,
        doctorsubname: LANGUAGE.UNIT_TEST_RESULT_MSG005,
        diagnosenumber: LANGUAGE.UNIT_TEST_RESULT_MSG006,
        begintime: LANGUAGE.UNIT_TEST_RESULT_MSG003,
        endtime: LANGUAGE.UNIT_TEST_RESULT_MSG012,
        diagnosetype: LANGUAGE.UNIT_TEST_RESULT_MSG007,
        diagnosestate: LANGUAGE.UNIT_TEST_RESULT_MSG008,
        diagnoseremark: LANGUAGE.UNIT_TEST_RESULT_MSG011,
        /*user form*/
        certnumber: LANGUAGE.UNIT_INFO_MSG000,
        //phonenumber: LANGUAGE.UNIT_INFO_MSG001,
        //firstname: LANGUAGE.UNIT_INFO_MSG003,
        //subname: LANGUAGE.UNIT_INFO_MSG004,
        //gender: LANGUAGE.UNIT_INFO_MSG007,
        //birthday: LANGUAGE.UNIT_INFO_MSG008,
        /*user address*/
        //countrycode: LANGUAGE.UNIT_INFO_MSG020,
        //provinceid: LANGUAGE.UNIT_INFO_MSG009,
        //cityid: LANGUAGE.UNIT_INFO_MSG010,
        //street: LANGUAGE.UNIT_INFO_MSG012,
        addressdetail: LANGUAGE.UNIT_INFO_MSG013,

        /*REGISTER FORM*/
        phonenumber: LANGUAGE.COM,
        verificationcode: LANGUAGE.REGISTRATION_MSG01,
        firstname: LANGUAGE.REGISTRATION_MSG03,
        subname: LANGUAGE.REGISTRATION_MSG04,
        password: LANGUAGE.REGISTRATION_MSG05,
        gender: LANGUAGE.REGISTRATION_MSG07,
        birthday: LANGUAGE.REGISTRATION_MSG08,
        countrycode: LANGUAGE.REGISTRATION_MSG02,
        provinceid: LANGUAGE.REGISTRATION_MSG09,
        cityid: LANGUAGE.REGISTRATION_MSG10,
        street: LANGUAGE.REGISTRATION_MSG12,
        address: LANGUAGE.REGISTRATION_MSG13,
        addresscode: LANGUAGE.REGISTRATION_MSG20,
        addresslat: LANGUAGE.REGISTRATION_MSG21,
        addresslng: LANGUAGE.REGISTRATION_MSG22,
    },

    minorCodeEnum:{
        "0000": 'All OK',
        "0001": 'Field is mandatory',
        "0002": 'Exceeded field length limit',
        "0003": 'Not existing',
        "0004": 'Incorrect format',
        "0005": 'Already exist',
        "0006": 'Disabled',
        "0007": 'Input Error',
    },
    Methods: {
        getMarkerIcon(userState, testState){
            let ret = Helper.MarkerIcon[1];
            if(userState === Helper.enumPersonStatus.Invalid || userState === Helper.enumPersonStatus.Unknown){
                if(testState === Helper.enumTestStatus.Submited ){
                    ret = Helper.MarkerIcon[7];
                }else if(testState === Helper.enumTestStatus.Testing){
                    ret = Helper.MarkerIcon[2];
                }
            }else if(userState === Helper.enumPersonStatus.Unfected){
                ret = Helper.MarkerIcon[4];
            }else if(userState === Helper.enumPersonStatus.Suspected || userState === Helper.enumPersonStatus.Observed){
                ret = Helper.MarkerIcon[2];
            }else if(userState === Helper.enumPersonStatus.Infected || userState === Helper.enumPersonStatus.SevereCases){
                ret = Helper.MarkerIcon[3];
            }else if(userState === Helper.enumPersonStatus.Recovered){
                ret = Helper.MarkerIcon[5];
            }else if(userState === Helper.enumPersonStatus.Death){
                ret = Helper.MarkerIcon[6];
            }

            return ret;
        },
        getWeekDaysArr: function(){
            return [
                {
                    Val: 1,
                    Name: LANGUAGE.COM_MSG003,
                    DisplayAs: LANGUAGE.COM_MSG010,
                },
                {
                    Val: 2,
                    Name: LANGUAGE.COM_MSG004,
                    DisplayAs: LANGUAGE.COM_MSG011,
                },
                {
                    Val: 3,
                    Name: LANGUAGE.COM_MSG005,
                    DisplayAs: LANGUAGE.COM_MSG012,
                },
                {
                    Val: 4,
                    Name: LANGUAGE.COM_MSG006,
                    DisplayAs: LANGUAGE.COM_MSG013,
                },
                {
                    Val: 5,
                    Name: LANGUAGE.COM_MSG007,
                    DisplayAs: LANGUAGE.COM_MSG014,
                },
                {
                    Val: 6,
                    Name: LANGUAGE.COM_MSG008,
                    DisplayAs: LANGUAGE.COM_MSG015,
                },
                {
                    Val: 7,
                    Name: LANGUAGE.COM_MSG009,
                    DisplayAs: LANGUAGE.COM_MSG016,
                },
            ]
        },
        getAddressByGeocoder: function(latlng,replyFunc, additionalData={}){
            let replyText = LANGUAGE.COM_MSG037 + ': ' + latlng.lat + ', ' + LANGUAGE.COM_MSG038 + ': ' + latlng.lng;
            let data = {
                format: 'json',
                zoom: 18,
                addressdetails: 1,
                lat: latlng.lat,
                lon: latlng.lng,
            };
            app.request.get(API_DOMIAN7+'reverse.php', data, function (result) {
                additionalData.result = {};
                if (result.display_name) {
                    replyText = result.display_name;
                    additionalData.result = result;
                }
                replyFunc(replyText, additionalData);
            }, function () {
                app.request.get(API_DOMIAN8+'reverse', data, function (result) {
                    additionalData.result = {};
                    if (result.display_name) {
                        additionalData.result = result;
                        replyText = result.display_name;
                    }
                    replyFunc(replyText, additionalData);
                }, function () {
                    replyFunc(replyText, additionalData);
                }, 'json');
            }, 'json');
        },
        createMap: function(option){
            var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { name: 'osm', noWrap: true, attribution: '' });
            var googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'+'&hl='+option.lang,{
                noWrap: true,
                maxZoom: 22,
                subdomains:['mt0','mt1','mt2','mt3']
            });
            var googleSatelitte = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'+'&hl='+option.lang,{
                noWrap: true,
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });

            var map = L.map(option.target, {
                zoomControl: false,
                center: option.latLng,
                zoom: option.zoom,
                layers: [googleStreets],
                minZoom:1,
                maxBounds: [
                    [-85.0, -180.0],
                    [85.0, 180.0]
                ]
            });

            var layers = {
                "<span class='mapSwitcherWrapper googleSwitcherWrapper'><img class='layer-icon' src='resources/images/googleRoad.png' alt='' /> <p>Map</p></span>": googleStreets,
                "<span class='mapSwitcherWrapper satelliteSwitcherWrapper'><img class='layer-icon' src='resources/images/googleSatellite.png' alt='' />  <p>Satellite</p></span>": googleSatelitte,
                "<span class='mapSwitcherWrapper openstreetSwitcherWrapper'><img class='layer-icon' src='resources/images/openStreet.png' alt='' /> <p>OpenStreet</p></span>": osm,
            };

            L.control.layers(layers).addTo(map);

            return map;
        },
        getDirectionCardinal: function(direction){
            let ret = "";
            direction = parseFloat(direction);
            switch (true){
                case (direction >= 338 || direction <= 22 ):
                    ret = LANGUAGE.COM_MSG019+'('+direction+'°)';
                    break;
                case (direction >= 23 && direction <= 75 ):
                    ret = LANGUAGE.COM_MSG020+'('+direction+'°)';
                    break;
                case (direction >= 76 && direction <= 112 ):
                    ret = LANGUAGE.COM_MSG021+'('+direction+'°)';
                    break;
                case (direction >= 113 && direction <= 157 ):
                    ret = LANGUAGE.COM_MSG022+'('+direction+'°)';
                    break;
                case (direction >= 158 && direction <= 202 ):
                    ret = LANGUAGE.COM_MSG023+'('+direction+'°)';
                    break;
                case (direction >= 203 && direction <= 247 ):
                    ret = LANGUAGE.COM_MSG024+'('+direction+'°)';
                    break;
                case (direction >= 248 && direction <= 292 ):
                    ret = LANGUAGE.COM_MSG025+'('+direction+'°)';
                    break;
                case (direction >= 293 && direction <= 337 ):
                    ret = LANGUAGE.COM_MSG026+'('+direction+'°)';
                    break;
                default: ret = LANGUAGE.COM_MSG027+'('+direction+'°)';
            }
            return ret;
        },
        getSpeedValueInKM: function (speedUnit, speed) {
            let ret = 0;
            switch (speedUnit) {
                case "KT":
                    ret = parseFloat(speed  / 0.53995680345572);
                    break;
                case "KPH":
                    ret = parseFloat(speed);
                    break;
                case "MPS":
                    ret = parseFloat(speed / 0.277777778);
                    break;
                case "MPH":
                    ret = parseFloat(speed / 0.621371192);
                    break;
            }
            return Math.round(ret);
        },



        getTestTypeStateDescription: function(num){
            let ret = {
                text: LANGUAGE.COM_MSG076,
                textColor: 'text-color-gray',
            };
            num = parseInt(num);
            switch (num) {
                case -1: ret = { text: LANGUAGE.COM_MSG077, textColor: 'text-color-gray', }; break;
                case 0:  ret = {  text: LANGUAGE.COM_MSG076, textColor: 'text-color-gray', }; break;
                case 1:  ret = { text: LANGUAGE.PROMPT_MSG087, textColor: 'text-color-yellow', }; break;
                case 4:  ret = { text: LANGUAGE.COM_MSG063, textColor: 'text-color-orange', }; break;
                case 16:  ret = { text: LANGUAGE.COM_MSG072, textColor: 'text-color-black', }; break;
                case 32:  ret = { text: LANGUAGE.COM_MSG073, textColor: 'text-color-black', }; break;
            }
            return ret;
        },
        getPersonStatusDescription(num, testNum){
            let ret = {
                text: LANGUAGE.COM_MSG041,
                textColor: 'text-color-gray',
            };
            num = parseInt(num);
            testNum = parseInt(testNum);
            switch (num) {
                case 0: ret = { text: LANGUAGE.COM_MSG042, textColor:'text-color-gray'  }; break;
                case 2: ret = { text: LANGUAGE.COM_MSG040, textColor:'text-color-green' }; break;
                case 4: ret = { text: LANGUAGE.COM_MSG064, textColor:'text-color-orange' }; break;
                case 8: ret = { text: LANGUAGE.COM_MSG039, textColor:'text-color-red' }; break;
                case 16: ret = { text: LANGUAGE.COM_MSG067, textColor:'text-color-red' }; break;
                case 32: ret = { text: LANGUAGE.COM_MSG066, textColor:'text-color-orange' }; break;
                case 64: ret = { text: LANGUAGE.COM_MSG033, textColor:'text-color-blue' }; break;
                case 128: ret = { text: LANGUAGE.COM_MSG065, textColor:'text-color-black' }; break;
            }
            if(num < 2 && testNum < 1){
                ret.text = LANGUAGE.COM_MSG041;
            }else if(num < 2 && testNum === 1){
                ret.text = LANGUAGE.COM_MSG042;
            }
            return ret;
        },
        getTestTypeName: function(num){
            let ret = LANGUAGE.COM_MSG076;
            num = parseInt(num);
            let test = this.getTestTypeList().find( ({ Val }) => Val === num );
            if(test) ret = test.Name;
            return ret;
        },
        getTestTypeList: function(){
            return [
                { Val: 1, Name: LANGUAGE.UNIT_TEST_RESULT_MSG009 },
                { Val: 2, Name: LANGUAGE.UNIT_TEST_RESULT_MSG010 },
            ]
        },
        getTypeResulList: function(){
            return [
                {Val: 2, Name: LANGUAGE.COM_MSG072 },
                {Val: 1, Name: LANGUAGE.COM_MSG073 }
            ]
        },
        getGenderList: function(){
            return [
                {Val: 1, Name: LANGUAGE.REGISTRATION_MSG17 },
                {Val: 0, Name: LANGUAGE.REGISTRATION_MSG18 }
            ]
        },
        getProvinceCityList: function () {
            return [
                {
                    Name: 'Eastern Cape',
                    Id: 1,
                    List: [
                        { ProvinceId:1,	CityId:1001,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1001-",	Name:"Aberdeen" },
                        { ProvinceId:1,	CityId:1002,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1002-",	Name:"Adelaide" },
                        { ProvinceId:1,	CityId:1003,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1003-",	Name:"Adendorp" },
                        { ProvinceId:1,	CityId:1004,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1004-",	Name:"Addo" },
                        { ProvinceId:1,	CityId:1005,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1005-",	Name:"Alderley" },
                        { ProvinceId:1,	CityId:1006,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1006-",	Name:"Alexandria" },
                        { ProvinceId:1,	CityId:1007,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1007-",	Name:"Alice" },
                        { ProvinceId:1,	CityId:1008,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1008-",	Name:"Alicedale" },
                        { ProvinceId:1,	CityId:1009,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1009-",	Name:"Aliwal North" },
                        { ProvinceId:1,	CityId:1010,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1010-",	Name:"Bailey" },
                        { ProvinceId:1,	CityId:1011,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1011-",	Name:"Balfour" },
                        { ProvinceId:1,	CityId:1012,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1012-",	Name:"Barakke" },
                        { ProvinceId:1,	CityId:1013,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1013-",	Name:"Barkly East" },
                        { ProvinceId:1,	CityId:1014,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1014-",	Name:"Baroe" },
                        { ProvinceId:1,	CityId:1015,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1015-",	Name:"Bathurst" },
                        { ProvinceId:1,	CityId:1016,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1016-",	Name:"Bedford" },
                        { ProvinceId:1,	CityId:1017,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1017-",	Name:"Behulpsaam" },
                        { ProvinceId:1,	CityId:1018,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1018-",	Name:"Bell" },
                        { ProvinceId:1,	CityId:1019,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1019-",	Name:"Bellevue" },
                        { ProvinceId:1,	CityId:1020,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1020-",	Name:"Berlin" },
                        { ProvinceId:1,	CityId:1021,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1021-",	Name:"Bethelsdorp" },
                        { ProvinceId:1,	CityId:1022,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1022-",	Name:"Bhisho" },
                        { ProvinceId:1,	CityId:1023,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1023-",	Name:"Bityi" },
                        { ProvinceId:1,	CityId:1024,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1024-",	Name:"Bonza Bay" },
                        { ProvinceId:1,	CityId:1025,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1025-",	Name:"Braunschweig" },
                        { ProvinceId:1,	CityId:1026,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1026-",	Name:"Burgersdorp" },
                        { ProvinceId:1,	CityId:1027,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1027-",	Name:"Butterworth" },
                        { ProvinceId:1,	CityId:1028,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1028-",	Name:"Cala" },
                        { ProvinceId:1,	CityId:1029,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1029-",	Name:"Cambria" },
                        { ProvinceId:1,	CityId:1030,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1030-",	Name:"Cannon Rocks" },
                        { ProvinceId:1,	CityId:1031,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1031-",	Name:"Cape St. Francis" },
                        { ProvinceId:1,	CityId:1032,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1032-",	Name:"Cathcart" },
                        { ProvinceId:1,	CityId:1033,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1033-",	Name:"Chalumna" },
                        { ProvinceId:1,	CityId:1034,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1034-",	Name:"Chintsa" },
                        { ProvinceId:1,	CityId:1035,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1035-",	Name:"Clarkebury" },
                        { ProvinceId:1,	CityId:1036,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1036-",	Name:"Clifford" },
                        { ProvinceId:1,	CityId:1037,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1037-",	Name:"Coega" },
                        { ProvinceId:1,	CityId:1038,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1038-",	Name:"Coffee Bay" },
                        { ProvinceId:1,	CityId:1039,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1039-",	Name:"Cofimvaba" },
                        { ProvinceId:1,	CityId:1040,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1040-",	Name:"Coghlan" },
                        { ProvinceId:1,	CityId:1041,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1041-",	Name:"Colchester" },
                        { ProvinceId:1,	CityId:1042,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1042-",	Name:"Coleford" },
                        { ProvinceId:1,	CityId:1043,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1043-",	Name:"Cookhouse" },
                        { ProvinceId:1,	CityId:1044,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1044-",	Name:"Cradock" },
                        { ProvinceId:1,	CityId:1045,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1045-",	Name:"Despatch" },
                        { ProvinceId:1,	CityId:1046,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1046-",	Name:"Döhne" },
                        { ProvinceId:1,	CityId:1047,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1047-",	Name:"Dordrecht" },
                        { ProvinceId:1,	CityId:1048,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1048-",	Name:"Dutywa" },
                        { ProvinceId:1,	CityId:1049,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1049-",	Name:"East London" },
                        { ProvinceId:1,	CityId:1050,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1050-",	Name:"Elliot" },
                        { ProvinceId:1,	CityId:1051,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1051-",	Name:"Flagstaff" },
                        { ProvinceId:1,	CityId:1052,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1052-",	Name:"Fort Beaufort" },
                        { ProvinceId:1,	CityId:1053,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1053-",	Name:"Gcuwa" },
                        { ProvinceId:1,	CityId:1054,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1054-",	Name:"Gonubie" },
                        { ProvinceId:1,	CityId:1055,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1055-",	Name:"Graaff-Reinet" },
                        { ProvinceId:1,	CityId:1056,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1056-",	Name:"Grahamstown" },
                        { ProvinceId:1,	CityId:1057,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1057-",	Name:"Hankey" },
                        { ProvinceId:1,	CityId:1058,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1058-",	Name:"Hofmeyr" },
                        { ProvinceId:1,	CityId:1059,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1059-",	Name:"Humansdorp" },
                        { ProvinceId:1,	CityId:1060,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1060-",	Name:"Indwe" },
                        { ProvinceId:1,	CityId:1061,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1061-",	Name:"Jansenville" },
                        { ProvinceId:1,	CityId:1062,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1062-",	Name:"Jeffreys Bay" },
                        { ProvinceId:1,	CityId:1063,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1063-",	Name:"Kenton-on-Sea" },
                        { ProvinceId:1,	CityId:1064,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1064-",	Name:"King William's Town" },
                        { ProvinceId:1,	CityId:1065,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1065-",	Name:"Kirkwood" },
                        { ProvinceId:1,	CityId:1066,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1066-",	Name:"Lady Frere" },
                        { ProvinceId:1,	CityId:1067,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1067-",	Name:"Lady Grey" },
                        { ProvinceId:1,	CityId:1068,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1068-",	Name:"Maclear" },
                        { ProvinceId:1,	CityId:1069,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1069-",	Name:"Madadeni" },
                        { ProvinceId:1,	CityId:1070,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1070-",	Name:"Mandini" },
                        { ProvinceId:1,	CityId:1071,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1071-",	Name:"Matatiele" },
                        { ProvinceId:1,	CityId:1072,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1072-",	Name:"Middelburg" },
                        { ProvinceId:1,	CityId:1073,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1073-",	Name:"Molteno" },
                        { ProvinceId:1,	CityId:1074,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1074-",	Name:"Mount Fletcher" },
                        { ProvinceId:1,	CityId:1075,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1075-",	Name:"Mthatha" },
                        { ProvinceId:1,	CityId:1076,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1076-",	Name:"Engcobo" },
                        { ProvinceId:1,	CityId:1077,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1077-",	Name:"Nieu-Bethesda" },
                        { ProvinceId:1,	CityId:1078,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1078-",	Name:"Oyster Bay" },
                        { ProvinceId:1,	CityId:1079,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1079-",	Name:"Patensie" },
                        { ProvinceId:1,	CityId:1080,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1080-",	Name:"Paterson" },
                        { ProvinceId:1,	CityId:1081,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1081-",	Name:"Port Alfred" },
                        { ProvinceId:1,	CityId:1082,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1082-",	Name:"Port Elizabeth" },
                        { ProvinceId:1,	CityId:1083,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1083-",	Name:"Port St. Johns" },
                        { ProvinceId:1,	CityId:1084,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1084-",	Name:"Queenstown" },
                        { ProvinceId:1,	CityId:1085,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1085-",	Name:"Somerset East" },
                        { ProvinceId:1,	CityId:1086,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1086-",	Name:"Steynsburg" },
                        { ProvinceId:1,	CityId:1087,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1087-",	Name:"St Francis Bay" },
                        { ProvinceId:1,	CityId:1088,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1088-",	Name:"Stutterheim" },
                        { ProvinceId:1,	CityId:1089,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1089-",	Name:"Tarkastad" },
                        { ProvinceId:1,	CityId:1090,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1090-",	Name:"Uitenhage" },
                        { ProvinceId:1,	CityId:1091,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1091-",	Name:"uMthatha" },
                        { ProvinceId:1,	CityId:1092,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1092-",	Name:"Whittlesea" },
                        { ProvinceId:1,	CityId:1093,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-1093-",	Name:"Zwelitsha" },
                        { ProvinceId:1,	CityId:2001,	TreeKeyP:"202-001-",	TreeKeyC:"202-001-2001-",	Name:"Other" },
                    ]
                },{
                    Name: 'Free State',
                    Id: 2,
                    List:[
                        {ProvinceId:2,	CityId:1094,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1094-",	Name:"Aberfeldy"},
                        {ProvinceId:2,	CityId:1095,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1095-",	Name:"Allandale"},
                        {ProvinceId:2,	CityId:1096,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1096-",	Name:"Allanridge"},
                        {ProvinceId:2,	CityId:1097,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1097-",	Name:"Allep"},
                        {ProvinceId:2,	CityId:1098,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1098-",	Name:"Arlington"},
                        {ProvinceId:2,	CityId:1099,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1099-",	Name:"Bethlehem"},
                        {ProvinceId:2,	CityId:1100,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1100-",	Name:"Bethulie"},
                        {ProvinceId:2,	CityId:1101,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1101-",	Name:"Bloemfontein"},
                        {ProvinceId:2,	CityId:1102,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1102-",	Name:"Boshof"},
                        {ProvinceId:2,	CityId:1103,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1103-",	Name:"Bothaville"},
                        {ProvinceId:2,	CityId:1104,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1104-",	Name:"Botshabelo"},
                        {ProvinceId:2,	CityId:1105,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1105-",	Name:"Brandfort"},
                        {ProvinceId:2,	CityId:1106,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1106-",	Name:"Bultfontein"},
                        {ProvinceId:2,	CityId:1107,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1107-",	Name:"Boompie Alleen"},
                        {ProvinceId:2,	CityId:1108,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1108-",	Name:"Clarens"},
                        {ProvinceId:2,	CityId:1109,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1109-",	Name:"Clocolan"},
                        {ProvinceId:2,	CityId:1110,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1110-",	Name:"Cornelia"},
                        {ProvinceId:2,	CityId:1111,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1111-",	Name:"Dealesville"},
                        {ProvinceId:2,	CityId:1112,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1112-",	Name:"Deneysville"},
                        {ProvinceId:2,	CityId:1113,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1113-",	Name:"Dewetsdorp"},
                        {ProvinceId:2,	CityId:1114,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1114-",	Name:"Edenburg"},
                        {ProvinceId:2,	CityId:1115,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1115-",	Name:"Edenville"},
                        {ProvinceId:2,	CityId:1116,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1116-",	Name:"Excelsior"},
                        {ProvinceId:2,	CityId:1117,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1117-",	Name:"Fauresmith"},
                        {ProvinceId:2,	CityId:1118,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1118-",	Name:"Ficksburg"},
                        {ProvinceId:2,	CityId:1119,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1119-",	Name:"Fouriesburg"},
                        {ProvinceId:2,	CityId:1120,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1120-",	Name:"Frankfort"},
                        {ProvinceId:2,	CityId:1121,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1121-",	Name:"Harrismith"},
                        {ProvinceId:2,	CityId:1122,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1122-",	Name:"Heilbron"},
                        {ProvinceId:2,	CityId:1123,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1123-",	Name:"Hennenman"},
                        {ProvinceId:2,	CityId:1124,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1124-",	Name:"Hertzogville"},
                        {ProvinceId:2,	CityId:1125,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1125-",	Name:"Hobhouse"},
                        {ProvinceId:2,	CityId:1126,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1126-",	Name:"Hoopstad"},
                        {ProvinceId:2,	CityId:1127,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1127-",	Name:"Jacobsdal"},
                        {ProvinceId:2,	CityId:1128,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1128-",	Name:"Jagersfontein"},
                        {ProvinceId:2,	CityId:1129,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1129-",	Name:"Kestell"},
                        {ProvinceId:2,	CityId:1130,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1130-",	Name:"Kgotsong"},
                        {ProvinceId:2,	CityId:1131,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1131-",	Name:"Koffiefontein"},
                        {ProvinceId:2,	CityId:1132,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1132-",	Name:"Koppies"},
                        {ProvinceId:2,	CityId:1133,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1133-",	Name:"Kroonstad"},
                        {ProvinceId:2,	CityId:1134,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1134-",	Name:"Ladybrand"},
                        {ProvinceId:2,	CityId:1135,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1135-",	Name:"Lindley"},
                        {ProvinceId:2,	CityId:1136,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1136-",	Name:"Luckhoff"},
                        {ProvinceId:2,	CityId:1137,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1137-",	Name:"Makeleketla"},
                        {ProvinceId:2,	CityId:1138,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1138-",	Name:"Marquard"},
                        {ProvinceId:2,	CityId:1139,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1139-",	Name:"Memel"},
                        {ProvinceId:2,	CityId:1140,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1140-",	Name:"Odendaalsrus"},
                        {ProvinceId:2,	CityId:1141,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1141-",	Name:"Oranjeville"},
                        {ProvinceId:2,	CityId:1142,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1142-",	Name:"Parys"},
                        {ProvinceId:2,	CityId:1143,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1143-",	Name:"Paul Roux"},
                        {ProvinceId:2,	CityId:1144,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1144-",	Name:"Petrusburg"},
                        {ProvinceId:2,	CityId:1145,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1145-",	Name:"Petrus Steyn"},
                        {ProvinceId:2,	CityId:1146,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1146-",	Name:"Philippolis"},
                        {ProvinceId:2,	CityId:1147,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1147-",	Name:"Phuthaditjhaba"},
                        {ProvinceId:2,	CityId:1148,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1148-",	Name:"Reddersburg"},
                        {ProvinceId:2,	CityId:1149,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1149-",	Name:"Reitz"},
                        {ProvinceId:2,	CityId:1150,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1150-",	Name:"Rosendal"},
                        {ProvinceId:2,	CityId:1151,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1151-",	Name:"Rouxville"},
                        {ProvinceId:2,	CityId:1152,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1152-",	Name:"Sasolburg"},
                        {ProvinceId:2,	CityId:1153,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1153-",	Name:"Senekal"},
                        {ProvinceId:2,	CityId:1154,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1154-",	Name:"Smithfield"},
                        {ProvinceId:2,	CityId:1155,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1155-",	Name:"Springfontein"},
                        {ProvinceId:2,	CityId:1156,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1156-",	Name:"Steynsrus"},
                        {ProvinceId:2,	CityId:1157,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1157-",	Name:"Swinburne"},
                        {ProvinceId:2,	CityId:1158,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1158-",	Name:"Thaba Nchu"},
                        {ProvinceId:2,	CityId:1159,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1159-",	Name:"Theunissen"},
                        {ProvinceId:2,	CityId:1160,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1160-",	Name:"Trompsburg"},
                        {ProvinceId:2,	CityId:1161,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1161-",	Name:"Tweeling"},
                        {ProvinceId:2,	CityId:1162,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1162-",	Name:"Tweespruit"},
                        {ProvinceId:2,	CityId:1163,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1163-",	Name:"Van Stadensrus"},
                        {ProvinceId:2,	CityId:1164,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1164-",	Name:"Ventersburg"},
                        {ProvinceId:2,	CityId:1165,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1165-",	Name:"Verkeerdevlei"},
                        {ProvinceId:2,	CityId:1166,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1166-",	Name:"Viljoenskroon"},
                        {ProvinceId:2,	CityId:1167,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1167-",	Name:"Villiers"},
                        {ProvinceId:2,	CityId:1168,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1168-",	Name:"Vrede"},
                        {ProvinceId:2,	CityId:1169,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1169-",	Name:"Vredefort"},
                        {ProvinceId:2,	CityId:1170,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1170-",	Name:"Warden"},
                        {ProvinceId:2,	CityId:1171,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1171-",	Name:"Welkom"},
                        {ProvinceId:2,	CityId:1172,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1172-",	Name:"Wepener"},
                        {ProvinceId:2,	CityId:1173,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1173-",	Name:"Wesselsbron"},
                        {ProvinceId:2,	CityId:1174,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1174-",	Name:"Winburg"},
                        {ProvinceId:2,	CityId:1175,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-1175-",	Name:"Zastron"},
                        {ProvinceId:2,	CityId:2002,	TreeKeyP:"202-002-",	TreeKeyC:"202-002-2002-",	Name:"Other" },
                    ]
                },{
                    Name: "Gauteng",
                    Id: 3,
                    List:[
                        {ProvinceId:3,	CityId:1176,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1176-",	Name:"Akasia"	},
                        {ProvinceId:3,	CityId:1177,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1177-",	Name:"Alberton"	},
                        {ProvinceId:3,	CityId:1178,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1178-",	Name:"Alexandra"	},
                        {ProvinceId:3,	CityId:1179,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1179-",	Name:"Atteridgeville"	},
                        {ProvinceId:3,	CityId:1180,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1180-",	Name:"Bank, Gauteng"	},
                        {ProvinceId:3,	CityId:1181,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1181-",	Name:"Bapsfontein"	},
                        {ProvinceId:3,	CityId:1182,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1182-",	Name:"Benoni"	},
                        {ProvinceId:3,	CityId:1183,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1183-",	Name:"Boipatong"	},
                        {ProvinceId:3,	CityId:1184,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1184-",	Name:"Boksburg"	},
                        {ProvinceId:3,	CityId:1185,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1185-",	Name:"Bophelong"	},
                        {ProvinceId:3,	CityId:1186,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1186-",	Name:"Brakpan"	},
                        {ProvinceId:3,	CityId:1187,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1187-",	Name:"Bronkhorstspruit"	},
                        {ProvinceId:3,	CityId:1188,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1188-",	Name:"Carletonville"	},
                        {ProvinceId:3,	CityId:1189,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1189-",	Name:"Centurion"	},
                        {ProvinceId:3,	CityId:1190,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1190-",	Name:"Chantelle"	},
                        {ProvinceId:3,	CityId:1191,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1191-",	Name:"Cullinan"	},
                        {ProvinceId:3,	CityId:1192,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1192-",	Name:"Daveyton"	},
                        {ProvinceId:3,	CityId:1193,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1193-",	Name:"Devon"	},
                        {ProvinceId:3,	CityId:1194,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1194-",	Name:"Duduza"	},
                        {ProvinceId:3,	CityId:1195,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1195-",	Name:"Edenvale"	},
                        {ProvinceId:3,	CityId:1196,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1196-",	Name:"Evaton"	},
                        {ProvinceId:3,	CityId:1197,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1197-",	Name:"Fochville"	},
                        {ProvinceId:3,	CityId:1198,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1198-",	Name:"Germiston"	},
                        {ProvinceId:3,	CityId:1199,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1199-",	Name:"Hammanskraal"	},
                        {ProvinceId:3,	CityId:1200,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1200-",	Name:"Heidelberg"	},
                        {ProvinceId:3,	CityId:1201,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1201-",	Name:"Henley on Klip"	},
                        {ProvinceId:3,	CityId:1202,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1202-",	Name:"Irene"	},
                        {ProvinceId:3,	CityId:1203,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1203-",	Name:"Isando"	},
                        {ProvinceId:3,	CityId:1204,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1204-",	Name:"Johannesburg"	},
                        {ProvinceId:3,	CityId:1205,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1205-",	Name:"Katlehong"	},
                        {ProvinceId:3,	CityId:1206,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1206-",	Name:"Kempton Park"	},
                        {ProvinceId:3,	CityId:1207,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1207-",	Name:"Kromdraai"	},
                        {ProvinceId:3,	CityId:1208,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1208-",	Name:"Krugersdorp"	},
                        {ProvinceId:3,	CityId:1209,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1209-",	Name:"KwaThema"	},
                        {ProvinceId:3,	CityId:1210,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1210-",	Name:"Lenasia"	},
                        {ProvinceId:3,	CityId:1211,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1211-",	Name:"Lyttelton"	},
                        {ProvinceId:3,	CityId:1212,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1212-",	Name:"Magaliesburg"	},
                        {ProvinceId:3,	CityId:1213,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1213-",	Name:"Mamelodi"	},
                        {ProvinceId:3,	CityId:1214,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1214-",	Name:"Meyerton"	},
                        {ProvinceId:3,	CityId:1215,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1215-",	Name:"Midrand"	},
                        {ProvinceId:3,	CityId:1216,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1216-",	Name:"Muldersdrift"	},
                        {ProvinceId:3,	CityId:1217,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1217-",	Name:"Nigel"	},
                        {ProvinceId:3,	CityId:1218,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1218-",	Name:"Orchards"	},
                        {ProvinceId:3,	CityId:1219,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1219-",	Name:"Pretoria"	},
                        {ProvinceId:3,	CityId:1220,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1220-",	Name:"Randburg"	},
                        {ProvinceId:3,	CityId:1221,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1221-",	Name:"Randfontein"	},
                        {ProvinceId:3,	CityId:1222,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1222-",	Name:"Ratanda"	},
                        {ProvinceId:3,	CityId:1223,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1223-",	Name:"Roodepoort"	},
                        {ProvinceId:3,	CityId:1224,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1224-",	Name:"Rooihuiskraal"	},
                        {ProvinceId:3,	CityId:1225,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1225-",	Name:"Sandton"	},
                        {ProvinceId:3,	CityId:1226,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1226-",	Name:"Sebokeng"	},
                        {ProvinceId:3,	CityId:1227,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1227-",	Name:"Sharpeville"	},
                        {ProvinceId:3,	CityId:1228,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1228-",	Name:"Soshanguve"	},
                        {ProvinceId:3,	CityId:1229,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1229-",	Name:"Soweto"	},
                        {ProvinceId:3,	CityId:1230,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1230-",	Name:"Springs"	},
                        {ProvinceId:3,	CityId:1231,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1231-",	Name:"Tembisa"	},
                        {ProvinceId:3,	CityId:1232,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1232-",	Name:"Thokoza"	},
                        {ProvinceId:3,	CityId:1233,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1233-",	Name:"Tsakane"	},
                        {ProvinceId:3,	CityId:1234,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1234-",	Name:"Vanderbijlpark"	},
                        {ProvinceId:3,	CityId:1235,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1235-",	Name:"Vereeniging"	},
                        {ProvinceId:3,	CityId:1236,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1236-",	Name:"Vosloorus"	},
                        {ProvinceId:3,	CityId:1237,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1237-",	Name:"Westonaria"	},
                        {ProvinceId:3,	CityId:1238,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-1238-",	Name:"Wedela"	},
                        {ProvinceId:3,	CityId:2003,	TreeKeyP:"202-003-",	TreeKeyC:"202-003-2003-",	Name:"Other" },
                    ]
                },{
                    Name: "KwaZulu-Natal",
                    Id: 4,
                    List:[
                        {ProvinceId:4,	CityId:1239,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1239-",	Name:"Ahrens"},
                        {ProvinceId:4,	CityId:1240,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1240-",	Name:"Aldinville"},
                        {ProvinceId:4,	CityId:1241,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1241-",	Name:"Alpha"},
                        {ProvinceId:4,	CityId:1242,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1242-",	Name:"Amanzimtoti"},
                        {ProvinceId:4,	CityId:1243,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1243-",	Name:"Anerley"},
                        {ProvinceId:4,	CityId:1244,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1244-",	Name:"Babanango"},
                        {ProvinceId:4,	CityId:1245,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1245-",	Name:"Balgowan"},
                        {ProvinceId:4,	CityId:1246,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1246-",	Name:"Ballengeich"},
                        {ProvinceId:4,	CityId:1247,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1247-",	Name:"Ballito"},
                        {ProvinceId:4,	CityId:1248,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1248-",	Name:"Banana Beach"},
                        {ProvinceId:4,	CityId:1249,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1249-",	Name:"Bazley"},
                        {ProvinceId:4,	CityId:1250,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1250-",	Name:"Bergville"},
                        {ProvinceId:4,	CityId:1251,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1251-",	Name:"Besters"},
                        {ProvinceId:4,	CityId:1252,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1252-",	Name:"Biggarsberg"},
                        {ProvinceId:4,	CityId:1253,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1253-",	Name:"Boston"},
                        {ProvinceId:4,	CityId:1254,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1254-",	Name:"Bulwer"},
                        {ProvinceId:4,	CityId:1255,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1255-",	Name:"Calvert"},
                        {ProvinceId:4,	CityId:1256,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1256-",	Name:"Camperdown"},
                        {ProvinceId:4,	CityId:1257,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1257-",	Name:"Candover"},
                        {ProvinceId:4,	CityId:1258,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1258-",	Name:"Cape Vidal"},
                        {ProvinceId:4,	CityId:1259,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1259-",	Name:"Catalina Bay"},
                        {ProvinceId:4,	CityId:1260,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1260-",	Name:"Cato Ridge"},
                        {ProvinceId:4,	CityId:1261,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1261-",	Name:"Cedarville"},
                        {ProvinceId:4,	CityId:1262,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1262-",	Name:"Charlestown"},
                        {ProvinceId:4,	CityId:1263,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1263-",	Name:"Clansthal"},
                        {ProvinceId:4,	CityId:1264,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1264-",	Name:"Clermont"},
                        {ProvinceId:4,	CityId:1265,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1265-",	Name:"Colenso"},
                        {ProvinceId:4,	CityId:1266,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1266-",	Name:"Dalton"},
                        {ProvinceId:4,	CityId:1267,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1267-",	Name:"Dannhauser"},
                        {ProvinceId:4,	CityId:1268,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1268-",	Name:"Darnall"},
                        {ProvinceId:4,	CityId:1269,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1269-",	Name:"Doonside"},
                        {ProvinceId:4,	CityId:1270,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1270-",	Name:"Drummond"},
                        {ProvinceId:4,	CityId:1271,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1271-",	Name:"Dundee"},
                        {ProvinceId:4,	CityId:1272,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1272-",	Name:"Durban"},
                        {ProvinceId:4,	CityId:1273,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1273-",	Name:"ekuPhakameni"},
                        {ProvinceId:4,	CityId:1274,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1274-",	Name:"Elandslaagte"},
                        {ProvinceId:4,	CityId:1275,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1275-",	Name:"Empangeni"},
                        {ProvinceId:4,	CityId:1276,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1276-",	Name:"Eshowe"},
                        {ProvinceId:4,	CityId:1277,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1277-",	Name:"Estcourt"},
                        {ProvinceId:4,	CityId:1278,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1278-",	Name:"Franklin"},
                        {ProvinceId:4,	CityId:1279,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1279-",	Name:"Glencoe"},
                        {ProvinceId:4,	CityId:1280,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1280-",	Name:"Greytown"},
                        {ProvinceId:4,	CityId:1281,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1281-",	Name:"Hattingspruit"},
                        {ProvinceId:4,	CityId:1282,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1282-",	Name:"Hibberdene"},
                        {ProvinceId:4,	CityId:1283,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1283-",	Name:"Hillcrest"},
                        {ProvinceId:4,	CityId:1284,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1284-",	Name:"Hilton"},
                        {ProvinceId:4,	CityId:1285,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1285-",	Name:"Himeville"},
                        {ProvinceId:4,	CityId:1286,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1286-",	Name:"Hluhluwe"},
                        {ProvinceId:4,	CityId:1287,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1287-",	Name:"Howick"},
                        {ProvinceId:4,	CityId:1288,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1288-",	Name:"Ifafa Beach"},
                        {ProvinceId:4,	CityId:1289,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1289-",	Name:"Illovo Beach"},
                        {ProvinceId:4,	CityId:1290,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1290-",	Name:"Impendle"},
                        {ProvinceId:4,	CityId:1291,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1291-",	Name:"Inanda"},
                        {ProvinceId:4,	CityId:1292,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1292-",	Name:"Ingwavuma"},
                        {ProvinceId:4,	CityId:1293,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1293-",	Name:"Isipingo"},
                        {ProvinceId:4,	CityId:1294,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1294-",	Name:"Ixopo"},
                        {ProvinceId:4,	CityId:1295,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1295-",	Name:"Karridene"},
                        {ProvinceId:4,	CityId:1296,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1296-",	Name:"Kingsburgh"},
                        {ProvinceId:4,	CityId:1297,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1297-",	Name:"Kloof"},
                        {ProvinceId:4,	CityId:1298,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1298-",	Name:"Kokstad"},
                        {ProvinceId:4,	CityId:1299,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1299-",	Name:"KwaDukuza"},
                        {ProvinceId:4,	CityId:1300,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1300-",	Name:"KwaMashu"},
                        {ProvinceId:4,	CityId:1301,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1301-",	Name:"Ladysmith"},
                        {ProvinceId:4,	CityId:1302,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1302-",	Name:"La Lucia"},
                        {ProvinceId:4,	CityId:1303,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1303-",	Name:"La Mercy"},
                        {ProvinceId:4,	CityId:1304,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1304-",	Name:"Louwsburg"},
                        {ProvinceId:4,	CityId:1305,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1305-",	Name:"Magabeni"},
                        {ProvinceId:4,	CityId:1306,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1306-",	Name:"Mahlabatini"},
                        {ProvinceId:4,	CityId:1307,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1307-",	Name:"Margate"},
                        {ProvinceId:4,	CityId:1308,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1308-",	Name:"Melmoth"},
                        {ProvinceId:4,	CityId:1309,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1309-",	Name:"Merrivale"},
                        {ProvinceId:4,	CityId:1310,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1310-",	Name:"Mkuze"},
                        {ProvinceId:4,	CityId:1311,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1311-",	Name:"Mooirivier"},
                        {ProvinceId:4,	CityId:1312,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1312-",	Name:"Mount Edgecombe"},
                        {ProvinceId:4,	CityId:1313,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1313-",	Name:"Mtubatuba"},
                        {ProvinceId:4,	CityId:1314,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1314-",	Name:"Mtunzini"},
                        {ProvinceId:4,	CityId:1315,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1315-",	Name:"Muden"},
                        {ProvinceId:4,	CityId:1316,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1316-",	Name:"Newcastle"},
                        {ProvinceId:4,	CityId:1317,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1317-",	Name:"New Germany"},
                        {ProvinceId:4,	CityId:1318,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1318-",	Name:"New Hanover"},
                        {ProvinceId:4,	CityId:1319,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1319-",	Name:"Nongoma"},
                        {ProvinceId:4,	CityId:1320,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1320-",	Name:"Nottingham Road"},
                        {ProvinceId:4,	CityId:1321,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1321-",	Name:"Palm Beach"},
                        {ProvinceId:4,	CityId:1322,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1322-",	Name:"Park Rynie"},
                        {ProvinceId:4,	CityId:1323,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1323-",	Name:"Paulpietersburg"},
                        {ProvinceId:4,	CityId:1324,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1324-",	Name:"Pennington"},
                        {ProvinceId:4,	CityId:1325,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1325-",	Name:"Pietermaritzburg"},
                        {ProvinceId:4,	CityId:1326,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1326-",	Name:"Pinetown"},
                        {ProvinceId:4,	CityId:1327,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1327-",	Name:"Pomeroy"},
                        {ProvinceId:4,	CityId:1328,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1328-",	Name:"Pongola"},
                        {ProvinceId:4,	CityId:1329,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1329-",	Name:"Port Edward"},
                        {ProvinceId:4,	CityId:1330,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1330-",	Name:"Port Shepstone"},
                        {ProvinceId:4,	CityId:1331,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1331-",	Name:"Queensburgh"},
                        {ProvinceId:4,	CityId:1332,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1332-",	Name:"Ramsgate"},
                        {ProvinceId:4,	CityId:1333,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1333-",	Name:"Richards Bay"},
                        {ProvinceId:4,	CityId:1334,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1334-",	Name:"Salt Rock"},
                        {ProvinceId:4,	CityId:1335,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1335-",	Name:"Scottburgh"},
                        {ProvinceId:4,	CityId:1336,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1336-",	Name:"Sezela"},
                        {ProvinceId:4,	CityId:1337,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1337-",	Name:"Shelly Beach"},
                        {ProvinceId:4,	CityId:1338,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1338-",	Name:"Southbroom"},
                        {ProvinceId:4,	CityId:1339,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1339-",	Name:"St Lucia"},
                        {ProvinceId:4,	CityId:1340,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1340-",	Name:"St Michael's-on-sea"},
                        {ProvinceId:4,	CityId:1341,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1341-",	Name:"Tongaat"},
                        {ProvinceId:4,	CityId:1342,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1342-",	Name:"Tugela Ferry"},
                        {ProvinceId:4,	CityId:1343,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1343-",	Name:"Ubombo"},
                        {ProvinceId:4,	CityId:1344,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1344-",	Name:"Ulundi"},
                        {ProvinceId:4,	CityId:1345,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1345-",	Name:"Umbongintwini"},
                        {ProvinceId:4,	CityId:1346,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1346-",	Name:"Umdloti"},
                        {ProvinceId:4,	CityId:1347,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1347-",	Name:"Umgababa"},
                        {ProvinceId:4,	CityId:1348,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1348-",	Name:"Umhlanga Rocks"},
                        {ProvinceId:4,	CityId:1349,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1349-",	Name:"uMkhomazi"},
                        {ProvinceId:4,	CityId:1350,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1350-",	Name:"Umlazi"},
                        {ProvinceId:4,	CityId:1351,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1351-",	Name:"Umtentweni"},
                        {ProvinceId:4,	CityId:1352,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1352-",	Name:"Umzinto"},
                        {ProvinceId:4,	CityId:1353,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1353-",	Name:"Umzumbe"},
                        {ProvinceId:4,	CityId:1354,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1354-",	Name:"Underberg"},
                        {ProvinceId:4,	CityId:1355,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1355-",	Name:"Utrecht"},
                        {ProvinceId:4,	CityId:1356,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1356-",	Name:"Uvongo"},
                        {ProvinceId:4,	CityId:1357,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1357-",	Name:"Van Reenen"},
                        {ProvinceId:4,	CityId:1358,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1358-",	Name:"Verulam"},
                        {ProvinceId:4,	CityId:1359,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1359-",	Name:"Virginia"},
                        {ProvinceId:4,	CityId:1360,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1360-",	Name:"Vryheid"},
                        {ProvinceId:4,	CityId:1361,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1361-",	Name:"Warner Beach"},
                        {ProvinceId:4,	CityId:1362,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1362-",	Name:"Wartburg"},
                        {ProvinceId:4,	CityId:1363,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1363-",	Name:"Wasbank"},
                        {ProvinceId:4,	CityId:1364,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1364-",	Name:"Weenen"},
                        {ProvinceId:4,	CityId:1365,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1365-",	Name:"Westville"},
                        {ProvinceId:4,	CityId:1366,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1366-",	Name:"Winkelspruit"},
                        {ProvinceId:4,	CityId:1367,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1367-",	Name:"Winterton"},
                        {ProvinceId:4,	CityId:1368,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-1368-",	Name:"York"},
                        {ProvinceId:4,	CityId:2004,	TreeKeyP:"202-004-",	TreeKeyC:"202-004-2004-",	Name:"Other" },
                    ]
                },{
                    Name: "Limpopo",
                    Id: 5,
                    List:[
                        {ProvinceId:5,	CityId:1369,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1369-",	Name:"Afguns"},
                        {ProvinceId:5,	CityId:1370,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1370-",	Name:"Alldays"},
                        {ProvinceId:5,	CityId:1371,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1371-",	Name:"Baltimore"},
                        {ProvinceId:5,	CityId:1372,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1372-",	Name:"Bandelierkop"},
                        {ProvinceId:5,	CityId:1373,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1373-",	Name:"Bandur"},
                        {ProvinceId:5,	CityId:1374,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1374-",	Name:"Beauty"},
                        {ProvinceId:5,	CityId:1375,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1375-",	Name:"Beitbridge"},
                        {ProvinceId:5,	CityId:1376,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1376-",	Name:"Bela-Bela"},
                        {ProvinceId:5,	CityId:1377,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1377-",	Name:"Burgersfort"},
                        {ProvinceId:5,	CityId:1378,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1378-",	Name:"Carlow"},
                        {ProvinceId:5,	CityId:1379,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1379-",	Name:"Chuniespoort"},
                        {ProvinceId:5,	CityId:1380,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1380-",	Name:"Duiwelskloof"},
                        {ProvinceId:5,	CityId:1381,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1381-",	Name:"Giyani"},
                        {ProvinceId:5,	CityId:1382,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1382-",	Name:"Gravelotte, "},
                        {ProvinceId:5,	CityId:1383,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1383-",	Name:"Groblersdal"},
                        {ProvinceId:5,	CityId:1384,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1384-",	Name:"Haenertsburg"},
                        {ProvinceId:5,	CityId:1385,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1385-",	Name:"Hoedspruit"},
                        {ProvinceId:5,	CityId:1386,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1386-",	Name:"Lephalale"},
                        {ProvinceId:5,	CityId:1387,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1387-",	Name:"Louis Trichardt"},
                        {ProvinceId:5,	CityId:1388,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1388-",	Name:"Marble Hall"},
                        {ProvinceId:5,	CityId:1389,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1389-",	Name:"Modimolle"},
                        {ProvinceId:5,	CityId:1390,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1390-",	Name:"Mokopane"},
                        {ProvinceId:5,	CityId:1391,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1391-",	Name:"Musina"},
                        {ProvinceId:5,	CityId:1392,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1392-",	Name:"Naboomspruit"},
                        {ProvinceId:5,	CityId:1393,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1393-",	Name:"Phalaborwa"},
                        {ProvinceId:5,	CityId:1394,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1394-",	Name:"Polokwane"},
                        {ProvinceId:5,	CityId:1395,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1395-",	Name:"Shawela"},
                        {ProvinceId:5,	CityId:1396,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1396-",	Name:"Thabazimbi"},
                        {ProvinceId:5,	CityId:1397,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1397-",	Name:"Thohoyandou"},
                        {ProvinceId:5,	CityId:1398,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1398-",	Name:"Vaalwater"},
                        {ProvinceId:5,	CityId:1399,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-1399-",	Name:"Vivo"},
                        {ProvinceId:5,	CityId:2005,	TreeKeyP:"202-005-",	TreeKeyC:"202-005-2005-",	Name:"Other" },
                    ]
                },{
                    Name: "Mpumalanga",
                    Id: 6,
                    List:[
                        {ProvinceId:6,	CityId:1400,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1400-",	Name:"Acornhoek"},
                        {ProvinceId:6,	CityId:1401,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1401-",	Name:"Amersfoort"},
                        {ProvinceId:6,	CityId:1402,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1402-",	Name:"Amsterdam"},
                        {ProvinceId:6,	CityId:1403,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1403-",	Name:"Badplaas"},
                        {ProvinceId:6,	CityId:1404,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1404-",	Name:"Balfour"},
                        {ProvinceId:6,	CityId:1405,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1405-",	Name:"Balmoral"},
                        {ProvinceId:6,	CityId:1406,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1406-",	Name:"Bankkop"},
                        {ProvinceId:6,	CityId:1407,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1407-",	Name:"Barberton"},
                        {ProvinceId:6,	CityId:1408,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1408-",	Name:"Belfast"},
                        {ProvinceId:6,	CityId:1409,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1409-",	Name:"Berbice"},
                        {ProvinceId:6,	CityId:1410,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1410-",	Name:"Bethal"},
                        {ProvinceId:6,	CityId:1411,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1411-",	Name:"Bettiesdam"},
                        {ProvinceId:6,	CityId:1412,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1412-",	Name:"Bosbokrand"},
                        {ProvinceId:6,	CityId:1413,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1413-",	Name:"Breyten"},
                        {ProvinceId:6,	CityId:1414,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1414-",	Name:"Carolina"},
                        {ProvinceId:6,	CityId:1415,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1415-",	Name:"Charl Cilliers"},
                        {ProvinceId:6,	CityId:1416,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1416-",	Name:"Chrissiesmeer"},
                        {ProvinceId:6,	CityId:1417,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1417-",	Name:"Clewer"},
                        {ProvinceId:6,	CityId:1418,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1418-",	Name:"Coalville"},
                        {ProvinceId:6,	CityId:1419,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1419-",	Name:"Commondale"},
                        {ProvinceId:6,	CityId:1420,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1420-",	Name:"Cork"},
                        {ProvinceId:6,	CityId:1421,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1421-",	Name:"Delmas"},
                        {ProvinceId:6,	CityId:1422,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1422-",	Name:"Dullstroom"},
                        {ProvinceId:6,	CityId:1423,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1423-",	Name:"Ermelo"},
                        {ProvinceId:6,	CityId:1424,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1424-",	Name:"Graskop"},
                        {ProvinceId:6,	CityId:1425,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1425-",	Name:"Greylingstad"},
                        {ProvinceId:6,	CityId:1426,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1426-",	Name:"Hazyview"},
                        {ProvinceId:6,	CityId:1427,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1427-",	Name:"Hectorspruit"},
                        {ProvinceId:6,	CityId:1428,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1428-",	Name:"Kaapmuiden"},
                        {ProvinceId:6,	CityId:1429,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1429-",	Name:"Kinross"},
                        {ProvinceId:6,	CityId:1430,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1430-",	Name:"Komatipoort"},
                        {ProvinceId:6,	CityId:1431,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1431-",	Name:"Kriel"},
                        {ProvinceId:6,	CityId:1432,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1432-",	Name:"KwaMhlanga"},
                        {ProvinceId:6,	CityId:1433,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1433-",	Name:"Loopspruit"},
                        {ProvinceId:6,	CityId:1434,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1434-",	Name:"Lydenburg"},
                        {ProvinceId:6,	CityId:1435,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1435-",	Name:"Machadodorp"},
                        {ProvinceId:6,	CityId:1436,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1436-",	Name:"Malelane"},
                        {ProvinceId:6,	CityId:1437,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1437-",	Name:"Mbombela"},
                        {ProvinceId:6,	CityId:1438,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1438-",	Name:"Middelburg"},
                        {ProvinceId:6,	CityId:1439,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1439-",	Name:"Morgenzon"},
                        {ProvinceId:6,	CityId:1440,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1440-",	Name:"Ogies"},
                        {ProvinceId:6,	CityId:1441,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1441-",	Name:"Ohrigstad"},
                        {ProvinceId:6,	CityId:1442,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1442-",	Name:"Perdekop"},
                        {ProvinceId:6,	CityId:1443,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1443-",	Name:"Piet Retief"},
                        {ProvinceId:6,	CityId:1444,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1444-",	Name:"Pilgrim's Rest"},
                        {ProvinceId:6,	CityId:1445,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1445-",	Name:"Sabie"},
                        {ProvinceId:6,	CityId:1446,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1446-",	Name:"Secunda"},
                        {ProvinceId:6,	CityId:1447,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1447-",	Name:"Standerton"},
                        {ProvinceId:6,	CityId:1448,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1448-",	Name:"Trichardt"},
                        {ProvinceId:6,	CityId:1449,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1449-",	Name:"Vaalbank"},
                        {ProvinceId:6,	CityId:1450,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1450-",	Name:"Volksrust"},
                        {ProvinceId:6,	CityId:1451,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1451-",	Name:"Wakkerstroom"},
                        {ProvinceId:6,	CityId:1452,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1452-",	Name:"Waterval Boven"},
                        {ProvinceId:6,	CityId:1453,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1453-",	Name:"Waterval Onder"},
                        {ProvinceId:6,	CityId:1454,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1454-",	Name:"White River"},
                        {ProvinceId:6,	CityId:1455,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-1455-",	Name:"Witbank"},
                        {ProvinceId:6,	CityId:2006,	TreeKeyP:"202-006-",	TreeKeyC:"202-006-2006-",	Name:"Other" },
                    ]
                },{
                    Name: "North West",
                    Id: 7,
                    List:[
                        {ProvinceId:7,	CityId:1456,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1456-",	Name:"Albertshoek"},
                        {ProvinceId:7,	CityId:1457,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1457-",	Name:"Alettasrus"},
                        {ProvinceId:7,	CityId:1458,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1458-",	Name:"Amalia"},
                        {ProvinceId:7,	CityId:1459,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1459-",	Name:"Babelegi"},
                        {ProvinceId:7,	CityId:1460,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1460-",	Name:"Bakerville"},
                        {ProvinceId:7,	CityId:1461,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1461-",	Name:"Barberspan"},
                        {ProvinceId:7,	CityId:1462,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1462-",	Name:"Beestekraal"},
                        {ProvinceId:7,	CityId:1463,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1463-",	Name:"Bethanie"},
                        {ProvinceId:7,	CityId:1464,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1464-",	Name:"Bewley"},
                        {ProvinceId:7,	CityId:1465,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1465-",	Name:"Biesiesvlei"},
                        {ProvinceId:7,	CityId:1466,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1466-",	Name:"Bloemhof"},
                        {ProvinceId:7,	CityId:1467,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1467-",	Name:"Bray"},
                        {ProvinceId:7,	CityId:1468,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1468-",	Name:"Brits"},
                        {ProvinceId:7,	CityId:1469,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1469-",	Name:"Broederstroom"},
                        {ProvinceId:7,	CityId:1470,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1470-",	Name:"Carlsonia"},
                        {ProvinceId:7,	CityId:1471,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1471-",	Name:"Christiana"},
                        {ProvinceId:7,	CityId:1472,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1472-",	Name:"Coligny"},
                        {ProvinceId:7,	CityId:1473,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1473-",	Name:"Delareyville"},
                        {ProvinceId:7,	CityId:1474,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1474-",	Name:"Derby"},
                        {ProvinceId:7,	CityId:1475,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1475-",	Name:"Ganyesa"},
                        {ProvinceId:7,	CityId:1476,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1476-",	Name:"Ga-Rankuwa"},
                        {ProvinceId:7,	CityId:1477,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1477-",	Name:"Groot Marico"},
                        {ProvinceId:7,	CityId:1478,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1478-",	Name:"Lichtenburg"},
                        {ProvinceId:7,	CityId:1479,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1479-",	Name:"Mafikeng"},
                        {ProvinceId:7,	CityId:1480,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1480-",	Name:"Orkney"},
                        {ProvinceId:7,	CityId:1481,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1481-",	Name:"Potchefstroom"},
                        {ProvinceId:7,	CityId:1482,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1482-",	Name:"Rustenburg"},
                        {ProvinceId:7,	CityId:1483,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1483-",	Name:"Sannieshof"},
                        {ProvinceId:7,	CityId:1484,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1484-",	Name:"Schweizer-Reneke"},
                        {ProvinceId:7,	CityId:1485,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1485-",	Name:"Stilfontein"},
                        {ProvinceId:7,	CityId:1486,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1486-",	Name:"Vryburg"},
                        {ProvinceId:7,	CityId:1487,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1487-",	Name:"Wolmaransstad"},
                        {ProvinceId:7,	CityId:1488,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1488-",	Name:"Zeerust"},
                        {ProvinceId:7,	CityId:1489,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1489-",	Name:"Hartbeespoort"},
                        {ProvinceId:7,	CityId:1490,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1490-",	Name:"Klerksdorp"},
                        {ProvinceId:7,	CityId:1491,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-1491-",	Name:"Mmabatho"},
                        {ProvinceId:7,	CityId:2007,	TreeKeyP:"202-007-",	TreeKeyC:"202-007-2007-",	Name:"Other" },
                    ]
                },{
                    Name: "Northern Cape",
                    Id: 8,
                    List:[
                        {ProvinceId:8,	CityId:1492,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1492-",	Name:"Aalwynsfontein"},
                        {ProvinceId:8,	CityId:1493,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1493-",	Name:"Aggeneys"},
                        {ProvinceId:8,	CityId:1494,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1494-",	Name:"Alexander Bay"},
                        {ProvinceId:8,	CityId:1495,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1495-",	Name:"Andriesvale"},
                        {ProvinceId:8,	CityId:1496,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1496-",	Name:"Askham"},
                        {ProvinceId:8,	CityId:1497,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1497-",	Name:"Augrabies"},
                        {ProvinceId:8,	CityId:1498,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1498-",	Name:"Barkly West"},
                        {ProvinceId:8,	CityId:1499,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1499-",	Name:"Bekker"},
                        {ProvinceId:8,	CityId:1500,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1500-",	Name:"Belmont"},
                        {ProvinceId:8,	CityId:1501,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1501-",	Name:"Bermolli"},
                        {ProvinceId:8,	CityId:1502,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1502-",	Name:"Biesiespoort"},
                        {ProvinceId:8,	CityId:1503,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1503-",	Name:"Britstown"},
                        {ProvinceId:8,	CityId:1504,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1504-",	Name:"Calvinia"},
                        {ProvinceId:8,	CityId:1505,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1505-",	Name:"Campbell"},
                        {ProvinceId:8,	CityId:1506,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1506-",	Name:"Carlton"},
                        {ProvinceId:8,	CityId:1507,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1507-",	Name:"Carnarvon"},
                        {ProvinceId:8,	CityId:1508,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1508-",	Name:"Carolusberg"},
                        {ProvinceId:8,	CityId:1509,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1509-",	Name:"Concordia"},
                        {ProvinceId:8,	CityId:1510,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1510-",	Name:"Colesberg"},
                        {ProvinceId:8,	CityId:1511,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1511-",	Name:"Colston"},
                        {ProvinceId:8,	CityId:1512,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1512-",	Name:"Copperton"},
                        {ProvinceId:8,	CityId:1513,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1513-",	Name:"Danielskuil"},
                        {ProvinceId:8,	CityId:1514,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1514-",	Name:"De Aar"},
                        {ProvinceId:8,	CityId:1515,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1515-",	Name:"Delportshoop"},
                        {ProvinceId:8,	CityId:1516,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1516-",	Name:"Dibeng"},
                        {ProvinceId:8,	CityId:1517,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1517-",	Name:"Dingleton"},
                        {ProvinceId:8,	CityId:1518,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1518-",	Name:"Douglas"},
                        {ProvinceId:8,	CityId:1519,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1519-",	Name:"Fraserburg"},
                        {ProvinceId:8,	CityId:1520,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1520-",	Name:"Griekwastad"},
                        {ProvinceId:8,	CityId:1521,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1521-",	Name:"Groblershoop"},
                        {ProvinceId:8,	CityId:1522,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1522-",	Name:"Hopetown"},
                        {ProvinceId:8,	CityId:1523,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1523-",	Name:"Jan Kempdorp"},
                        {ProvinceId:8,	CityId:1524,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1524-",	Name:"Kimberley"},
                        {ProvinceId:8,	CityId:1525,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1525-",	Name:"Modder River"},
                        {ProvinceId:8,	CityId:1526,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1526-",	Name:"Orania, "},
                        {ProvinceId:8,	CityId:1527,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1527-",	Name:"Prieska"},
                        {ProvinceId:8,	CityId:1528,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1528-",	Name:"Richmond"},
                        {ProvinceId:8,	CityId:1529,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1529-",	Name:"Springbok"},
                        {ProvinceId:8,	CityId:1530,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1530-",	Name:"Strydenburg"},
                        {ProvinceId:8,	CityId:1531,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1531-",	Name:"Upington"},
                        {ProvinceId:8,	CityId:1532,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1532-",	Name:"Victoria West"},
                        {ProvinceId:8,	CityId:1533,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1533-",	Name:"Warrenton"},
                        {ProvinceId:8,	CityId:1534,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-1534-",	Name:"Williston"},
                        {ProvinceId:8,	CityId:2008,	TreeKeyP:"202-008-",	TreeKeyC:"202-008-2008-",	Name:"Other" },
                    ]
                },{
                    Name: "Western Cape",
                    Id: 9,
                    List:[
                        {ProvinceId:9,	CityId:1535,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1535-", Name:"Aan de Doorns"},
                        {ProvinceId:9,	CityId:1536,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1536-", Name:"Abbotsdale"},
                        {ProvinceId:9,	CityId:1537,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1537-", Name:"L'Agulhas or Agulhas"},
                        {ProvinceId:9,	CityId:1538,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1538-", Name:"Albertinia"},
                        {ProvinceId:9,	CityId:1539,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1539-", Name:"Amalienstein"},
                        {ProvinceId:9,	CityId:1540,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1540-", Name:"Arniston"},
                        {ProvinceId:9,	CityId:1541,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1541-", Name:"Ashton"},
                        {ProvinceId:9,	CityId:1542,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1542-", Name:"Atlantis"},
                        {ProvinceId:9,	CityId:1543,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1543-", Name:"Aurora"},
                        {ProvinceId:9,	CityId:1544,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1544-", Name:"Baardskeerdersbos"},
                        {ProvinceId:9,	CityId:1545,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1545-", Name:"Barrington"},
                        {ProvinceId:9,	CityId:1546,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1546-", Name:"Barrydale"},
                        {ProvinceId:9,	CityId:1547,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1547-", Name:"Baviaan"},
                        {ProvinceId:9,	CityId:1548,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1548-", Name:"Beaufort West"},
                        {ProvinceId:9,	CityId:1549,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1549-", Name:"Bellville"},
                        {ProvinceId:9,	CityId:1550,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1550-", Name:"Berea"},
                        {ProvinceId:9,	CityId:1551,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1551-", Name:"Bergplaas"},
                        {ProvinceId:9,	CityId:1552,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1552-", Name:"Bergrivier"},
                        {ProvinceId:9,	CityId:1553,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1553-", Name:"Betty's Bay"},
                        {ProvinceId:9,	CityId:1554,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1554-", Name:"Biesiesfontein"},
                        {ProvinceId:9,	CityId:1555,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1555-", Name:"Bitterfontein"},
                        {ProvinceId:9,	CityId:1556,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1556-", Name:"Bonnievale"},
                        {ProvinceId:9,	CityId:1557,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1557-", Name:"Bredasdorp"},
                        {ProvinceId:9,	CityId:1558,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1558-", Name:"Buffelsjagbaai"},
                        {ProvinceId:9,	CityId:1559,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1559-", Name:"Caledon"},
                        {ProvinceId:9,	CityId:1560,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1560-", Name:"Calitzdorp"},
                        {ProvinceId:9,	CityId:1561,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1561-", Name:"Camps Bay"},
                        {ProvinceId:9,	CityId:1562,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1562-", Name:"Cape Town"},
                        {ProvinceId:9,	CityId:1563,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1563-", Name:"Ceres"},
                        {ProvinceId:9,	CityId:1564,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1564-", Name:"Churchaven"},
                        {ProvinceId:9,	CityId:1565,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1565-", Name:"Citrusdal"},
                        {ProvinceId:9,	CityId:1566,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1566-", Name:"Clanwilliam"},
                        {ProvinceId:9,	CityId:1567,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1567-", Name:"Claremont"},
                        {ProvinceId:9,	CityId:1568,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1568-", Name:"Clarkson"},
                        {ProvinceId:9,	CityId:1569,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1569-", Name:"Clifton"},
                        {ProvinceId:9,	CityId:1570,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1570-", Name:"Constantia"},
                        {ProvinceId:9,	CityId:1571,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1571-", Name:"Darling"},
                        {ProvinceId:9,	CityId:1572,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1572-", Name:"De Doorns"},
                        {ProvinceId:9,	CityId:1573,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1573-", Name:"De Kelders"},
                        {ProvinceId:9,	CityId:1574,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1574-", Name:"De Rust"},
                        {ProvinceId:9,	CityId:1575,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1575-", Name:"Doringbaai"},
                        {ProvinceId:9,	CityId:1576,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1576-", Name:"Dysselsdorp"},
                        {ProvinceId:9,	CityId:1577,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1577-", Name:"Eendekuil"},
                        {ProvinceId:9,	CityId:1578,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1578-", Name:"Elandsbaai"},
                        {ProvinceId:9,	CityId:1579,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1579-", Name:"Elim"},
                        {ProvinceId:9,	CityId:1580,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1580-", Name:"Elgin"},
                        {ProvinceId:9,	CityId:1581,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1581-", Name:"Fisherhaven"},
                        {ProvinceId:9,	CityId:1582,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1582-", Name:"Franskraal"},
                        {ProvinceId:9,	CityId:1583,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1583-", Name:"Franschhoek"},
                        {ProvinceId:9,	CityId:1584,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1584-", Name:"Gansbaai"},
                        {ProvinceId:9,	CityId:1585,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1585-", Name:"Genadendal"},
                        {ProvinceId:9,	CityId:1586,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1586-", Name:"George"},
                        {ProvinceId:9,	CityId:1587,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1587-", Name:"Gouda"},
                        {ProvinceId:9,	CityId:1588,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1588-", Name:"Graafwater"},
                        {ProvinceId:9,	CityId:1589,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1589-", Name:"Grabouw"},
                        {ProvinceId:9,	CityId:1590,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1590-", Name:"Greyton"},
                        {ProvinceId:9,	CityId:1591,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1591-", Name:"Heidelberg"},
                        {ProvinceId:9,	CityId:1592,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1592-", Name:"Hermanus"},
                        {ProvinceId:9,	CityId:1593,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1593-", Name:"Hopefield"},
                        {ProvinceId:9,	CityId:1594,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1594-", Name:"Keurboomstrand"},
                        {ProvinceId:9,	CityId:1595,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1595-", Name:"Khayelitsha"},
                        {ProvinceId:9,	CityId:1596,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1596-", Name:"Knysna"},
                        {ProvinceId:9,	CityId:1597,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1597-", Name:"Laingsburg"},
                        {ProvinceId:9,	CityId:1598,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1598-", Name:"Lambert's Bay"},
                        {ProvinceId:9,	CityId:1599,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1599-", Name:"Matjiesfontein"},
                        {ProvinceId:9,	CityId:1600,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1600-", Name:"Mossel Bay"},
                        {ProvinceId:9,	CityId:1601,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1601-", Name:"Oudtshoorn"},
                        {ProvinceId:9,	CityId:1602,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1602-", Name:"Paarl"},
                        {ProvinceId:9,	CityId:1603,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1603-", Name:"Piketberg"},
                        {ProvinceId:9,	CityId:1604,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1604-", Name:"Plettenberg Bay"},
                        {ProvinceId:9,	CityId:1605,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1605-", Name:"Pniel"},
                        {ProvinceId:9,	CityId:1606,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1606-", Name:"Prins Albert"},
                        {ProvinceId:9,	CityId:1607,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1607-", Name:"Riebeek Kasteel"},
                        {ProvinceId:9,	CityId:1608,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1608-", Name:"Robertson"},
                        {ProvinceId:9,	CityId:1609,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1609-", Name:"Somerset West"},
                        {ProvinceId:9,	CityId:1610,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1610-", Name:"Stellenbosch"},
                        {ProvinceId:9,	CityId:1611,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1611-", Name:"Strand"},
                        {ProvinceId:9,	CityId:1612,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1612-", Name:"Swartberg"},
                        {ProvinceId:9,	CityId:1613,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1613-", Name:"Swellendam"},
                        {ProvinceId:9,	CityId:1614,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1614-", Name:"Tulbagh"},
                        {ProvinceId:9,	CityId:1615,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1615-", Name:"Uniondale, "},
                        {ProvinceId:9,	CityId:1616,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1616-", Name:"Wellington"},
                        {ProvinceId:9,	CityId:1617,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1617-", Name:"Wilderness"},
                        {ProvinceId:9,	CityId:1618,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1618-", Name:"Worcester"},
                        {ProvinceId:9,	CityId:1619,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-1619-", Name:"Yzerfontein"},
                        {ProvinceId:9,	CityId:2009,	TreeKeyP:"202-009-",	TreeKeyC:"202-009-2009-",	Name:"Other" },
                    ]
                }
            ]
        },
        getCountrys: function () {
            return [
                {	CountryCode: 'ABW',	CountryPhoneCode: '+297',	Country: 'Aruba',	},
                {	CountryCode: 'AFG',	CountryPhoneCode: '+93',	Country: 'Afghanistan',	},
                {	CountryCode: 'AGO',	CountryPhoneCode: '+244',	Country: 'Angola',	},
                {	CountryCode: 'AIA',	CountryPhoneCode: '+1',	Country: 'Anguilla',	},
                {	CountryCode: 'ALB',	CountryPhoneCode: '+355',	Country: 'Albania',	},
                {	CountryCode: 'AND',	CountryPhoneCode: '+376',	Country: 'Andorra',	},
                {	CountryCode: 'ANT',	CountryPhoneCode: '+376',	Country: 'Netherlands Antilles',	},
                {	CountryCode: 'ARE',	CountryPhoneCode: '+971',	Country: 'United Arab Emirates',	},
                {	CountryCode: 'ARG',	CountryPhoneCode: '+54',	Country: 'Argentina',	},
                {	CountryCode: 'ARM',	CountryPhoneCode: '+374',	Country: 'Armenia',	},
                {	CountryCode: 'ASM',	CountryPhoneCode: '+1',	Country: 'American Samoa',	},
                {	CountryCode: 'ATA',	CountryPhoneCode: '+1',	Country: 'Antarctica',	},
                {	CountryCode: 'ATF',	CountryPhoneCode: '+1',	Country: 'French Southern territories',	},
                {	CountryCode: 'ATG',	CountryPhoneCode: '+1',	Country: 'Antigua and Barbuda',	},
                {	CountryCode: 'AUS',	CountryPhoneCode: '+61',	Country: 'Australia',	},
                {	CountryCode: 'AUT',	CountryPhoneCode: '+43',	Country: 'Austria',	},
                {	CountryCode: 'AZE',	CountryPhoneCode: '+994',	Country: 'Azerbaijan',	},
                {	CountryCode: 'BDI',	CountryPhoneCode: '+257',	Country: 'Burundi',	},
                {	CountryCode: 'BEL',	CountryPhoneCode: '+32',	Country: 'Belgium',	},
                {	CountryCode: 'BEN',	CountryPhoneCode: '+229',	Country: 'Benin',	},
                {	CountryCode: 'BFA',	CountryPhoneCode: '+226',	Country: 'Burkina Faso',	},
                {	CountryCode: 'BGD',	CountryPhoneCode: '+880',	Country: 'Bangladesh',	},
                {	CountryCode: 'BGR',	CountryPhoneCode: '+359',	Country: 'Bulgaria',	},
                {	CountryCode: 'BHR',	CountryPhoneCode: '+973',	Country: 'Bahrain',	},
                {	CountryCode: 'BHS',	CountryPhoneCode: '+1',	Country: 'Bahamas',	},
                {	CountryCode: 'BIH',	CountryPhoneCode: '+387',	Country: 'Bosnia and Herzegovina',	},
                {	CountryCode: 'BLR',	CountryPhoneCode: '+375',	Country: 'Belarus',	},
                {	CountryCode: 'BLZ',	CountryPhoneCode: '+501',	Country: 'Belize',	},
                {	CountryCode: 'BMU',	CountryPhoneCode: '+1',	Country: 'Bermuda',	},
                {	CountryCode: 'BOL',	CountryPhoneCode: '+591',	Country: 'Bolivia',	},
                {	CountryCode: 'BRA',	CountryPhoneCode: '+55',	Country: 'Brazil',	},
                {	CountryCode: 'BRB',	CountryPhoneCode: '+1',	Country: 'Barbados',	},
                {	CountryCode: 'BRN',	CountryPhoneCode: '+673',	Country: 'Brunei',	},
                {	CountryCode: 'BTN',	CountryPhoneCode: '+975',	Country: 'Bhutan',	},
                {	CountryCode: 'BVT',	CountryPhoneCode: '+975',	Country: 'Bouvet Island',	},
                {	CountryCode: 'BWA',	CountryPhoneCode: '+267',	Country: 'Botswana',	},
                {	CountryCode: 'CAF',	CountryPhoneCode: '+236',	Country: 'Central African Republic',	},
                {	CountryCode: 'CAN',	CountryPhoneCode: '+1',	Country: 'Canada',	},
                {	CountryCode: 'CCK',	CountryPhoneCode: '+1',	Country: 'Cocos (Keeling) Islands',	},
                {	CountryCode: 'CHE',	CountryPhoneCode: '+41',	Country: 'Switzerland',	},
                {	CountryCode: 'CHL',	CountryPhoneCode: '+56',	Country: 'Chile',	},
                {	CountryCode: 'CHN',	CountryPhoneCode: '+86',	Country: 'China',	},
                {	CountryCode: 'CIV',	CountryPhoneCode: '+225',	Country: 'Cote d\'Ivoire',	},
                {	CountryCode: 'CMR',	CountryPhoneCode: '+237',	Country: 'Cameroon',	},
                {	CountryCode: 'COD',	CountryPhoneCode: '+242',	Country: 'Congo(COD)',	},
                {	CountryCode: 'COG',	CountryPhoneCode: '+243',	Country: 'Congo(COG)',	},
                {	CountryCode: 'COK',	CountryPhoneCode: '+682',	Country: 'Cook Islands',	},
                {	CountryCode: 'COL',	CountryPhoneCode: '+57',	Country: 'Colombia',	},
                {	CountryCode: 'COM',	CountryPhoneCode: '+269',	Country: 'Comoros',	},
                {	CountryCode: 'CPV',	CountryPhoneCode: '+238',	Country: 'Cape Verde',	},
                {	CountryCode: 'CRI',	CountryPhoneCode: '+506',	Country: 'Costa Rica',	},
                {	CountryCode: 'CUB',	CountryPhoneCode: '+53',	Country: 'Cuba',	},
                {	CountryCode: 'CXR',	CountryPhoneCode: '+1',	Country: 'Christmas Island',	},
                {	CountryCode: 'CYM',	CountryPhoneCode: '+1',	Country: 'Cayman Islands',	},
                {	CountryCode: 'CYP',	CountryPhoneCode: '+357',	Country: 'Cyprus',	},
                {	CountryCode: 'CZE',	CountryPhoneCode: '+420',	Country: 'Czech Republic',	},
                {	CountryCode: 'DEU',	CountryPhoneCode: '+49',	Country: 'Germany',	},
                {	CountryCode: 'DJI',	CountryPhoneCode: '+253',	Country: 'Djibouti',	},
                {	CountryCode: 'DMA',	CountryPhoneCode: '+1',	Country: 'Dominica',	},
                {	CountryCode: 'DNK',	CountryPhoneCode: '+45',	Country: 'Denmark',	},
                {	CountryCode: 'DOM',	CountryPhoneCode: '+1',	Country: 'Dominican Republic',	},
                {	CountryCode: 'DZA',	CountryPhoneCode: '+213',	Country: 'Algeria',	},
                {	CountryCode: 'ECU',	CountryPhoneCode: '+593',	Country: 'Ecuador',	},
                {	CountryCode: 'EGY',	CountryPhoneCode: '+20',	Country: 'Egypt',	},
                {	CountryCode: 'ERI',	CountryPhoneCode: '+291',	Country: 'Eritrea',	},
                {	CountryCode: 'ESH',	CountryPhoneCode: '+212',	Country: 'Western Sahara',	},
                {	CountryCode: 'ESP',	CountryPhoneCode: '+34',	Country: 'Spain',	},
                {	CountryCode: 'EST',	CountryPhoneCode: '+372',	Country: 'Estonia',	},
                {	CountryCode: 'ETH',	CountryPhoneCode: '+251',	Country: 'Ethiopia',	},
                {	CountryCode: 'FIN',	CountryPhoneCode: '+358',	Country: 'Finland',	},
                {	CountryCode: 'FJI',	CountryPhoneCode: '+679',	Country: 'Fiji Islands',	},
                {	CountryCode: 'FLK',	CountryPhoneCode: '+500',	Country: 'Falkland Islands',	},
                {	CountryCode: 'FRA',	CountryPhoneCode: '+33',	Country: 'France',	},
                {	CountryCode: 'FRO',	CountryPhoneCode: '+298',	Country: 'Faroe Islands',	},
                {	CountryCode: 'FSM',	CountryPhoneCode: '+691',	Country: 'Federated States of Micronesia',	},
                {	CountryCode: 'GAB',	CountryPhoneCode: '+241',	Country: 'Gabon',	},
                {	CountryCode: 'GBR',	CountryPhoneCode: '+44',	Country: 'United Kingdom',	},
                {	CountryCode: 'GEO',	CountryPhoneCode: '+995',	Country: 'Georgia',	},
                {	CountryCode: 'GHA',	CountryPhoneCode: '+233',	Country: 'Ghana',	},
                {	CountryCode: 'GIB',	CountryPhoneCode: '+350',	Country: 'Gibraltar',	},
                {	CountryCode: 'GIN',	CountryPhoneCode: '+224',	Country: 'Guinea',	},
                {	CountryCode: 'GLP',	CountryPhoneCode: '+590',	Country: 'Guadeloupe',	},
                {	CountryCode: 'GMB',	CountryPhoneCode: '+220',	Country: 'Gambia',	},
                {	CountryCode: 'GNB',	CountryPhoneCode: '+245',	Country: 'Guinea-Bissau',	},
                {	CountryCode: 'GNQ',	CountryPhoneCode: '+240',	Country: 'Equatorial Guinea',	},
                {	CountryCode: 'GRC',	CountryPhoneCode: '+30',	Country: 'Greece',	},
                {	CountryCode: 'GRD',	CountryPhoneCode: '+1',	Country: 'Grenada',	},
                {	CountryCode: 'GRL',	CountryPhoneCode: '+299',	Country: 'Greenland',	},
                {	CountryCode: 'GTM',	CountryPhoneCode: '+502',	Country: 'Guatemala',	},
                {	CountryCode: 'GUF',	CountryPhoneCode: '+594',	Country: 'French Guiana',	},
                {	CountryCode: 'GUM',	CountryPhoneCode: '+1',	Country: 'Guam',	},
                {	CountryCode: 'GUY',	CountryPhoneCode: '+592',	Country: 'Guyana',	},
                {	CountryCode: 'HKG',	CountryPhoneCode: '+852',	Country: 'Hong Kong',	},
                {	CountryCode: 'HMD',	CountryPhoneCode: '+592',	Country: 'Heard Island and McDonald Islands',	},
                {	CountryCode: 'HND',	CountryPhoneCode: '+504',	Country: 'Honduras',	},
                {	CountryCode: 'HRV',	CountryPhoneCode: '+385',	Country: 'Croatia',	},
                {	CountryCode: 'HTI',	CountryPhoneCode: '+509',	Country: 'Haiti',	},
                {	CountryCode: 'HUN',	CountryPhoneCode: '+36',	Country: 'Hungary',	},
                {	CountryCode: 'IDN',	CountryPhoneCode: '+62',	Country: 'Indonesia',	},
                {	CountryCode: 'IND',	CountryPhoneCode: '+91',	Country: 'India',	},
                {	CountryCode: 'IOT',	CountryPhoneCode: '+246',	Country: 'British Indian Ocean Territory',	},
                {	CountryCode: 'IRL',	CountryPhoneCode: '+353',	Country: 'Ireland',	},
                {	CountryCode: 'IRN',	CountryPhoneCode: '+98',	Country: 'Iran',	},
                {	CountryCode: 'IRQ',	CountryPhoneCode: '+964',	Country: 'Iraq',	},
                {	CountryCode: 'ISL',	CountryPhoneCode: '+354',	Country: 'Iceland',	},
                {	CountryCode: 'ISR',	CountryPhoneCode: '+972',	Country: 'Israel',	},
                {	CountryCode: 'ITA',	CountryPhoneCode: '+39',	Country: 'Italy',	},
                {	CountryCode: 'JAM',	CountryPhoneCode: '+1',	Country: 'Jamaica',	},
                {	CountryCode: 'JOR',	CountryPhoneCode: '+962',	Country: 'Jordan',	},
                {	CountryCode: 'JPN',	CountryPhoneCode: '+81',	Country: 'Japan',	},
                {	CountryCode: 'KAZ',	CountryPhoneCode: '+7',	Country: 'Kazakstan',	},
                {	CountryCode: 'KEN',	CountryPhoneCode: '+254',	Country: 'Kenya',	},
                {	CountryCode: 'KGZ',	CountryPhoneCode: '+996',	Country: 'Kyrgyzstan',	},
                {	CountryCode: 'KHM',	CountryPhoneCode: '+855',	Country: 'Cambodia',	},
                {	CountryCode: 'KIR',	CountryPhoneCode: '+686',	Country: 'Kiribati',	},
                {	CountryCode: 'KNA',	CountryPhoneCode: '+1',	Country: 'Saint Kitts and Nevis',	},
                {	CountryCode: 'KOR',	CountryPhoneCode: '+850',	Country: 'South Korea',	},
                {	CountryCode: 'KWT',	CountryPhoneCode: '+965',	Country: 'Kuwait',	},
                {	CountryCode: 'LAO',	CountryPhoneCode: '+965',	Country: 'Laos',	},
                {	CountryCode: 'LBN',	CountryPhoneCode: '+961',	Country: 'Lebanon',	},
                {	CountryCode: 'LBR',	CountryPhoneCode: '+231',	Country: 'Liberia',	},
                {	CountryCode: 'LBY',	CountryPhoneCode: '+218',	Country: 'Libyan Arab Jamahiriya',	},
                {	CountryCode: 'LCA',	CountryPhoneCode: '+1',	Country: 'Saint Lucia',	},
                {	CountryCode: 'LIE',	CountryPhoneCode: '+423',	Country: 'Liechtenstein',	},
                {	CountryCode: 'LKA',	CountryPhoneCode: '+94',	Country: 'Sri Lanka',	},
                {	CountryCode: 'LSO',	CountryPhoneCode: '+266',	Country: 'Lesotho',	},
                {	CountryCode: 'LTU',	CountryPhoneCode: '+370',	Country: 'Lithuania',	},
                {	CountryCode: 'LUX',	CountryPhoneCode: '+352',	Country: 'Luxembourg',	},
                {	CountryCode: 'LVA',	CountryPhoneCode: '+371',	Country: 'Latvia',	},
                {	CountryCode: 'MAC',	CountryPhoneCode: '+853',	Country: 'Macao',	},
                {	CountryCode: 'MAR',	CountryPhoneCode: '+212',	Country: 'Morocco',	},
                {	CountryCode: 'MCO',	CountryPhoneCode: '+377',	Country: 'Monaco',	},
                {	CountryCode: 'MDA',	CountryPhoneCode: '+373',	Country: 'Moldova',	},
                {	CountryCode: 'MDG',	CountryPhoneCode: '+261',	Country: 'Madagascar',	},
                {	CountryCode: 'MDV',	CountryPhoneCode: '+960',	Country: 'Maldives',	},
                {	CountryCode: 'MEX',	CountryPhoneCode: '+52',	Country: 'Mexico',	},
                {	CountryCode: 'MHL',	CountryPhoneCode: '+692',	Country: 'Marshall Islands',	},
                {	CountryCode: 'MKD',	CountryPhoneCode: '+389',	Country: 'Macedonia',	},
                {	CountryCode: 'MLI',	CountryPhoneCode: '+223',	Country: 'Mali',	},
                {	CountryCode: 'MLT',	CountryPhoneCode: '+356',	Country: 'Malta',	},
                {	CountryCode: 'MMR',	CountryPhoneCode: '+95',	Country: 'Myanmar',	},
                {	CountryCode: 'MNG',	CountryPhoneCode: '+976',	Country: 'Mongolia',	},
                {	CountryCode: 'MNP',	CountryPhoneCode: '+1',	Country: 'Northern Mariana Islands',	},
                {	CountryCode: 'MOZ',	CountryPhoneCode: '+258',	Country: 'Mozambique',	},
                {	CountryCode: 'MRT',	CountryPhoneCode: '+222',	Country: 'Mauritania',	},
                {	CountryCode: 'MSR',	CountryPhoneCode: '+1',	Country: 'Montserrat',	},
                {	CountryCode: 'MTQ',	CountryPhoneCode: '+596',	Country: 'Martinique',	},
                {	CountryCode: 'MUS',	CountryPhoneCode: '+230',	Country: 'Mauritius',	},
                {	CountryCode: 'MWI',	CountryPhoneCode: '+265',	Country: 'Malawi',	},
                {	CountryCode: 'MYS',	CountryPhoneCode: '+60',	Country: 'Malaysia',	},
                {	CountryCode: 'MYT',	CountryPhoneCode: '+262',	Country: 'Mayotte',	},
                {	CountryCode: 'NAM',	CountryPhoneCode: '+264',	Country: 'Namibia',	},
                {	CountryCode: 'NCL',	CountryPhoneCode: '+687',	Country: 'New Caledonia',	},
                {	CountryCode: 'NER',	CountryPhoneCode: '+227',	Country: 'Niger',	},
                {	CountryCode: 'NFK',	CountryPhoneCode: '+672',	Country: 'Norfolk Island',	},
                {	CountryCode: 'NGA',	CountryPhoneCode: '+234',	Country: 'Nigeria',	},
                {	CountryCode: 'NIC',	CountryPhoneCode: '+505',	Country: 'Nicaragua',	},
                {	CountryCode: 'NIU',	CountryPhoneCode: '+683',	Country: 'Niue',	},
                {	CountryCode: 'NLD',	CountryPhoneCode: '+31',	Country: 'Netherlands',	},
                {	CountryCode: 'NOR',	CountryPhoneCode: '+47',	Country: 'Norway',	},
                {	CountryCode: 'NPL',	CountryPhoneCode: '+977',	Country: 'Nepal',	},
                {	CountryCode: 'NRU',	CountryPhoneCode: '+674',	Country: 'Nauru',	},
                {	CountryCode: 'NZL',	CountryPhoneCode: '+64',	Country: 'New Zealand',	},
                {	CountryCode: 'OMN',	CountryPhoneCode: '+968',	Country: 'Oman',	},
                {	CountryCode: 'PAK',	CountryPhoneCode: '+92',	Country: 'Pakistan',	},
                {	CountryCode: 'PAN',	CountryPhoneCode: '+507',	Country: 'Panama',	},
                {	CountryCode: 'PCN',	CountryPhoneCode: '+507',	Country: 'Pitcairn',	},
                {	CountryCode: 'PER',	CountryPhoneCode: '+51',	Country: 'Peru',	},
                {	CountryCode: 'PHL',	CountryPhoneCode: '+63',	Country: 'Philippines',	},
                {	CountryCode: 'PLW',	CountryPhoneCode: '+680',	Country: 'Palau',	},
                {	CountryCode: 'PNG',	CountryPhoneCode: '+675',	Country: 'Papua New Guinea',	},
                {	CountryCode: 'POL',	CountryPhoneCode: '+48',	Country: 'Poland',	},
                {	CountryCode: 'PRI',	CountryPhoneCode: '+1',	Country: 'Puerto Rico',	},
                {	CountryCode: 'PRK',	CountryPhoneCode: '+82',	Country: 'North Korea',	},
                {	CountryCode: 'PRT',	CountryPhoneCode: '+351',	Country: 'Portugal',	},
                {	CountryCode: 'PRY',	CountryPhoneCode: '+595',	Country: 'Paraguay',	},
                {	CountryCode: 'PSE',	CountryPhoneCode: '+970',	Country: 'Palestine',	},
                {	CountryCode: 'PYF',	CountryPhoneCode: '+689',	Country: 'French Polynesia',	},
                {	CountryCode: 'QAT',	CountryPhoneCode: '+974',	Country: 'Qatar',	},
                {	CountryCode: 'REU',	CountryPhoneCode: '+262',	Country: 'Reunion',	},
                {	CountryCode: 'ROM',	CountryPhoneCode: '+40',	Country: 'Romania',	},
                {	CountryCode: 'RUS',	CountryPhoneCode: '+7',	Country: 'Russian',	},
                {	CountryCode: 'RWA',	CountryPhoneCode: '+250',	Country: 'Rwanda',	},
                {	CountryCode: 'SAU',	CountryPhoneCode: '+966',	Country: 'Saudi Arabia',	},
                {	CountryCode: 'SDN',	CountryPhoneCode: '+249',	Country: 'Sudan',	},
                {	CountryCode: 'SEN',	CountryPhoneCode: '+221',	Country: 'Senegal',	},
                {	CountryCode: 'SGP',	CountryPhoneCode: '+65',	Country: 'Singapore',	},
                {	CountryCode: 'SGS',	CountryPhoneCode: '+65',	Country: 'South Georgia and the South Sandwich Islands',	},
                {	CountryCode: 'SHN',	CountryPhoneCode: '+290',	Country: 'Saint Helena',	},
                {	CountryCode: 'SJM',	CountryPhoneCode: '+290',	Country: 'Svalbard and Jan Mayen',	},
                {	CountryCode: 'SLB',	CountryPhoneCode: '+677',	Country: 'Solomon Islands',	},
                {	CountryCode: 'SLE',	CountryPhoneCode: '+232',	Country: 'Sierra Leone',	},
                {	CountryCode: 'SLV',	CountryPhoneCode: '+503',	Country: 'El Salvador',	},
                {	CountryCode: 'SMR',	CountryPhoneCode: '+378',	Country: 'San Marino',	},
                {	CountryCode: 'SOM',	CountryPhoneCode: '+252',	Country: 'Somalia',	},
                {	CountryCode: 'SPM',	CountryPhoneCode: '+508',	Country: 'Saint Pierre and Miquelon',	},
                {	CountryCode: 'STP',	CountryPhoneCode: '+239',	Country: 'Sao Tome and Principe',	},
                {	CountryCode: 'SUR',	CountryPhoneCode: '+597',	Country: 'Suriname',	},
                {	CountryCode: 'SVK',	CountryPhoneCode: '+421',	Country: 'Slovakia',	},
                {	CountryCode: 'SVN',	CountryPhoneCode: '+386',	Country: 'Slovenia',	},
                {	CountryCode: 'SWE',	CountryPhoneCode: '+46',	Country: 'Sweden',	},
                {	CountryCode: 'SWZ',	CountryPhoneCode: '+268',	Country: 'Swaziland',	},
                {	CountryCode: 'SYC',	CountryPhoneCode: '+248',	Country: 'Seychelles',	},
                {	CountryCode: 'SYR',	CountryPhoneCode: '+963',	Country: 'Syria',	},
                {	CountryCode: 'TCA',	CountryPhoneCode: '+1',	Country: 'Turks and Caicos Islands',	},
                {	CountryCode: 'TCD',	CountryPhoneCode: '+235',	Country: 'Chad',	},
                {	CountryCode: 'TGO',	CountryPhoneCode: '+228',	Country: 'Togo',	},
                {	CountryCode: 'THA',	CountryPhoneCode: '+66',	Country: 'Thailand',	},
                {	CountryCode: 'TJK',	CountryPhoneCode: '+992',	Country: 'Tajikistan',	},
                {	CountryCode: 'TKL',	CountryPhoneCode: '+690',	Country: 'Tokelau',	},
                {	CountryCode: 'TKM',	CountryPhoneCode: '+993',	Country: 'Turkmenistan',	},
                {	CountryCode: 'TMP',	CountryPhoneCode: '+670',	Country: 'East Timor',	},
                {	CountryCode: 'TON',	CountryPhoneCode: '+676',	Country: 'Tonga',	},
                {	CountryCode: 'TTO',	CountryPhoneCode: '+1',	Country: 'Trinidad and Tobago',	},
                {	CountryCode: 'TUN',	CountryPhoneCode: '+216',	Country: 'Tunisia',	},
                {	CountryCode: 'TUR',	CountryPhoneCode: '+90',	Country: 'Turkey',	},
                {	CountryCode: 'TUV',	CountryPhoneCode: '+688',	Country: 'Tuvalu',	},
                {	CountryCode: 'TWN',	CountryPhoneCode: '+886',	Country: 'Taiwan',	},
                {	CountryCode: 'TZA',	CountryPhoneCode: '+255',	Country: 'Tanzania',	},
                {	CountryCode: 'UGA',	CountryPhoneCode: '+256',	Country: 'Uganda',	},
                {	CountryCode: 'UKR',	CountryPhoneCode: '+380',	Country: 'Ukraine',	},
                {	CountryCode: 'UMI',	CountryPhoneCode: '+380',	Country: 'United States Minor Outlying Islands',	},
                {	CountryCode: 'UNK',	CountryPhoneCode: '+1',	Country: 'Unknown',	},
                {	CountryCode: 'URY',	CountryPhoneCode: '+598',	Country: 'Uruguay',	},
                {	CountryCode: 'USA',	CountryPhoneCode: '+1',	Country: 'United States',	},
                {	CountryCode: 'UZB',	CountryPhoneCode: '+998',	Country: 'Uzbekistan',	},
                {	CountryCode: 'VAT',	CountryPhoneCode: '+39',	Country: 'Holy See (Vatican City State)',	},
                {	CountryCode: 'VCT',	CountryPhoneCode: '+1',	Country: 'Saint Vincent and the Grenadines',	},
                {	CountryCode: 'VEN',	CountryPhoneCode: '+58',	Country: 'Venezuela',	},
                {	CountryCode: 'VGB',	CountryPhoneCode: '+1',	Country: 'Virgin Islands, British',	},
                {	CountryCode: 'VIR',	CountryPhoneCode: '+1',	Country: 'Virgin Islands, U.S.',	},
                {	CountryCode: 'VNM',	CountryPhoneCode: '+84',	Country: 'Vietnam',	},
                {	CountryCode: 'VUT',	CountryPhoneCode: '+678',	Country: 'Vanuatu',	},
                {	CountryCode: 'WLF',	CountryPhoneCode: '+681',	Country: 'Wallis and Futuna',	},
                {	CountryCode: 'WSM',	CountryPhoneCode: '+685',	Country: 'Samoa',	},
                {	CountryCode: 'YEM',	CountryPhoneCode: '+967',	Country: 'Yemen',	},
                {	CountryCode: 'YUG',	CountryPhoneCode: '+967',	Country: 'Yugoslavia',	},
                {	CountryCode: 'ZAF',	CountryPhoneCode: '+27',	Country: 'South Africa',	},
                {	CountryCode: 'ZMB',	CountryPhoneCode: '+260',	Country: 'Zambia',	},
                {	CountryCode: 'ZWE',	CountryPhoneCode: '+263',	Country: 'Zimbabwe',	},
            ]
        }
    }
};
