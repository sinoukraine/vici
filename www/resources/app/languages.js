window.LanguagePackages= {
	"zh":{
		
	},
	"en":{
		"COM_MSG000": "Submit",
		"COM_MSG001": "Cancel",
		"COM_MSG002": "Search",
		"COM_MSG003": "Sunday",
		"COM_MSG004": "Monday",
		"COM_MSG005": "Tuesday",
		"COM_MSG006": "Wednesday",
		"COM_MSG007": "Thursday",
		"COM_MSG008": "Friday",
		"COM_MSG009": "Saturday",
		"COM_MSG010": "Sun",
		"COM_MSG011": "Mon",
		"COM_MSG012": "Tue",
		"COM_MSG013": "Wed",
		"COM_MSG014": "Thu",
		"COM_MSG015": "Fri",
		"COM_MSG016": "Sat",
		"COM_MSG017": "OK",
		"COM_MSG018": "Can't get coordinates",

		"COM_MSG019": "North",
		"COM_MSG020": "Northeast",
		"COM_MSG021": "East",
		"COM_MSG022": "Southeast",
		"COM_MSG023": "South",
		"COM_MSG024": "Southwest",
		"COM_MSG025": "West",
		"COM_MSG026": "Northwest",
		"COM_MSG027": "Unknown",


		"PROMPT_MSG000": "Nothing found",
		"PROMPT_MSG001": "In this section, you can edit the timing for tracking the device.",
		"PROMPT_MSG002": "Method not found",
		"PROMPT_MSG003": "An issue has been detected, please try again later or contact our support team",
		"PROMPT_MSG004": "Can't verify device",
		"PROMPT_MSG005": "This phone not registered in system",
		"PROMPT_MSG006": "Tracking not supported",
		"PROMPT_MSG007": "Tracking scheduled",
		"PROMPT_MSG008": "Tracking permission denied",
		"PROMPT_MSG009": "Scheduled tracking stopped",
		"PROMPT_MSG010": "Panic Button Behaviour",
		"PROMPT_MSG011": "This is an emergency call button and SMS alerts to the numbers you specify in user settings page, in case something happened to you and help is needed.",
		"PROMPT_MSG012": "Set Panic Button behaviour, please",
		"PROMPT_MSG013": "The login(email) or password you entered is incorrect.",
		"PROMPT_MSG014": "Data saved",
		"PROMPT_MSG015": "I'm in emergency, my location",
		"PROMPT_MSG016": 'My phone Battery lvl',
		"PROMPT_MSG017": 'Speed',
		"PROMPT_MSG018": 'Heading',
		"PROMPT_MSG019": '',

		"PROMPT_MSG022": "Please set up your Panic Button Behaviour",
		"PROMPT_MSG023": "Data not saved",

		"PROMPT_MSG026": "Panic Button is turned off. Go to turn it on?",

		"PROMPT_MSG028": "Emergency phone call executed",

		"PROMPT_MSG052": "Here you can set new password - min 6, max 32 characters and contains no spaces",
		"PROMPT_MSG053": "Passwords do not match",
		"PROMPT_MSG054": "Password should contain at least 6 characters",
		"PROMPT_MSG055": "Password has been changed. Please, login with new credential",
		"PROMPT_MSG056": "Wrong current password",

		"PROMPT_MSG068": "You haven't added any Emergency Contact, please go to User Settings to add them",


		"HOME_MSG00": "Home",
		"HOME_MSG01": "Name",
		"HOME_MSG02": "Phone",
		"HOME_MSG03": "Email",

		"MENU_MSG00": "Home",
		"MENU_MSG01": "User Settings",
		"MENU_MSG02": "Sign Out",

		"LOGIN_SCREEN_MSG00": "Login Name / Email",
		"LOGIN_SCREEN_MSG01": "Password",
		"LOGIN_SCREEN_MSG02": "Sign In",
		"LOGIN_SCREEN_MSG03": "Registration",

		"PROFILE_SETTINGS_MSG00": "User",
		"PROFILE_SETTINGS_MSG01": "Password",
		"PROFILE_SETTINGS_MSG02": "First Name",
		"PROFILE_SETTINGS_MSG03": "Last Name",
		"PROFILE_SETTINGS_MSG04": "Email",
		"PROFILE_SETTINGS_MSG05": "Phone",
		"PROFILE_SETTINGS_MSG06": "User Info",
		"PROFILE_SETTINGS_MSG07": "Emergency Contacts",
		"PROFILE_SETTINGS_MSG08": "Contact Name",
		"PROFILE_SETTINGS_MSG09": "Old Password",
		"PROFILE_SETTINGS_MSG10": "New Password",
		"PROFILE_SETTINGS_MSG11": "Confirm New Password",
		"PROFILE_SETTINGS_MSG12": "Change Password",

		"TIMING_MSG00": "Phone Timing",
		"TIMING_MSG01": "Turn On / Off Tracking",
		"TIMING_MSG02": "Tracking Interval",
		"TIMING_MSG03": "Day of Weeks",
		"TIMING_MSG04": "Start Time",
		"TIMING_MSG05": "End Time",
		"TIMING_MSG06": "sec",
		"TIMING_MSG07": "min",
		"TIMING_MSG08": "Phone Number",
		"TIMING_MSG09": "Country Code",

		"PANIC_BUTTON_MSG00": "Panic Button",
		"PANIC_BUTTON_MSG01": "Emergency Phone",
		"PANIC_BUTTON_MSG02": "Send SMS",

		"TRACKING_PLUGIN_MSG00": "Location unknown",
		"TRACKING_PLUGIN_MSG01": "Location permission denied",
		"TRACKING_PLUGIN_MSG02": "Network error",
		"TRACKING_PLUGIN_MSG03": "Location timeout",
		"TRACKING_PLUGIN_MSG04": "Unknown Error",
		"TRACKING_PLUGIN_MSG05": "Location data is empty",
		"TRACKING_PLUGIN_MSG06": "Tracking permission denied",



	},
	"ua":{
		
	},
	"ru":{
		
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
else if(lang.indexOf("ua") >= 0 || lang.indexOf("uk") >= 0) {
	//lang = "ua";
	lang = "en";	
}
else if(lang.indexOf("ru") >= 0) {
	//lang = "ru";
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