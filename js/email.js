// JavaScript Document
  
  function sendEmail(){
	  
	  var email=prompt("Send Email To:","");
	  
	  if (email==""){
		  if(!str_lat && !str_long){
		  alert("Unable to send email. Please first calculate Lat/Long.");
		 /*  document.getElementById('home').className  ;*/
		   window.document.location.href = 'index.html';
		  }else{
		  if (!email){
			  alert("Please enter Email-Id.");
			  }
		  else{
				  
			  }
	  			}
	 }
	  else
		  {
		 alert("You pressed Cancel!");
		  }
	  
	  }
	  