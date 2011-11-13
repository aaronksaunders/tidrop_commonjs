var dropMgr = require('TiDrop'); 

var tabGroup = Ti.UI.createTabGroup();
 
var window = Ti.UI.createWindow({  
    title: "Drag + Drop",
    backgroundColor: "#FFF"
});
 
var tab = Ti.UI.createTab({  
    title: "Drag + Drop",
    window: window
});
 
var box1 = Ti.UI.createView({
    width: 100,
    height: 100,
    top: 10,
    left: 10,
    backgroundColor: "#7A0000"
});
 
var box2 = Ti.UI.createView({
    width: 100,
    height: 100,
    top: 10,
    left: 120,
    backgroundColor: "#007A00"
});
 
var container1 = Ti.UI.createView({
    width: 200,
    height: 120,
    top: 237,
    left: 10,
    backgroundColor: "#CCC",
    items: 0
});
var container2 = Ti.UI.createView({
    width: 200,
    height: 120,
    top: 237,
    left: 220,
    backgroundColor: "#B3A3B5",
    items: 0
});
 
function yay(e) {
    if(e.contained) {
        e.source.top = 237;
        e.source.left = 10;
    }
}
 
function yay1(e) {
    if(e.contained) {
        e.source.top = 237;
        e.source.left = 220;
    }
}
 

drop2 =  new dropMgr.TiDrop(box2, container2, yay1);
drop1 =  new dropMgr.TiDrop(box1, container1, yay);
 
window.add(container1);
window.add(container2);
window.add(box1);
window.add(box2);
 
tabGroup.addTab(tab);  
tabGroup.open();