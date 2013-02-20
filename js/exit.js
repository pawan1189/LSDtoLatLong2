// JavaScript Document

function showExit(){
	
	//exit.onclick = function(){
	var r=confirm("Do you want to close this application ?");
	if (r==true)
  		{
  		//window.close();
		//window.parent.window.close();
		//device.exitApp();
		navigator.app.exitApp();
 		 }
	else
  		{
  		x="You pressed Cancel!";
  		}
//	}
	
	}