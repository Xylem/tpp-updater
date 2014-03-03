var LIVE_URL = 'http://54.194.157.89/';

var NOTIFICATION_DURATION = 30000;

var socket = io.connect(LIVE_URL);

socket.on('update', function (data) {
    var decoded = jQuery('<div/>').html(data).text();
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
});
