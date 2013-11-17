// Constants
var WEB_SERVICES_URL = "http://localhost:4600";
var REFRESH_INTERVAL_SECS = 60;

// Utilities
function invokeAndRepeat(toInvoke, intervalMilliseconds) {
    toInvoke();
    setInterval(toInvoke, intervalMilliseconds);
}