var LIVE_URL = 'http://54.194.157.89/feed';

var NOTIFICATION_DURATION = 30000;
var UPDATE_TIMEOUT = 30000;

var lastUpdateId = 0;

function readUpdates() {     
    jQuery.ajax({
        dataType: 'json',
        url: LIVE_URL,
        headers: {
            'last-id': lastUpdateId
        },
        success: function (data) {
            if (data && data.data) {
                var newestUpdate = data.data;

                if (newestUpdate && newestUpdate.id !== lastUpdateId) {
                    lastUpdateId = newestUpdate.id;

                    var decoded = jQuery('<div/>').html(newestUpdate.body_html).text();
                    var message = jQuery(decoded).text();

                    chrome.notifications.create('', {
                        type: 'basic',
                        title: 'Twitch Plays Pokemon', 
                        message: message,
                        iconUrl: 'icons/icon48.png'
                    }, function (notificationId) {
                        function clearNotification () {
                            chrome.notifications.clear(notificationId, function () {});
                        }
                        
                        setTimeout(clearNotification, NOTIFICATION_DURATION);
                    });
                }
            } 
        }
    });
    
    setTimeout(readUpdates, UPDATE_TIMEOUT);
}

readUpdates();
