window.LanguagePackages= {
	"zh":{
		
	},
	"en":{
		"COM_MSG00": "SAVE",		
		"COM_MSG02": "Network Connection Failed.",
		"COM_MSG03": "Command Sent",
		"COM_MSG04": "Cancel",
		"COM_MSG05": "Nothing Found",
		"COM_MSG06": "Search",
		"COM_MSG07": "Send",
		"COM_MSG08": "Loading...",
		"COM_MSG09": "Latitude",
		"COM_MSG10": "Longitude",
		"COM_MSG11": "No Data",		
		"COM_MSG14": "Passwords do not match",
		"COM_MSG15": "Password should contain at least 6 characters",
		"COM_MSG16": "show",
		"COM_MSG17": "Wrong password",
		"COM_MSG18": "Can't get coordinates",

		"PROMPT_MSG001": "The login(email) or password you entered is incorrect.",
		"PROMPT_MSG002": "",
		"PROMPT_MSG003": "Password has been changed. Please, login with new credential",
		"PROMPT_MSG004": "No data position for this device",
		"PROMPT_MSG005": "Error. Please, try again later",
		"PROMPT_MSG006": "Tracking started.",
		"PROMPT_MSG007": "Tracking stopped.",
		"PROMPT_MSG008": "",
		"PROMPT_MSG009": "",
		"PROMPT_MSG010": "Are you sure you want to delete asset",
		"PROMPT_MSG011": "In this section, you can edit the timing for tracking the device.",
		"PROMPT_MSG012": "Are you sure want to exit the application?",	
		"PROMPT_MSG013": "Something not good. Please, try again later",	
		"PROMPT_MSG014": "Delete notification?",	
		"PROMPT_MSG015": "Are you sure you want to close the application?",	
		"PROMPT_MSG016": "Are you sure you want to delete all notifications?",	
		"PROMPT_MSG017": "Are you sure you want to delete selected notifications?",	
		"PROMPT_MSG018": "",
		"PROMPT_MSG019": "",
		"PROMPT_MSG020": "",
		"PROMPT_MSG021": "",

		"LOGIN_MSG00": "Login",
		"LOGIN_MSG01": "Registration",
		"LOGIN_MSG02": "Username / Email",
		"LOGIN_MSG03": "Password",
		"LOGIN_MSG04": "Sign In",
		"LOGIN_MSG05": "Forgot password?",
		"LOGIN_MSG06": "E-mail",
		"LOGIN_MSG07": "Repeat Password",
		"LOGIN_MSG08": "Register",


		"MENU_MSG00": "Home",
		"MENU_MSG01": "User Settings",
		"MENU_MSG02": "Sign Out",
		"MENU_MSG03": "Add New",
		"MENU_MSG04": "Timing",
		"MENU_MSG05": "My Location",

		"HOME_MSG00": "Asset List",
		"HOME_MSG01": "Asset Name",
		"HOME_MSG02": "Tracking",
		"HOME_MSG03": "",
		"HOME_MSG04": "Settings",
		"HOME_MSG05": "Delete",

		"USER_PROFILE_MSG01": "First Name",
		"USER_PROFILE_MSG02": "Last Name",
		"USER_PROFILE_MSG03": "E-mail",
		"USER_PROFILE_MSG04": "Mobile",
		"USER_PROFILE_MSG05": "Phone",
		"USER_PROFILE_MSG06": "Password",
		"USER_PROFILE_MSG07": "New Password",
		"USER_PROFILE_MSG08": "Confirm Password",
		"USER_PROFILE_MSG09": "User Profile",		

		"ASSET_EDIT_MSG00": "Tag",
		"ASSET_EDIT_MSG01": "Name",
		"ASSET_EDIT_MSG02": "Unit Speed",
		"ASSET_EDIT_MSG03": "Initial",
		"ASSET_EDIT_MSG04": "Mileage",
		"ASSET_EDIT_MSG05": "Runtime",
		"ASSET_EDIT_MSG06": "Attributes",
		"ASSET_EDIT_MSG07": "Make",
		"ASSET_EDIT_MSG08": "Model",
		"ASSET_EDIT_MSG09": "Color",
		"ASSET_EDIT_MSG10": "Year",
		"ASSET_EDIT_MSG11": "Edit photo",
		"ASSET_EDIT_MSG12": "Edit",

		"ASSET_TRACK_MSG00": 'Tracking',
		"ASSET_TRACK_MSG01": 'IMEI',
		"ASSET_TRACK_MSG02": 'Phone',
		"ASSET_TRACK_MSG03": 'Name',
		"ASSET_TRACK_MSG04": 'Date',
		"ASSET_TRACK_MSG05": 'Route',

		"USER_TIMING_MSG00": "Timing",
		"USER_TIMING_MSG01": "Name",
		"USER_TIMING_MSG02": "Phone",
		"USER_TIMING_MSG03": "IMEI",
		"USER_TIMING_MSG04": "Timing List",
		"USER_TIMING_MSG05": "Tracking Interval",
		"USER_TIMING_MSG06": "Time of Day",
		"USER_TIMING_MSG07": "Day of Weeks",
		"USER_TIMING_MSG08": "Monday",
		"USER_TIMING_MSG09": "Tuesday",
		"USER_TIMING_MSG10": "Wednesday",
		"USER_TIMING_MSG11": "Thursday",
		"USER_TIMING_MSG12": "Friday",
		"USER_TIMING_MSG13": "Saturday",
		"USER_TIMING_MSG14": "Sunday",
		"USER_TIMING_MSG15": "sec",
		"USER_TIMING_MSG16": "min",
		"USER_TIMING_MSG17": "Start Time",
		"USER_TIMING_MSG18": "GPSUploader not supported",
		"USER_TIMING_MSG19": "End Time",
		"USER_TIMING_MSG20": "End Time",
		"USER_TIMING_MSG21": "None",


		"PHOTO_EDIT_MSG00": 'Edit Photo',
		"PHOTO_EDIT_MSG01": 'Take Picture',
		"PHOTO_EDIT_MSG02": 'From Gallery',	


		
	},
	"es":{
			
	}
};
var lang = navigator.browserLanguage ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase();
if(lang.indexOf("en") >= 0) {
	lang = "en";
}
else if(lang.indexOf("es") >= 0) {
	lang = "en";
}
else if(lang.indexOf("zh") >= 0) {
	lang = "en";
}	
else {
	lang = "en";		
}
window.LANGUAGE = LanguagePackages[lang];
if(!Template7.global)
{
	Template7.global = {};
}

Template7.global.LANGUAGE = window.LANGUAGE;