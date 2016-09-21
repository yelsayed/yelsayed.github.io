// This code has been courtesy of https://github.com/STRML/strml.net/
// and http://codepen.io/jakealbaugh/pen/PwLXXP
(function () {
    'use strict';

    // Variables that will help us animate
    var styles, openComment, time, styleTextEl, playAnimation, rawStyle,
        debug, workRaw, workHTML, currentEl, resumeEl, currentIndex;

    styles = "";
    workRaw = "";
    workHTML = "";
    currentIndex = 0;
    rawStyle = "";

    playAnimation = true;

    // Switch on and off to see the state of the CSS
    debug = false;

    styleTextEl = $('#style-text');
    resumeEl = $('#resume-text');


    openComment = false;

    const pxRegex = /\dp/;
    const pxRegex2 = /p$/;

    var writeStyleChar = function (which) {
        var writeStyle;
        if (which === '/' && openComment === false) {
            openComment = true;
            writeStyle = styleTextEl.html() + which;
        } else if (which === '/' && openComment === true) {
            openComment = false;
            writeStyle = styleTextEl.html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
        } else if (which === ':') {
            writeStyle = styleTextEl.html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
        } else if (which === ';') {
            writeStyle = styleTextEl.html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
        } else if (which === '{') {
            writeStyle = styleTextEl.html().replace(/(.*)$/, '<em class="selector">$1</em>{');
        } else if (which === 'x' && pxRegex.test(styleTextEl.html().slice(-2))) {
            writeStyle = styleTextEl.html().replace(pxRegex2, '<em class="value px">px</em>');
        } else {
            writeStyle = styleTextEl.html() + which;
        }
        styleTextEl.html(writeStyle);
        return $('#style-tag').append(which);
    };

    var writeStyles = function (message, index, interval) {
        var pre, newInterval, prevIndex;

        if (index < message.length && playAnimation) {
            pre = document.getElementById('style-text');
            pre.scrollTop = pre.scrollHeight;
            currentIndex++;
            writeStyleChar(message[index++], message);
            prevIndex = message[index - 1];
            if ((prevIndex === '.' || prevIndex === '!' || prevIndex === '?') && openComment) {
                newInterval = interval + 400;
            } else if (prevIndex === ',' && openComment) {
                newInterval = interval + 200;
            } else {
                newInterval = interval;
            }
            if (interval == 0) {
                return writeStyles(message, index, interval);
            } else {
                return setTimeout(function () {
                    return writeStyles(message, index, interval);
                }, newInterval);
            }
        }
    };

    // Get the file of the text we want to animate
    // Courtesy of http://stackoverflow.com/questions/14446447/javascript-read-local-text-file
    var getFile = function (file, type, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var res = rawFile.responseText;
                    switch (type) {
                        case 0:
                            styles += res;
                            rawStyle = res;
                            break;
                        case 1:
                            workHTML += res;
                            break;
                        case 2:
                            workRaw += res;
                            break;
                    }
                    callback();
                }
            }
        };
        rawFile.send(null);
    };

    // Get the current styles and resume info used for this webpage
    var getFiles = function (callback) {
        if (!debug) {
            getFile('style-code.css', 0, function () {
                getFile('style-card.css', 0, callback);
            });
        } else {
            // Do some testing here!
            getFile('style-card.css', 0, function () {
                //callback();
                //styleTextEl.html(styles);
                $('#style-tag').append(styles);
            });

        }
    };

    // Start the animation!
    var animate = function () {
        playAnimation = true;
        time = window.innerWidth <= 578 ? 1 : 18;
        writeStyles(styles, 0, time);
    };

    // Stopping spam on pause and play button
    var locked = false;

    var toggleAnimation = function () {
        if (!locked) {
            locked = true;
            $('#pause-play').addClass('locked');
            setTimeout(unlock, 1000);
            getFile('style-code.css', 0, function () {
                styles = rawStyle.substring(currentIndex + 1, styles.length);
                playAnimation ? playAnimation = false : animate();
            });
        }
    };

    function unlock() {
        locked = false;
        $('#pause-play').removeClass('locked');
    }

    $('#pause-play').click(toggleAnimation);

    // Start and load everything once page is ready
    document.addEventListener("DOMContentLoaded", function () {
        getFiles(animate);
    });

})();