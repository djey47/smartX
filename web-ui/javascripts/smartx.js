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

/*
* Returns disk brand from full model information
*/
function extractBrand(diskModel) {
	var regex = "^([A-Z]+)[A-Z0-9]+$";
	var brandInitials = diskModel.match(regex)[1];
	var diskBrand = diskBrands[brandInitials];

	if(diskBrand) {
		return diskBrands[brandInitials];
	} else {
		return "Unknown (" + brandInitials +")";
	}
}
/**
 * Represents all known disk brands per initals
 * @type {{ST: string, WD: string, SSD: string}}
 */
var diskBrands = {
	ST:"Seagate Technology",
	WD:"Western Digital",
	SSD:"Unknown (SSD)"
};