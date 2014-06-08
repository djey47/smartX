// Utilities
function invokeAndRepeat(toInvoke, intervalMilliseconds) {
    toInvoke();
    setInterval(toInvoke, intervalMilliseconds);
}

function celsiusToFahrenheit(celsiusTemp) {
    return (celsiusTemp * 1.8 + 32).toFixed(1);
}