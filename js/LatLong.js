// JavaScript Document
var _latitude = new Array();
var _longitude = new Array();
var _latDegree =null;
var _longDegree = null;
var str_lat = null;
var str_long = null;


function selectLatLong(){
	var mQuarterValue = document.getElementById("qua").value;//document.getElementsByName("Quarter");
	var mSectionValue = document.getElementById("sec").value;
	var mTownshipValue = document.getElementById("town").value;
	var mRangeValue = document.getElementById("range").value;
	var mMeridianValue = document.getElementById("meridian").value;
	var latitude;
	var longitude;
	  if ((!mQuarterValue 
				|| !mSectionValue
				|| !mTownshipValue
				|| !mRangeValue
				|| !mMeridianValue)) {  
				
						alertMethod(6);
	  }else{
				
				if ((mQuarterValue > 0) && (mQuarterValue < 17)
					&& ((mSectionValue > 0) && (mSectionValue < 37))
					&& ((mTownshipValue > 0) && (mTownshipValue < 127))
					&& ((mRangeValue > 0) && (mRangeValue < 37))
					&& ((mMeridianValue > 0) && (mMeridianValue < 7))) {
						
						if (navigator.geolocation){
	    // timeout at 60000 milliseconds (60 seconds)
     					var options = {
		  				timeout:60000
		  							};
									
		  		action(mQuarterValue, mSectionValue, mTownshipValue,
						mRangeValue, mMeridianValue);
   			// navigator.geolocation.getCurrentPosition(showPosition);
    												}
 					 else{x.innerHTML="Geolocation is not supported by this device.";
  							}
				
				} else {

					if ((mQuarterValue <= 0) || (mQuarterValue > 16)) {
					clearValues();
					alertMethod(1);
				} else {

					if ((mSectionValue <= 0) || (mSectionValue > 36)) {
						clearValues();
						alertMethod(2);
					} else {

						if ((mTownshipValue <= 0) || (mTownshipValue > 126)) {
							clearValues();
							alertMethod(3);
						} else {
							if ((mRangeValue <=0) || (mRangeValue > 36)) {
								clearValues();
								alertMethod(4);
							} else {
								if ((mMeridianValue <= 0) || (mMeridianValue > 6)) {
									clearValues();
									alertMethod(5);
								} else {
									clearValues();
									alertMethod(6);
								}
							}
						}
					}
				}

			}
	}
 /* if (navigator.geolocation){
	    // timeout at 60000 milliseconds (60 seconds)
      var options = {
		  timeout:60000
		  };
   // navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";
  }*/
				
}


function alertMethod(value) {
		try{
			switch (value) {
			case 1:
				alert("Fill correct quarter value in between (1-16)");
				break;
			case 2:
				alert("Fill correct section value in between (1-36)");
				break;
			case 3:
				alert("Fill correct township value in between  (1-126)");
				break;
			case 4:
				alert("Fill correct range value in between  (1-36)");
				break;
			case 5:
				alert("Fill correct meridian value in between  (1-6)");
				break;
			case 6:
				alert("Fill all values");
				break;
			case 7:
				alert("Please calculate latitude/longitude value first");
				break;
			default:
				alert("Fill all values");
			}
		}catch (e) {
		}
	}

function clearValues() {
		str_lat = "";
		str_long = "";
		str_lat_deg = "";
		str_long_deg = "";
	}
	
function clearText() {

		tv_Latitude.setText("");
		tv_Latitude_Degree.setText("");
		tv_Logitude.setText("");
		tv_Logitude_Degree.setText("");
		clearValues();
	}  
	
function action(Quarter,Section,TownShip,Range,Meridian){
	tATSCoord.Quarter = Quarter;
	tATSCoord.Section = Section;
	tATSCoord.TownShip = TownShip;
	tATSCoord.Range = Range ;
	tATSCoord.Meridian = Meridian ;
	
	var flag = atsFillLL();
	 if (navigator.geolocation){
	//boolean flag = atsFillLL(tatscoord);
	double1 = ((5000 * (NLat + NLat)) / 10000);
	double3 = ((-1)
				* (5000 * (WLong + WLong)) / 10000);
				
	    str_lat = Math.abs(double1);
		str_long = double3;
		//tv_Latitude.setText("Latitude: " + str_lat);
		var str_lat_deg = calculateLatitude(str_lat);
		//tv_Latitude_Degree.setText("(Degree): " + str_lat_deg);
		//tv_Logitude.setText("Longitude: " + str_long);
		var str_long_deg = calculateLongitude(str_long);
	//	tv_Logitude_Degree.setText("(Degree): " + str_long_deg);
		showPosition(str_lat,str_long,str_lat_deg,str_long_deg);
	 }else{
		 x.innerHTML="Geolocation is not supported by this device.";
  			}
		return true;	
				
		}
	
	
function showPosition(str_lat, str_long, str_lat_deg, str_long_deg)
  {
	 /* var x=document.getElementById("coordinates");
  		x.innerHTML="Latitude: " + position.coords.latitude + 
  		"<br>Longitude: " + position.coords.longitude;*/
		
		 var x=document.getElementById("coordinates");
  		x.innerHTML="Latitude: " + str_lat +"<br>(Degree): " +
        str_lat_deg +"<br>Longitude: " + str_long +"<br>(Degree): "+str_long_deg;
		
		
  }
  
