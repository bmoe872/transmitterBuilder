/*
      ##  ######  ######## ####  ######  ##    ## 
      ## ##    ##    ##     ##  ##    ## ##   ##  
      ## ##          ##     ##  ##       ##  ##   
      ##  ######     ##     ##  ##       #####    
##    ##       ##    ##     ##  ##       ##  ##   
##    ## ##    ##    ##     ##  ##    ## ##   ##  
 ######   ######     ##    ####  ######  ##    ##  
*/


var JStick = function(TRANSMITTER) {
    console.log('Made a new JStick object');

    this.TRANSMITTER = TRANSMITTER;


    var label = new createjs.Text("JStick", "bold 14px Lato", "#FFF");
    var switchRadius = 40;

    label.textAlign = "center";
    label.y -= 7;

    var joyStick = new createjs.Shape();
    joyStick.graphics.setStrokeStyle(2).beginStroke("black").beginFill("black").drawCircle(0, 0, switchRadius);
    joyStick.name = "joyStick";

    var draggableJStick = new createjs.Container();
    draggableJStick.x = draggableJStick.y = 20;
    draggableJStick.addChild(joyStick, label);
    draggableJStick.setBounds(0, 0, switchRadius+switchRadius, switchRadius+switchRadius);
    draggableJStick.name = "draggableJStick";
    STAGE.addChild(draggableJStick);
    STAGE.update();

    var jStickLocations = TRANSMITTER.getJSticks();
    var txContainer = TRANSMITTER.getContainer();

    for(var i=0;i<jStickLocations.length;i++){
        jStickLocations[i].alpha = 0.1;
    }
    STAGE.update();
    //DRAG FUNCTIONALITY =====================
    draggableJStick.on("pressmove", function(evt) {
        evt.currentTarget.x = evt.stageX; //These actually enable me to move the switch around the page.
        evt.currentTarget.y = evt.stageY;
        STAGE.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker

        var l = jStickLocations.length;

        for (var i = 0; i < l; i++) {
            var child = jStickLocations[i];
            var pt = child.globalToLocal(STAGE.mouseX, STAGE.mouseY);
            if (STAGE.mouseInBounds && intersect(draggableJStick,child)) {
                child.alpha = 0.1;
            } else {
                child.alpha = 1;
            }
        }



    });

    //Mouse UP and SNAP====================
    draggableJStick.on("pressup", function(evt) {
        var l = jStickLocations.length;
        for (var i = 0; i < l; i++) {
            var child = jStickLocations[i];
            var bounds = child.getBounds();

            var pt = child.globalToLocal(STAGE.mouseX, STAGE.mouseY);
            if (STAGE.mouseInBounds && intersect(draggableJStick,child)) {

                draggableJStick.x = bounds.x + txContainer.x + (TRANSMITTER.jStickWidth / 2);
                draggableJStick.y = bounds.y + txContainer.y + (TRANSMITTER.jStickHeight / 2);
                child.alpha=0;
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