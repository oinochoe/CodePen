function disablewebkitAnimations() {
    var nodes = document.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
        var style = nodes[i].style;
        style.webkitAnimationPlayState = 'paused';
        document.body.className = 'paused';
    }
}

// function pauseElementTypes(type) {
//     let nodes = document.querySelectorAll(type)
//     for (var i = 0, els = document.getElementsByTagName(type); i < els.length; i++) {
//         els[i].pause();
//     }
// }

function iFrameDisable() {
    disablewebkitAnimations();
    // pauseElementTypes("audio")
    // pauseElementTypes("video")
}

setTimeout(iFrameDisable, 4000);
