var LIVE_URL = "http://tpp.aninext.tv/feed.json";

var NOTIFICATION_DURATION = 30000;
var UPDATE_TIMEOUT = 5000;

var lastUpdateTime = 0;

function readUpdates() {  
    var url = LIVE_URL + "?i=" + (new Date()).getTime();
    
    jQuery.getJSON(url, function (data) {
        if (data.updates) {
            var newestUpdate = data.updates[0];

            if (newestUpdate && newestUpdate.time > lastUpdateTime) {
                lastUpdateTime = newestUpdate.time;

                var message = jQuery(newestUpdate.title).text();

                chrome.notifications.create("", {
                    type: "image",
                    title: "Twitch Plays Pokemon", 
                    message: message,
                    iconUrl: "icons/icon48.png"
                }, function (notificationId) {
                    function clearNotification () {
                        chrome.notifications.clear(notificationId, function () {});
                    }
                    
                    setTimeout(clearNotification, NOTIFICATION_DURATION);
                });
            }
        }
    });
    
    setTimeout(readUpdates, UPDATE_TIMEOUT);
}

readUpdates();