function atsFillLL(tatscoord) {
		var d = (0.087302311480821862 * (secToMilesNorth(tATSCoord.Section) + qtrToMilesNorth(tATSCoord.Quarter))) / 6;
		NLat = twpToLat(tATSCoord.TownShip) + d;
		NLat = NLat + 0.0072751926234018221;

		var d1 = (lngPerRng(tATSCoord.TownShip) * (secToMilesWest(tATSCoord.Section) + QtrToMilesWest(tATSCoord.Quarter))) / 6;
		WLong = RngToLng(tATSCoord.Range,
				tATSCoord.Meridian, tATSCoord.TownShip)
				+ d1;
		WLong = WLong+ (0.5 * lngPerRng(tATSCoord.TownShip)) / 6;
		return true;
	}

function secToMilesNorth(value) {
		return (value - 1) / 6;
	}

function twpToLat(value) {
		return  (value - 1) * 0.087302311480821862 + 49;
	}

function lngPerRng(value) {
		var integer1 = 1 + ((value + 1) / 4) * 4;
		var double1 = twpToLat(integer1);
		var double2 = 1080 / (3.1415926540000001 * Math
				.cos((double1 / 57.295779505601047)) * 3937.75);
		return double2;
	}

function secToMilesWest(value) {
		var integer2 = secToMilesNorth(value);
		var integer1 = integer2 % 2;
		var integer3;
		
		if (integer1 == 1)
			integer3 = 5 - (value - 1) % 6;
		else
			integer3 = (value - 1) % 6;
		return integer3;
	}

function qtrToMilesNorth(i) {
		var d;
		if (i == 1 || i == 2)
			d = 0.5;
		else
			d = 0.0;
		return d;
	}

function QtrToMilesWest(i) {
		var d;
		if (i == 1 || i == 3)
			d = 0.5;
		else
			d = 0.0;
		return d;
	}

function RngToLng(integer, integer1, integer2) {
		return (integer - 1.0) * lngPerRng(integer2)
		+ MerToLng(integer1);
	}

function MerToLng(integer) {
		var ad = new Array(8);
		ad[1] = "97.5";
		ad[2] = "102";
		ad[3] = "106.02";
		ad[4] = "110";
		ad[5] = "114";
		ad[6] = "118";
		ad[7] = "122";
		/*ad.push("97.5");
		ad.push("102");
		ad.push("106.02");
		ad.push("110");
		ad.push("114");
		ad.push("118");
		ad.push("122");*/
		return ad[integer];
	}
	
	
	
function selectGoToMap(){
	x.innerHTML="Hi"; 
		}	
		
		
function calculateLatitude(str_Latitude){
	/*
		 * The whole units of degrees will remain the same (i.e. in 121.135°
		 * longitude, start with 121°). Multiply the decimal by 60 (i.e. .135 *
		 * 60 = 8.1). The whole number becomes the minutes (8'). Take the
		 * remaining decimal and multiply by 60. (i.e. .1 * 60 = 6). The
		 * resulting number becomes the seconds (6"). Seconds can remain as a
		 * decimal. Take your three sets of numbers and put them together, using
		 * the symbols for degrees (°), minutes (‘), and seconds
		 * (") (i.e. 121°8'6" longitude)
		 */
		 
	_latitude = splitString(str_Latitude , "." ,false);
	var length = _latitude[1].length;
	var exponent = pow((0.1),length);	 
	var minutesForLatitude = exponent * _latitude[1]*60 ;/* (exponent * parseFloat(_longitude[1]*60));*/
	var temp_minutesForLatitude = minutesForLatitude.toString();
	
	var minutes = new Array();
	minutes = splitString(temp_minutesForLatitude , "." ,false);
	
	var length1 = minutes[1].length();
		var exponent1 = pow((.1), length1);
		var minutesForLatitude1 = (exponent1 * (minutes[1]) * 60);
		var strForF = minutesForLatitude1.toString();
		strForF = strForF.substring(0, 7);
		_latDegree = _latitude[0] + "°" + " " + minutes[0] + "'" + " "
				+ strForF;

		return _latDegree;
	}
	
function calculateLongitude(str_Longitude){
		 
	_longitude = splitString(str_Longitude , "." ,false);
	var length = _longitude[1].length;
	var exponent = pow((0.1),length);	 
	var minutesForLongitude = exponent * _longitude[1]*60 ;/* (exponent * parseFloat(_longitude[1]*60));*/
	var temp_minutesForLongitude = minutesForLongitude.toString();
	
	var minutes = new Array();
	minutes = splitString(temp_minutesForLongitude , "." ,false);
	
	var length1 = minutes[1].length();
		var exponent1 = pow((.1), length1);
		var minutesForLongitude1 = (exponent1 * (minutes[1]) * 60);
		var strForF = minutesForLongitude1.toString();
		strForF = strForF.substring(0, 7);
		_longDegree = _longitude[0] + "°" + " " + minutes[0] + "'" + " "
				+ strForF;

		return _longDegree;
}
	
function splitString(data,string,allowEmpty){
	var v = new Array();
	var indexStart = 0; 
	var data1 = data;
	var string1 = string ;
	var indexEnd =data1.indexOf(v);
	
	  if(indexEnd != -1 ){
			while (indexEnd != -1) {
				var s = data.substring(indexStart , indexEnd);
				if (allowEmpty || s.length() > 0) {
					v.push(s);
				}
				indexStart = indexEnd + 1;
				indexEnd = data.indexOf(string, indexStart);
			}
				if (indexStart != data.length()) {
				// Add the rest of the string
				var s = data.substring(indexStart);
				if (allowEmpty || s.length() > 0) {
					v.push(s);
				}
			}
	  }
				else {
			    if (allowEmpty || data.length() > 0) {
				v.addElement(data);
				}
					 }
				
				var result = new Array(v.length);
				result = v.join('').split('');
		
	}	
	
	
	
	
	
	
	
	
	