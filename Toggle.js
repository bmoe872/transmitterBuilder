/*
########  #######   ######    ######   ##       ######## 
   ##    ##     ## ##    ##  ##    ##  ##       ##       
   ##    ##     ## ##        ##        ##       ##       
   ##    ##     ## ##   #### ##   #### ##       ######   
   ##    ##     ## ##    ##  ##    ##  ##       ##       
   ##    ##     ## ##    ##  ##    ##  ##       ##       
   ##     #######   ######    ######   ######## ######## 
*/
var ToggleSwitch = function(TRANSMITTER) {

        console.log('Made a new toggle Switch object');

        this.TRANSMITTER = TRANSMITTER;
        if(TRANSMITTER === null){ console.log("no transmitter object"); return;}

        var switchTop = prompt("Please enter top function name: ","pump on");
        var switchBottom = prompt("Please enter bottom function name: ","pump off");


        var label = new createjs.Text("Toggle SW", "bold 14px Lato", "#FFF");
        var switchRadius = 20;

        label.textAlign = "center";
        label.y -= 7;

        var toggleSwitch = new createjs.Shape();
        toggleSwitch.graphics.setStrokeStyle(2).beginStroke("black").beginFill("blue").drawCircle(0, 0, switchRadius);
        toggleSwitch.setBounds(0, 0, switchRadius, switchRadius);
        toggleSwitch.name = "toggleSwitch";

        var topLabelHolder = new createjs.Shape();
        topLabelHolder.graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(-switchRadius*2,-35,switchRadius*4,14);

        var bottomLabelHolder = new createjs.Shape();
        bottomLabelHolder.graphics.setStrokeStyle(2).beginStroke("black").beginFill("white").drawRect(-switchRadius*2,22.5,switchRadius*4,14);

        var draggableSwitch = new createjs.Container();
        draggableSwitch.x = draggableSwitch.y = 20;
        draggableSwitch.addChild(toggleSwitch, label);

        if(switchTop !== null && switchBottom !== null){ //Bad form, because you should be able to move forward without one of them being chosen.
            var topLabel = new createjs.Text(switchTop,"bold 14px Lato", "#000");
            topLabel.textAlign = "center";
            topLabel.y -=40;

            var bottomLabel = new createjs.Text(switchBottom, "bold 14px Lato", "#000");
            bottomLabel.textAlign = "center";
            bottomLabel.y +=20;
            draggableSwitch.addChild(topLabelHolder,bottomLabelHolder,topLabel,bottomLabel);
        }

        draggableSwitch.setBounds(0, 0, switchRadius + switchRadius, switchRadius + switchRadius);
        draggableSwitch.name = "draggableSwitch";
        STAGE.addChild(draggableSwitch);
        STAGE.update();

        var switchLocations = TRANSMITTER.getSwitches();
        var txContainer = TRANSMITTER.getContainer();

        for (var i = 0; i < switchLocations.length; i++) {
            switchLocations[i].alpha = 0.1;
        }
        STAGE.update();
        //DRAG FUNCTIONALITY =====================
        draggableSwitch.on("pressmove", function(evt) {
            evt.currentTarget.x = evt.stageX; //These actually enable me to move the switch around the page.
            evt.currentTarget.y = evt.stageY;
            STAGE.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker

            var l = switchLocations.length;
            for (var i = 0; i < l; i++) {
                var child = switchLocations[i];
                //var pt = child.globalToLocal(draggableSwitch.x, draggableSwitch.y);
                if (STAGE.mouseInBounds && intersect(draggableSwitch, child)) { //needs to have intersect in that order, but now it doesnt match up with the ACTUAL position
                    //console.log("intersected!");
                    child.alpha = 0.1;
                } else {
                    child.alpha = 1;
                }
            }



        });

        //Mouse UP and SNAP====================
        draggableSwitch.on("pressup", function(evt) {
            var l = switchLocations.length;
            for (var i = 0; i < l; i++) {
                var child = switchLocations[i];
                var bounds = child.getBounds();

                // var pt = child.globalToLocal(STAGE.mouseX, STAGE.mouseY);
                if (STAGE.mouseInBounds && intersect(draggableSwitch, child)) {

                    draggableSwitch.x = bounds.x + txContainer.x + (TRANSMITTER.switchWidth / 2);
                    draggableSwitch.y = bounds.y + txContainer.y + (TRANSMITTER.switchHeight / 2);

                    child.alpha = 0;
                    STAGE.update();
                }
                child.alpha = 0;
                STAGE.update();
            }

        });

    }
    //Tests if two objects are intersecting
    //Sees if obj1 passes through the first and last line of its
    //bounding box in the x and y sectors
    //Utilizes globalToLocal to get the x and y of obj1 in relation
    //to obj2
    //PRE: Must have bounds set for each object
    //Post: Returns true or false
function intersect(obj1, obj2) {
    var objBounds1 = obj1.getBounds().clone();
    var objBounds2 = obj2.getBounds().clone();

    var pt = obj1.globalToLocal(objBounds2.x, objBounds2.y);

    var h1 = -(objBounds1.height / 2 + objBounds2.height);
    var h2 = objBounds2.height / 2;
    var w1 = -(objBounds1.width / 2 + objBounds2.width);
    var w2 = objBounds2.width / 2;

    if (pt.x > w2 || pt.x < w1) return false;
    if (pt.y > h2 || pt.y < h1) return false;

    return true;
}
