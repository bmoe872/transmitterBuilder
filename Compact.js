/*
 ######   #######  ##     ## ########     ###     ######  ######## 
##    ## ##     ## ###   ### ##     ##   ## ##   ##    ##    ##    
##       ##     ## #### #### ##     ##  ##   ##  ##          ##    
##       ##     ## ## ### ## ########  ##     ## ##          ##    
##       ##     ## ##     ## ##        ######### ##          ##    
##    ## ##     ## ##     ## ##        ##     ## ##    ##    ##    
 ######   #######  ##     ## ##        ##     ##  ######     ##                  
*/
var Compact = function() {
    STAGE.removeAllChildren();

    var compactHeight = 375; //Mesaures around 4 inches for switch space. So lets make this 400
    var compactWidth = 745; //Measures around 8 inches for switch space. So lets make this 800

    var usableHeight = 300;
    var usableWidth = 680;

    var numSwitches = 10;
    
    var switchWidth = 50;
    var switchHeight = 50;

    var switchPositionX = 65; //This number should match the spacing... for now.
    var switchPositionY = 105;
    var switchSpacingX = (usableWidth-(numSwitches*switchWidth+switchPositionX))/numSwitches; 
    var switchPositionYlower = 220;

    var numJSticks = 5;

    var jStickWidth = 75;
    var jStickHeight = 75;
    var jStickPositionX = 75;
    var jStickPositionY = 210;
    var jStickSpacingX = (usableWidth-(numJSticks*jStickWidth+jStickPositionX))/numJSticks;

    

    this.switchWidth = switchWidth; //Public variables, needed for switches
    this.switchHeight = switchHeight;

    this.jStickWidth = jStickWidth;
    this.jStickHeight = jStickHeight;

    var image = new Image();
    image.src = "Assets/compact_1.0.1.png";
    //var bitmap = new createjs.Bitmap(image);
    image.x = 400;

    console.log("checking image x: "+image.x);

    var compactContainer = new createjs.Container();
    compactContainer.x = 0;
    compactContainer.y = 0;
    compactContainer.setBounds(0, 0, compactWidth, compactHeight);

    var compactBox = new createjs.Shape();
    compactBox.graphics.setStrokeStyle(2).beginStroke("white").beginBitmapFill(image,"no-repeat").drawRect(0, 0, compactWidth, compactHeight);
    STAGE.update();

    compactContainer.addChild(compactBox);

    //var compactSwitchSpace = new createjs.Shape();
    //compactSwitchSpace.graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(0,0,usableWidth, usableHeight);

    var compactSwitchArrayUpper = [];
    var compactSwitchArrayLower = [];
    var compactJStickArray = [];

    //Creates the upper switch locations, of which 10 are possible
    for (var i = 0; i < numSwitches; i++) {
        
        var switchX =  (switchSpacingX/2) + (switchSpacingX + switchWidth)*i; //Did the divide by two, because we have 2 sides that ALSO need space.

        compactSwitchArrayUpper[i] = new createjs.Shape();
        compactSwitchArrayUpper[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX+switchPositionX, switchPositionY, switchWidth, switchHeight);
        compactSwitchArrayUpper[i].setBounds(switchX+switchPositionX, switchPositionY, switchWidth, switchHeight);
        compactSwitchArrayUpper[i].alpha = 0;
        compactContainer.addChild(compactSwitchArrayUpper[i]);
    }
    //Creates the lower switch locations, of which 10 are possible
    for (var i = 0; i < 10; i++) {

        var switchX =  (switchSpacingX/2) + (switchSpacingX + switchWidth)*i;

        compactSwitchArrayLower[i] = new createjs.Shape();
        compactSwitchArrayLower[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX+switchPositionX, switchPositionYlower, switchWidth, switchHeight);
        compactSwitchArrayLower[i].setBounds(switchX+switchPositionX, switchPositionYlower, switchWidth, switchHeight);
        compactSwitchArrayLower[i].alpha = 0;
        compactContainer.addChild(compactSwitchArrayLower[i]);
    }
    //Creates the Joystick locations, of which 5 are possible. 
    for (var i = 0; i < 5; i++){ 

        var jstickX = (jStickSpacingX/2) + (jStickSpacingX + jStickWidth)*i;

        compactJStickArray[i] = new createjs.Shape();
        compactJStickArray[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(jstickX+jStickPositionX,jStickPositionY,jStickWidth,jStickHeight)
        compactJStickArray[i].setBounds(jstickX+jStickPositionX,jStickPositionY,jStickWidth,jStickHeight);
        compactJStickArray[i].alpha = 0;
        compactContainer.addChild(compactJStickArray[i]);
    }

    //Public Methods
    this.getContainer = function() {
        return compactContainer;
    }

    this.getSwitches = function() {
        return compactSwitchArrayUpper.concat(compactSwitchArrayLower);
    }

    this.getJSticks = function(){
        return compactJStickArray;
    }



    STAGE.addChild(compactContainer);
    STAGE.update();

    return false;
}
