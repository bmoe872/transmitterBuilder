/*Code written by Brady Moe at Kar-Tech inc.*/
/*Copyright 2016, Brady Moe, All rights reserved*/
/*This code was styled using the idomatic.js stlye guide*/
/*https://github.com/rwaldron/idiomatic.js*/
/*Ascii leters by: http://patorjk.com/software/taag/#p=display&f=Big&t=Impact*/
var STAGE;
var TRANSMITTER; //GLOBAL variable that gets tossed around depending on the transmitter
var TOGGLE;
var JSTICK;
var PADDLE;

/*Some variables used by all transmitters*/
var transmitterPositionX = 0; // For use with position the containers.
var transmitterPositionY = 0;


/* When the user clicks on the button, 
 toggle between hiding and showing the dropdown content */
var transmitterDDFunction = function() {
    document.getElementById("transmitterDropdown").classList.toggle("show");

}

var switchDDFunction = function() {
    document.getElementById("switchDropdown").classList.toggle("show");
}



var undoFunction = function(){
    var childToRemove = STAGE.getChildAt(STAGE.numChildren-1); 
    STAGE.removeChild(childToRemove); 
    STAGE.update();
}

$('html').keyup(function(e){
    if(e.keyCode == 46){
        undoFunction();
    }
});

// Close the dropdown menu if the user clicks outside of it

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');

            }
        }
    }
}
window.onload = function() {

    STAGE = new createjs.Stage("canvasElement");
    /*The below variables check which link was clicked on from the dropdown.*/
    var switchHeight = 50;
    var switchWidth = 50;

    var image = new Image(); //Pre-load the images so it doesnt look weird later.
    image.src = "Assets/compact_1.0.1.png";

    STAGE.mouseMoveOutside = true;
    STAGE.update();
}

//Load the image for the compact so's that its ready to go when we are!
var loadCompactImage = function(){
    var preload = new createjs.LoadQueue();
    preload.addEventListener("fileLoad",handleFileComplete);
    preload.loadFile("Assets/compact_1.0.1.png");
}

//Helper function to handle fileLoadCompletion
function handleFileComplete(event){
    document.body.appendChild(event.result);
}

//CREATES THE IMPACT
var CreateImpact = function() {
    TRANSMITTER = new Impact();
}

//CREATES THE COMPACT
var CreateCompact = function() {
    loadCompactImage(); //Handles the preloading of the image.
    TRANSMITTER = new Compact();
}

//CREATES THE PACKER
var CreatePacker = function() {
    TRANSMITTER = new Packer();
}

var CreateToggleSwitch = function(){
    TOGGLE = new ToggleSwitch(TRANSMITTER);
}

var CreateJStick = function(){
    JSTICK = new JStick(TRANSMITTER);
}

var CreatePaddle = function(){
    PADDLE = new Paddle(TRANSMITTER);
}