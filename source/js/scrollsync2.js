(function() {


var element1 = document.getElementById('compare-1');
var element2 = document.getElementById('compare-2');

var activeTouch = null;
var touchStartY = 0;
var element1StartScrollTop = 0;
var element2scrollSyncFactor = 0;

document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    
    var touch = event.changedTouches[0];
   
    if ( activeTouch == null ) {
        activeTouch = touch;
        touchStartY = touch.screenY;
        element1StartScrollTop = element1.scrollTop;
        // if scroll content does not change do this calculation only once to safe compute time while animating
        calcSyncFactor();
    }
});

function calcSyncFactor()
{
    element2scrollSyncFactor = (element2.scrollHeight - element2.clientHeight) / (element1.scrollHeight - element1.clientHeight);    
}

document.addEventListener('touchend', touchEnd);
document.addEventListener('touchcancel', touchEnd);

function touchEnd(event)
{
    for ( var i = 0; i < event.changedTouches.length; i++ ) {
        var touch = event.changedTouches[i];
        if ( touch === activeTouch ) {
            activeTouch = null;
            break;
        }
    }    
}

document.addEventListener('touchmove', function() {
    for ( var i = 0; i < event.changedTouches.length; i++ ) {
        var touch = event.changedTouches[i];
        
        if ( touch === activeTouch ) {
            var yOffset = touch.screenY - touchStartY;
            element1.scrollTop = element1StartScrollTop + (0 - yOffset);
            syncScroll();
            break;
        }
    }    
});

function syncScroll()
{
    element2.scrollTop = Math.round(element1.scrollTop * element2scrollSyncFactor);
}


var touchSupported = 'ontouchstart' in document.documentElement;

// if ( !touchSupported ) {
    calcSyncFactor();
    element1.addEventListener('scroll', syncScroll);    
// }


})();