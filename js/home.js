// JavaScript Document

addEventListener('load' , doInputLoad,false);

var homeTab =null;
var aboutTab =null ;
var emailTab = null ;
var exitTab = null ;
var selectedButton = 'btnHome';

function doInputLoad() {
	 var items = document.getElementsByTagName('input');
    for (var i = 0; i < items.length; i++) {
        var element = items[i];
        element.style.width = screen.width - element.offsetLeft ;
    }  
	
	 // All the sections are visible to start off with so that the above 
    // size calculations work 
    var width = (screen.width - 20) ;
    homeTab = document.getElementById('home');
    homeTab.style.width = width;
    homeTab.style.display = 'none';
	homeTab.style.display = 'inline';
	
    aboutTab = document.getElementById('about');
    aboutTab.style.width = width;
    aboutTab.style.display = 'none';
	
	
    emailTab = document.getElementById('email');
    emailTab.style.width = width;
    emailTab.style.display = 'none';
   
	exitTab = document.getElementById('exit');
    exitTab.style.width = width;
    exitTab.style.display = 'none';
	
	doSelect('btnHome');
}

function resetImages() {
    doSelect(selectedButton);
}

function doSelect(id) {

 var button = document.getElementById(id);
    button.style.backgroundPosition = 'bottom right';
    button.childNodes[1].style.backgroundPosition = 'bottom left';
        
    if (id == 'btnHome') {
        // Reset phone and address
        resetButton('btnAbout');
        resetButton('btnEmail');  
		resetButton('btnExit');  
    }
    else if (id == 'btnAbout'){
        // Reset phone and contact
        resetButton('btnHome');
        resetButton('btnEmail');  
		resetButton('btnExit');     
    }    
    else if(id == 'btnEmail') {
        // Reset address and contact
		resetButton('btnHome'); 
        resetButton('btnAbout'); 
		resetButton('btnExit');  
    }    
	else if(id == 'btnExit') {
        // Reset address and contact
		resetButton('btnHome'); 
        resetButton('btnAbout'); 
		resetButton('btnEmail');  
    } 
}

function doHover(id) {
    if (blackberry.focus.getFocus() != id) 
        return;
        
    var button = document.getElementById(id);
    button.style.backgroundPosition = 'bottom right';
    button.childNodes[1].style.backgroundPosition  = 'bottom left';
        
    if (id == 'btnHome') {
        // Reset about ,email and exit
        if (selectedButton != 'btnAbout') resetButton('btnAbout');
        if (selectedButton != 'btnEmail') resetButton('btnEmail'); 
		if (selectedButton != 'btnExit') resetButton('btnExit'); 
    }
    else if (id == 'btnAbout'){
        // Reset home,email and exit
        if (selectedButton != 'btnHome') resetButton('btnHome');
        if (selectedButton != 'btnEmail') resetButton('btnEmail'); 
		if (selectedButton != 'btnExit') resetButton('btnExit');    
    }    
    else if(id == 'btnEmail') {
        // Reset home,about and exit
        if (selectedButton != 'btnHome') resetButton('btnHome');
        if (selectedButton != 'btnAbout') resetButton('btnAbout'); 
		if (selectedButton != 'btnExit') resetButton('btnExit');
    }   
	else if(id == 'btnEmail') {
        // Reset home,about and email
        if (selectedButton != 'btnHome') resetButton('btnHome');
        if (selectedButton != 'btnAbout') resetButton('btnAbout'); 
		if (selectedButton != 'btnEmail') resetButton('btnEmail');
    }  
}

function resetButton(id) {
    var button = document.getElementById(id);
    button.style.backgroundPosition = 'top right';
    button.childNodes[1].style.backgroundPosition  = 'top left'; 
}

function selectHome() {
    selectedButton = 'btnHome';
    doSelect(selectedButton);
    homeTab.style.display = 'inline';
    aboutTab.style.display = 'none';
    emailTab.style.display = 'none';
	exitTab.style.display = 'none';
}

function selectAbout() {
    selectedButton = 'btnAbout';
    doSelect(selectedButton);
    homeTab.style.display = 'none';
    aboutTab.style.display = 'inline';
    emailTab.style.display = 'none';
	exitTab.style.display = 'none';
}

function selectEmail() {
    selectedButton = 'btnEmail';
    doSelect(selectedButton);
    homeTab.style.display = 'none';
    aboutTab.style.display = 'none';
    emailTab.style.display = 'inline';
	exitTab.style.display = 'none';
}

function selectExit() {
    selectedButton = 'btnExit';
    doSelect(selectedButton);
    homeTab.style.display = 'none';
    aboutTab.style.display = 'none';
    emailTab.style.display = 'none';
	exitTab.style.display = 'inline';
}


