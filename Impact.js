/*
#### ##     ## ########     ###     ######  ######## 
 ##  ###   ### ##     ##   ## ##   ##    ##    ##    
 ##  #### #### ##     ##  ##   ##  ##          ##    
 ##  ## ### ## ########  ##     ## ##          ##    
 ##  ##     ## ##        ######### ##          ##    
 ##  ##     ## ##        ##     ## ##    ##    ##    
#### ##     ## ##        ##     ##  ######     ##  
*/
var Impact = function() {
    STAGE.removeAllChildren();

    var impactHeight = 500; //Private Variables
    var impactWidth = 1000;

    var usableWidth = 0; //Will need to change this once I get the image, thats what it will be used for since the image will not match the square

    var numSwitches = 15;

    var switchHeight = 50;
    var switchWidth = 50;
    var switchPositionX = 0;
    var switchPositionY = 30;
    var switchPositionYLower = 350;

    var switchSpacingX = (impactWidth - (numSwitches * switchWidth + switchPositionX)) / numSwitches;

    var numJSticks = 5;

    var jStickWidth = 75;
    var jStickHeight = 75;
    var jStickPositionX = 10;
    var jStickPositionY = 300;

    var jStickSpacingX = (impactWidth-(numJSticks*jStickWidth+jStickPositionX))/numJSticks;//Usable Width will need to be subbed in for impactWidth

    this.switchWidth = switchWidth; //Public Variables, needed for switches
    this.switchHeight = switchHeight;

    this.jStickWidth = jStickWidth;
    this.jStickHeight = jStickHeight;

    var impactContainer = new createjs.Container();
    impactContainer.x = 0;
    impactContainer.y = 0;
    impactContainer.setBounds(0,0,impactWidth,impactHeight);
    impactContainer.name = "Impact Container";

    var impactBox = new createjs.Shape();
    impactBox.graphics.setStrokeStyle(2).beginStroke("black").beginFill("orange").drawRect(0, 0, impactWidth, impactHeight);
    impactContainer.addChild(impactBox);
    impactBox.name = "Impact drawing";
    STAGE.update();

    var impactSwitchArray = [];
    var impactSwitchArrayLower = [];
    var impactJStickArray = [];

    //Creates the upper switch locations, of which 10 are possible
    for (var i = 0; i < 15; i++) {

        var switchX = (switchSpacingX / 2) + (switchSpacingX + switchWidth) * i; //Did the divide by two, because we have 2 sides that ALSO need space.

        impactSwitchArray[i] = new createjs.Shape();
        impactSwitchArray[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX + switchPositionX, switchPositionY, switchWidth, switchHeight);
        impactSwitchArray[i].setBounds(switchX + switchPositionX, switchPositionY, switchWidth, switchHeight);
        impactSwitchArray[i].alpha = 0;
        impactContainer.addChild(impactSwitchArray[i]);
    }

    for (var i = 0; i < 15; i++) {

        var switchX = (switchSpacingX / 2) + (switchSpacingX + switchWidth) * i; //Did the divide by two, because we have 2 sides that ALSO need space.

        impactSwitchArrayLower[i] = new createjs.Shape();
        impactSwitchArrayLower[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(switchX + switchPositionX, switchPositionYLower, switchWidth, switchHeight);
        impactSwitchArrayLower[i].setBounds(switchX + switchPositionX, switchPositionYLower, switchWidth, switchHeight);
        impactSwitchArrayLower[i].alpha = 0;
        impactContainer.addChild(impactSwitchArrayLower[i]);
    }

    for (var i = 0; i < numJSticks; i++) {

        var jstickX = (jStickSpacingX / 2) + (jStickSpacingX + jStickWidth) * i;

        impactJStickArray[i] = new createjs.Shape();
        impactJStickArray[i].graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(jstickX + jStickPositionX, jStickPositionY, jStickWidth, jStickHeight)
        impactJStickArray[i].setBounds(jstickX + jStickPositionX, jStickPositionY, jStickWidth, jStickHeight);
        impactJStickArray[i].alpha = 0;
        impactContainer.addChild(impactJStickArray[i]);
    }

    //Public Methods
    this.getContainer = function() { //Public function that all transmitters must have.
        return impactContainer;
    }

    this.getSwitches = function() {
        return impactSwitchArray.concat(impactSwitchArrayLower);
    }

    this.getJSticks = function() {
        return impactJStickArray;
    }

    STAGE.addChild(impactContainer);
    STAGE.update();

    return false; //We don't want it redirecting anywhere, we just want it to construct code for us.
}
