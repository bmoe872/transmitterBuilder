/*
########     ###     ######  ##    ## ######## ########  
##     ##   ## ##   ##    ## ##   ##  ##       ##     ## 
##     ##  ##   ##  ##       ##  ##   ##       ##     ## 
########  ##     ## ##       #####    ######   ########  
##        ######### ##       ##  ##   ##       ##   ##   
##        ##     ## ##    ## ##   ##  ##       ##    ##  
##        ##     ##  ######  ##    ## ######## ##     ## 
 */
var Packer = function() {
    STAGE.removeAllChildren();

    var packerHeight = 350;
    var packerWidth = 600;
    var roundedRadius = 100;

    var numSwitches = 10;

    var switchWidth = 50;
    var switchHeight = 50;

    var switchPositionX = 0; 
    var switchPositionY = 105;
    var switchSpacingX = (packerWidth - (numSwitches * switchWidth + switchPositionX)) / numSwitches; //will need to change packerWidth to usable eventually
    var switchPositionYlower = 220;

    var numJSticks = 5;

    var jStickWidth = 75;
    var jStickHeight = 75;
    var jStickPositionX = 0;
    var jStickPositionY = 210;
    var jStickSpacingX = (packerWidth - (numJSticks * jStickWidth + jStickPositionX)) / numJSticks; //same note as above for changing to usable

    this.switchWidth = switchWidth; //Public Variables, needed for switches
    this.switchHeight = switchHeight;

    this.jStickWidth = jStickWidth;
    this.jStickHeight = jStickHeight;

    var packerBox = new createjs.Shape();
    packerBox.graphics.setStrokeStyle(2).beginStroke("black").beginFill("orange").drawRoundRect(0, 0, packerWidth, packerHeight, roundedRadius);
    var packerContainer = new createjs.Container();
    packerContainer.x = 0;
    packerContainer.y = 0;
    packerContainer.setBounds(0, 0, packerWidth, packerHeight);

    packerContainer.addChild(packerBox);

    var packerSwitchArrayUpper = [];
    var packerSwitchArrayLower = [];
    var packerJStickArray = [];

    //Creates the upper switch locations, of which 10 are possible
    for (var i = 0; i < numSwitches; i++) {

        var switchX = (switchSpacingX / 2) + (switchSpacingX + switchWidth) * i; //Did the divide by two, because we have 2 sides that ALSO need space.

        packerSwitchArrayUpper[i] = new createjs.Shape();
        packerSwitchArrayUpper[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX + switchPositionX, switchPositionY, switchWidth, switchHeight);
        packerSwitchArrayUpper[i].setBounds(switchX + switchPositionX, switchPositionY, switchWidth, switchHeight);
        packerSwitchArrayUpper[i].alpha = 0;
        packerContainer.addChild(packerSwitchArrayUpper[i]);
    }
    //Creates the lower switch locations, of which 10 are possible
    for (var i = 0; i < 10; i++) {

        var switchX = (switchSpacingX / 2) + (switchSpacingX + switchWidth) * i;

        packerSwitchArrayLower[i] = new createjs.Shape();
        packerSwitchArrayLower[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX + switchPositionX, switchPositionYlower, switchWidth, switchHeight);
        packerSwitchArrayLower[i].setBounds(switchX + switchPositionX, switchPositionYlower, switchWidth, switchHeight);
        packerSwitchArrayLower[i].alpha = 0;
        packerContainer.addChild(packerSwitchArrayLower[i]);
    }
    //Creates the Joystick locations, of which 5 are possible. 
    for (var i = 0; i < 5; i++) {

        var jstickX = (jStickSpacingX / 2) + (jStickSpacingX + jStickWidth) * i;

        packerJStickArray[i] = new createjs.Shape();
        packerJStickArray[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(jstickX + jStickPositionX, jStickPositionY, jStickWidth, jStickHeight)
        packerJStickArray[i].setBounds(jstickX + jStickPositionX, jStickPositionY, jStickWidth, jStickHeight);
        packerJStickArray[i].alpha = 0;
        packerContainer.addChild(packerJStickArray[i]);
    }


    //Public Methods
    this.getContainer = function() {
        return packerContainer;
    }

    this.getSwitches = function() {
        return packerSwitchArrayUpper.concat(packerSwitchArrayLower);
    }

    this.getJSticks = function() {
        return packerJStickArray;
    }

    STAGE.addChild(packerContainer);
    STAGE.update();

    return false;
}
