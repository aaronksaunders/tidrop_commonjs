function TiDrop(_element, _container, _callback) {
    var touching = false;
    var container = null;
    var callback = null;
    var position = {
        elementYStart : 0,
        elementXStart : 0,
        yStart : 0,
        xStart : 0,
        yCurrent : 0,
        xCurrent : 0
    };

    _element.addEventListener("touchstart", function(e) {
        touchHandler(e);
    }, false);
    _element.addEventListener("touchmove", function(e) {
        touchHandler(e);
    }, false);
    _element.addEventListener("touchend", function(e) {
        touchHandler(e);
    }, false);
    _element.addEventListener("touchcancel", function(e) {
        touchHandler(e);
    }, false);
    if(_container) {
        container = _container;
    }

    if(_callback && typeof _callback == "function") {
        callback = _callback;
    } else {
        callback = false;
    }

    var touchHandler = function(_event) {
        if(_event.type == "touchstart") {
            if(!touching) {
                touching = true;
                element = _event.source;

                switch(Ti.UI.orientation) {
                    case Ti.UI.PORTRAIT:
                    case Ti.UI.UPSIDE_PORTRAIT:
                        position.elementYStart = element.top;
                        position.elementXStart = element.left;
                        break;
                    case Ti.UI.LANDSCAPE_RIGHT:
                    case Ti.UI.LANDSCAPE_LEFT:
                        position.elementYStart = element.left;
                        position.elementXStart = element.top;
                        break;
                }

                position.yStart = parseInt(_event.globalPoint.y, 10);
                position.xStart = parseInt(_event.globalPoint.x, 10);
            }

        } else if(_event.type == "touchmove") {
            if(touching) {
                position.yCurrent = parseInt(_event.globalPoint.y, 10);
                position.xCurrent = parseInt(_event.globalPoint.x, 10);

                var yDistance = position.yCurrent - position.yStart;
                var xDistance = position.xCurrent - position.xStart;

                switch(Ti.UI.orientation) {
                    case Ti.UI.PORTRAIT:
                        _event.source.top = position.elementYStart + yDistance;
                        _event.source.left = position.elementXStart + xDistance;
                        break;
                    case Ti.UI.UPSIDE_PORTRAIT:
                        _event.source.top = position.elementYStart - yDistance;
                        _event.source.left = position.elementXStart - xDistance;
                        break;
                    case Ti.UI.LANDSCAPE_RIGHT:
                        _event.source.left = position.elementYStart + yDistance;
                        _event.source.top = position.elementXStart - xDistance;
                        break;
                    case Ti.UI.LANDSCAPE_LEFT:
                        _event.source.left = position.elementYStart - yDistance;
                        _event.source.top = position.elementXStart + xDistance;
                        break;
                }
            }

        } else if(_event.type == "touchend" || _event.type == "touchcancel") {
            if(callback) {
                var _data = {
                    source : element,
                    position : {
                        y : position.yCurrent,
                        x : position.xCurrent
                    },
                    contained : withinContainer()
                };

                callback(_data);
            }
            element = null;
            touching = false;
            position = {
                elementYStart : 0,
                elementXStart : 0,
                yStart : 0,
                xStart : 0,
                yCurrent : 0,
                xCurrent : 0
            };
        } else {
            Ti.API.info("TiDrop: Not a valid touch event");
        }
    };
    var withinContainer = function() {
        var contained = true;
        Ti.API.debug()

        if(container) {
            if(element.left < container.left) {
                contained = false;
            }
            if(element.left > container.left + container.width) {
                contained = false;
            }
            if(element.left + element.width > container.left + container.width) {
                contained = false;
            }
            if(element.top < container.top) {
                contained = false;
            }
            if(element.top > container.top + container.height) {
                contained = false;
            }
            if(element.top + element.height > container.top + container.height) {
                contained = false;
            }
        } else {
            contained = false;
        }

        return contained;
    };
}

exports.TiDrop = TiDrop;
