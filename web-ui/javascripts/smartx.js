// Utilities

/*
* Invokes specified function immediately, then every intervalMilliseconds.
* Returns intervalId to control it later on
*/
function invokeAndRepeat(toInvoke, intervalMilliseconds) {
    toInvoke();
    return setInterval(toInvoke, intervalMilliseconds);
}

/*
* Returns fahrenheit degrees temperature from celsius degrees.
*/
function celsiusToFahrenheit(celsiusTemp) {
    return (celsiusTemp * 1.8 + 32).toFixed(1);
}